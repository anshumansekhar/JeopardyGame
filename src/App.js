import './App.css';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';

import {
  AlertDialog,
  AlertDialogLabel
} from "@reach/alert-dialog";



function App() {

  const tempUser = {
    socketId: "",
    playerName: "",
    playerScore: 0
  }

  const amountCardsInit = {
    Business: [true, true, true, true, true],
    Sports: [true, true, true, true, true],
    Films: [true, true, true, true, true],
    Editorial: [true, true, true, true, true],
  }
  const scoreB = {
    list: [
      {
        name: "Anshuman",
        score: 100
      },
      {
        name: "Ayushman",
        score: 100
      }
    ]
  }

  const socket = useSelector((state) => state);

  const [numPlayers, setNumplayers] = useState(0);
  const [name, setName] = useState("");
  const [user, setUser] = useState(tempUser);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [showGame, setShowGame] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [amountCards, setAmountCards] = useState(amountCardsInit);
  const [scoreBoard, setScoreBoard] = useState(scoreB);



  socket.on('connect', function () {
    console.log('Connected!' + socket.id);
  });
  socket.on("disconnect", (reason) => {
    console.log("Disconnected");
    console.log(reason);
  });
  socket.on("connect_error", () => {
    console.log("connection error");
  });

  socket.on("gameCreated", (roomName, message) => {
    setRoomName(roomName);
    setMessage(`Room created ${roomName} ${message}`)
  })
  socket.on("userDetails", (user) => {
    console.log(user);
    setUser(user)
  })
  socket.on("playerJoined", (message) => {
    setMessage(message);
  })
  socket.on("startGame", (message) => {
    setMessage(message);
    setShowGame(true);
  })
  socket.on("takeTurn", (message, player) => {
    console.log("turn");
    setMessage(message);
    setCurrentPlayer(player)
  })
  socket.on("categorySelectedResponse", (message, res) => {
    setMessage(message);
    const category = res.category;
    const pos = (res.amount / 200) - 1;
    let categoryCards = amountCards[category];
    categoryCards[pos] = false;
    setAmountCards(prevState => ({
      ...prevState,
      category: {
        ...categoryCards
      }
    }))
    console.log(amountCards);
  });
  socket.on("Question", question => {
    setQuestion(question);
  })
  socket.on("UpdateScore", user => {
    setUser(user);
  })
  socket.on("EndGame", (message, board) => {
    setMessage(message);
    setShowGame(false);
    setShowQuestion(false);
    setScoreBoard({ list: [...board] });
    setShowScoreBoard(true);
  })

  const openStart = () => {
    setShowStartDialog(true);
    setShowJoinDialog(false);
  };
  const closeStart = () => {
    const req = {
      playerName: name,
      numPlayers: numPlayers
    }
    socket.emit("createGame", req);
    setShowStartDialog(false)
  };

  const onNameInput = (e) => {
    setName(e.target.value)
  }

  const onRoomInput = (e) => {
    setRoomName(e.target.value);
  }
  const [showJoinDialog, setShowJoinDialog] = useState(false);

  const openJoin = () => {
    setShowStartDialog(false);
    setShowJoinDialog(true)
  };
  const closeJoin = () => {
    const req = {
      playerName: name,
      roomName: roomName
    }
    socket.emit("joinGame", req);
    setShowJoinDialog(false)
  };


  const cancelRef = useRef();

  const onPlayerSelected = (e) => {
    console.log(e.target.value);
    setNumplayers(e.target.value);
  }

  const onAmountClicked = (amount, category) => {
    if (currentPlayer.playerName === name) {
      console.log("clicked" + amount + category);
      const req = {
        amount: amount,
        category: category,
        by: name,
        roomName: roomName
      }
      socket.emit("categorySelected", req);
      setShowGame(false);
      setShowQuestion(true);
    }
    else {
      setMessage("Not your Turn");
    }
  }

  const onAnswerSubmit = () => {
    setAnswer("");
    const req = {
      answer: answer,
      question: question,
      playerId: user.id,
      gameRoom: roomName
    }
    socket.emit("Answer", req);
    setShowQuestion(false);
    setShowGame(true);
  }

  const handleAnswerInput = (e) => {
    setAnswer(e.target.value);
  }


  return (
    <>
      <div className="header">
        <button onClick={openStart}>Start Game</button>
        <input className="message" value={message}></input>
        <button onClick={openJoin}>Join Game</button>
      </div>
      <div className="header">
        <div>Name:{user.playerName}</div>
        <div>Room Code:{roomName}</div>
        <div>Amount:₹{user.playerScore}</div>
      </div>

      {showStartDialog && (
        <AlertDialog leastDestructiveRef={cancelRef}>
          <AlertDialogLabel>Start a Game</AlertDialogLabel>
            Enter Name:
          <input type="text" onInput={(e) => onNameInput(e)}></input>
          <select name="numPlayers" id="numPlayers" onChange={(e) => onPlayerSelected(e)}>
            <option value="0">Select NumPlayers</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <div className="alert-buttons">
            <button onClick={closeStart}>Start</button>{" "}
            <button ref={cancelRef} onClick={closeStart}>
              Cancel
            </button>
          </div>
        </AlertDialog>
      )}
      {showJoinDialog && (
        <AlertDialog leastDestructiveRef={cancelRef}>
          <AlertDialogLabel>Join a Game</AlertDialogLabel>
            Enter Name:
          <input type="text" onInput={onNameInput}></input>
            Enter Code:
          <input type="text" onInput={onRoomInput}></input>

          <div className="alert-buttons">
            <button onClick={closeJoin}>Join</button>{" "}
            <button ref={cancelRef} onClick={closeJoin}>
              Cancel
            </button>
          </div>
        </AlertDialog>
      )}
      {
        showGame && (
          <>
            <table className="game">
              <thead className="content-name">
                <tr>
                  <th>Business</th>
                  <th>Sports</th>
                  <th>Films</th>
                  <th>Editorial</th>
                </tr>
              </thead>
              <tbody className="content-money">
                <tr>
                  {
                    amountCards.Business[0]
                      ? <td onClick={(e) => onAmountClicked(200, 'Business')}>₹200</td>
                      : <td></td>
                  }
                  {
                    amountCards.Sports[0]
                      ? <td onClick={(e) => onAmountClicked(200, 'Sports')}>₹200</td>
                      : <td></td>
                  }
                  {
                    amountCards.Films[0]
                      ? <td onClick={(e) => onAmountClicked(200, 'Films')}>₹200</td>
                      : <td></td>
                  }
                  {
                    amountCards.Editorial[0]
                      ?
                      <td onClick={(e) => onAmountClicked(200, 'Editorial')}>₹200</td>
                      : <td></td>
                  }
                </tr>
                <tr>
                  {
                    amountCards.Business[1]
                      ? <td onClick={(e) => onAmountClicked(400, 'Business')}>₹400</td>
                      : <td></td>
                  }
                  {
                    amountCards.Sports[1]
                      ? <td onClick={(e) => onAmountClicked(400, 'Sports')}>₹400</td>
                      : <td></td>
                  }
                  {
                    amountCards.Films[1]
                      ? <td onClick={(e) => onAmountClicked(400, 'Films')}>₹400</td>
                      : <td></td>
                  }
                  {
                    amountCards.Editorial[1]
                      ? <td onClick={(e) => onAmountClicked(400, 'Editorial')}>₹400</td>
                      : <td></td>
                  }
                </tr>
                <tr>
                  {
                    amountCards.Business[2]
                      ? <td onClick={(e) => onAmountClicked(600, 'Business')}>₹600</td>
                      : <td></td>
                  }
                  {
                    amountCards.Sports[2]
                      ? <td onClick={(e) => onAmountClicked(600, 'Sports')}>₹600</td>
                      : <td></td>
                  }
                  {
                    amountCards.Films[2]
                      ? <td onClick={(e) => onAmountClicked(600, 'Films')}>₹600</td>
                      : <td></td>
                  }
                  {
                    amountCards.Editorial[2]
                      ? <td onClick={(e) => onAmountClicked(600, 'Editorial')}>₹600</td>
                      : <td></td>
                  }
                </tr>
                <tr>
                  {
                    amountCards.Business[3]
                      ? <td onClick={(e) => onAmountClicked(800, 'Business')}>₹800</td>
                      : <td></td>
                  }
                  {
                    amountCards.Sports[3]
                      ? <td onClick={(e) => onAmountClicked(800, 'Sports')}>₹800</td>
                      : <td></td>
                  }
                  {
                    amountCards.Films[3]
                      ? <td onClick={(e) => onAmountClicked(800, 'Films')}>₹800</td>
                      : <td></td>

                  }
                  {
                    amountCards.Editorial[3]
                      ? <td onClick={(e) => onAmountClicked(800, 'Editorial')}>₹800</td>
                      : <td></td>
                  }
                </tr>
                <tr>
                  {
                    amountCards.Business[4]
                      ? <td onClick={(e) => onAmountClicked(1000, 'Business')}>₹1000</td>
                      : <td></td>
                  }
                  {
                    amountCards.Sports[4]
                      ? <td onClick={(e) => onAmountClicked(1000, 'Sports')}>₹1000</td>
                      : <td></td>
                  }
                  {
                    amountCards.Films[4]
                      ? <td onClick={(e) => onAmountClicked(1000, 'Films')}>₹1000</td>
                      : <td></td>
                  }
                  {
                    amountCards.Editorial[4]
                      ? <td onClick={(e) => onAmountClicked(1000, 'Editorial')}>₹1000</td>
                      : <td></td>
                  }
                </tr>
              </tbody>
            </table>
          </>
        )
      }
      {
        showQuestion && (
          <>
            <table >
              <tr>
                <td colSpan="7">{question.text}</td>
              </tr>
              <tr >
                <td colSpan="7">Answer
                <input type="text" onInput={(e) => handleAnswerInput(e)} value={answer}></input>
                </td>
              </tr>
              <tr>
                <td colSpan="7">
                  <button onClick={(e) => onAnswerSubmit()}>Submit</button>
                </td>
              </tr>
            </table>
          </>
        )
      }
      {
        showScoreBoard && (
          <>
            <table>
              <tr>
                <td colSpan="2">ScoreBoard</td>
              </tr>
              {
                scoreBoard.list.map(element => (
                  <tr key={element.name}>
                    <td >{element.name}</td>
                    <td >{element.score}</td>
                  </tr>
                ))
              }
            </table>
          </>
        )
      }
    </>
  )
}

export default App;


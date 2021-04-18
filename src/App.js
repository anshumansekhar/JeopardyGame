/*
  App component for the application
*/

// TODO create separate compenents for differnt pages
import './App.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import HelpScreen from './components/HelpScreen';
import StartGameDialog from './components/Dialog/startGameDialog';
import JoinGameDialog from './components/Dialog/joinDialog';
import GameScreen from './components/GameScreen';
import QuestionScreen from './components/QuestionScreen';
import ScoreBoard from './components/ScoreBoard';
import UsersScreen from './components/users';
import ChatBox from './components/Chat';


function App() {

  // default objects

  // defaults user object
  // contains socketid ,name and score
  const tempUser = {
    socketId: "",
    playerName: "",
    playerScore: 0
  }

  // default amount cards object
  // all categories and amount is set to true initially
  let amountCardsInit = {
    Business: [true, true, true, true, true],
    Sports: [true, true, true, true, true],
    Films: [true, true, true, true, true],
    Editorial: [true, true, true, true, true],
  }

  // default scoreboard for testing
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

  // get socket from the provider state
  const socket = useSelector((state) => state);



  // states present in app

  // numplayers state to store number of players
  const [numPlayers, setNumplayers] = useState(0);
  // name state to store player name
  const [name, setName] = useState("");
  // user state to store user name
  const [user, setUser] = useState(tempUser);
  // message state to store message
  const [message, setMessage] = useState('');
  // roomName state to store room name
  const [roomName, setRoomName] = useState('');
  // currentPlayer state which store player whose turn it is to play
  const [currentPlayer, setCurrentPlayer] = useState(null);
  // question state to store question
  const [question, setQuestion] = useState("");
  // answer state to store answer
  const [answer, setAnswer] = useState("");
  // amountCards state to store category amount cards
  let [amountCards, setAmountCards] = useState(amountCardsInit);
  // scoreBoard state to store scoreboard
  const [scoreBoard, setScoreBoard] = useState(scoreB);
  // players state to store list of players in the game room
  const [players,setPlayer]=useState([]);

  // showStartDialog state to store if StartGameDialog is to be shown
  const [showStartDialog, setShowStartDialog] = useState(false);
  // showGame state to store if Game Screen is to be shown
  const [showGame, setShowGame] = useState(false);
  // showQuestion state to store if Question Screen is to be shown
  const [showQuestion, setShowQuestion] = useState(false);
  // showScoreBoard state to store if scoreboard screen is to be shown 
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  // showJoinDialog state to store if join dialog is to be shown
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  // showInstructions state to store if instructions is to be shown
  const [showInstructions, setShowInstruction] = useState(true);


  useEffect(() => {
    // when the socket connects to server
    socket.on('connect', function () {
      // log connected
      console.log('Connected!' + socket.id);
    });
    // when the socket disconnets from the server
    socket.on("disconnect", (reason) => {
      // log disconnected and reason
      console.log("Disconnected");
      console.log(reason);
    });
    // if connection error happens
    socket.on("connect_error", () => {
      // log error
      console.log("connection error");
    });

    // when gameCreated event is sent by server
    // get room name and message
    socket.on("gameCreated", (roomName, message) => {
      // set the current room name
      setRoomName(roomName);
      // initialize amount cards to default values
      setAmountCards(amountCardsInit);
      
      // set message as room created
      setMessage(`Room created ${roomName} ${message}`)
    })
    // when userDetails event is recieved by the socket
    socket.on("userDetails", (user) => {
      // set user to the user object recived
      setUser(user);
    })
    // when game join fails
    socket.on("joinGameFailed", message => {
      // display error message
      setMessage(message);
    })

    // when a playerJoined event is recieved
    socket.on("playerJoined", (message, player,players) => {
      // form the message that player has joined
      const msg = message + player.playerName + " Joined";
      // set message
      setMessage(msg);
      // set players
      setPlayer([...players]);
    })
    // when startGame event is recieved
    socket.on("startGame", (message) => {
      // set message
      setMessage(message);
      // set show game to true
      setShowGame(true);
      // show game instruction
      setShowInstruction(false);
    })
    // when takeTurn event is recieved
    socket.on("takeTurn", (message, player) => {
      // set message 
      setMessage(message);
      // set current player
      setCurrentPlayer(player)
    })
    // on recieving category selected response event
    socket.on("categorySelectedResponse", (message, res) => {
      // set message
      setMessage(message);
      // get category
      const category = res.category;
      // calculate position using amount
      const pos = (res.amount / 200) - 1;
      // change the respective amount card to false
      amountCards[category][pos] = false;
      setAmountCards(amountCards);
    });
    // on recieving Question event
    socket.on("Question", question => {
      // set the question
      setQuestion(question);
    })
    // on update Score event
    socket.on("UpdateScore", user => {
      // set user
      setUser(user);
    })
    // on end game event
    socket.on("EndGame", (message, board) => {
      // set message
      setMessage(message);
      // set show game to false
      setShowGame(false);
      // set show question to false
      setShowQuestion(false);
      // set score board to score board recieved
      setScoreBoard({ list: [...board] });
      // set show score board to true
      setShowScoreBoard(true);
    })

  }, 0);


  // openStart funtion 
  // fired when player clicks on start button
  const openStart = () => {
    // set show start dialog to true
    setShowStartDialog(true);
    // set show join dialog to false
    setShowJoinDialog(false);
  };
  // closeStart funtion
  // fired when player submits game room details
  const closeStart = () => {
    // form request object
    const req = {
      playerName: name,
      numPlayers: numPlayers
    }
    // send createGame event
    socket.emit("createGame", req);
    // set show start dialog to false
    setShowStartDialog(false)
  };

  // onNameInput funtion
  // fired when name is entered
  const onNameInput = (e) => {
    // set name to the name entered
    setName(e.target.value)
  }

  // onRoomInput function
  // fired when room name/code is entered
  const onRoomInput = (e) => {
    // set room name to room name entered
    setRoomName(e.target.value);
  }


  // openJoin function
  // fired when join button is clicked
  const openJoin = () => {
    // set show start dialog to false
    setShowStartDialog(false);
    // set show join dialog to true
    setShowJoinDialog(true)
  };
  // closeJoin function
  // fired when submit is clicked in join screen
  const closeJoin = () => {
    // form a request object
    const req = {
      playerName: name,
      roomName: roomName
    }
    // send joinGame event
    socket.emit("joinGame", req);
    // set show join dialog to false
    setShowJoinDialog(false)
  };

  // when a number of players is selected 
  const onPlayerSelected = (e) => {
    // set num of players to target value
    setNumplayers(e.target.value);
  }

  // when player choose an amount from the table
  const onAmountClicked = (amount, category) => {
    if (currentPlayer.playerName === name) {
      // if it the player turn to select
      // form request object to send
      const req = {
        amount: amount,
        category: category,
        by: name,
        roomName: roomName
      }
      // send categorySelected event
      socket.emit("categorySelected", req);
      // set show game to false
      setShowGame(false);
      // set show question to true
      setShowQuestion(true);
    }
    else {
      // if it is not the players turn
      // set message
      setMessage("Not your Turn");
    }
  }

  // when answer is submit
  const onAnswerSubmit = () => {
    // clear the answer input box
    setAnswer("");
    // prepare request object to send
    const req = {
      answer: answer,
      question: question,
      playerId: user.id,
      gameRoom: roomName
    }
    // send Answer event
    socket.emit("Answer", req);
    // set show question to false
    setShowQuestion(false);
    // set show game to true
    setShowGame(true);
  }

  // when answer is entered
  const handleAnswerInput = (e) => {
    // set answer to answer entered
    setAnswer(e.target.value);
  }

  // return the following JSX code
  // react renders it when any state changes
  return (

    <>
      {/* top header */}
      <div className="header">
        <button onClick={openStart}>Start Game</button>
        <input className="message" value={message}></input>
        <button onClick={openJoin}>Join Game</button>
      </div>
      {/* second row header */}
      <div className="header">
        <div>Name:{user.playerName}</div>
        <div>Room Code:{roomName}</div>
        <div>Amount:₹{user.playerScore}</div>
      </div>
      <div className="main">
        {/* display users screen in the left side */}
        <UsersScreen
        players={players}
        currentPlayer={currentPlayer}/>
        {showInstructions && <HelpScreen />}
        {/* if showStartDialog is set to true then render this */}
        {/* start game dialog containg name and num of players drop down*/}
        {
          showStartDialog &&
          (<StartGameDialog
            onNameInput={onNameInput}
            onPlayerSelected={onPlayerSelected}
            closeStart={closeStart}
          />)
        }
        {/* if showJoinDialog is true render join dialog */}
        {/* contains name and code input */}
        {
          showJoinDialog &&
          (<JoinGameDialog
            onNameInput={onNameInput}
            onRoomInput={onRoomInput}
            closeJoin={closeJoin}
          />

          )}
        {/* when showGame is set to true render categories screen */}
        {/* contains 6*4 table  displaying various categories and amounts*/}
        {/* get the items to display from amountCards object */}
        {
          showGame && (<GameScreen
            amountCards={amountCards}
            onAmountClicked={onAmountClicked} />

          )
        }
        {/* if showQuestion is set to true render question screen */}
        {/* contains question and answer input with a submit button */}
        {
          showQuestion && (<QuestionScreen
            question={question}
            handleAnswerInput={handleAnswerInput}
            answer={answer}
            onAnswerSubmit={onAnswerSubmit} />

          )
        }
        {/* render this when showScoreBoard is set to true */}
        {/* it is a table containing all the player names and score */}
        {
          showScoreBoard && (<ScoreBoard
            scoreBoard={scoreBoard} />

          )
        }
        {/* displat Chat box */}
        <ChatBox/>
      </div>
    </>
  )
}
// export the App function
export default App;


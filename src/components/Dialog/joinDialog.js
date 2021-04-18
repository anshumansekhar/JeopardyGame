import React,{useRef} from 'react';
import {
    AlertDialog,
    AlertDialogLabel
  } from "@reach/alert-dialog";

/**
* @author
* @function JoinGameDialog
**/

const JoinGameDialog = (props) => {
  const cancelRef = useRef();
  const onNameInput=props.onNameInput;
  const onRoomInput=props.onRoomInput;
  const closeJoin=props.closeJoin;
  return(
    <AlertDialog leastDestructiveRef={cancelRef}>
          <AlertDialogLabel>Join a Game</AlertDialogLabel>
          &nbsp;Enter Name:&nbsp;
          <input type="text" onInput={onNameInput}></input>
          &nbsp;Enter Code:&nbsp;
          <input type="text" onInput={onRoomInput}></input>

          <div className="alert-buttons">
            <button onClick={closeJoin}>Join</button>{" "}
            <button ref={cancelRef} onClick={closeJoin}>
              Cancel
            </button>
          </div>
        </AlertDialog>
   )

 }

export default JoinGameDialog
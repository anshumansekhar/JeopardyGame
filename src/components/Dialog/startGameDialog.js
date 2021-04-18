import React, { useRef } from 'react';
import {
    AlertDialog,
    AlertDialogLabel
} from "@reach/alert-dialog";

/**
* @author
* @function StartGameDialog
**/

const StartGameDialog = (props) => {
    const cancelRef = useRef();
    const onNameInput = props.onNameInput;
    const onPlayerSelected = props.onPlayerSelected;
    const closeStart = props.closeStart;
    return (
        <AlertDialog leastDestructiveRef={cancelRef}>
            <AlertDialogLabel>&nbsp;Start a Game&nbsp;</AlertDialogLabel>
            &nbsp;Enter Name:&nbsp;
            <input type="text" onInput={(e) => onNameInput(e)}></input>
            &nbsp;
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
    )

}

export default StartGameDialog
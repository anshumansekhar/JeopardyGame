import React from 'react'

/**
* @author
* @function HelpScreen
**/

const HelpScreen = (props) => {
  return (
    <div>
      <h3>How to Start the Game:</h3>
      <h4>For Host</h4>
      <ol>
        <li>Click on start Game</li>
        <li>Enter your name and number of players for the room</li>
        <li>After submitting a room code will be generated and displayed</li>
        <li>Share the game code with other players</li>
        <li>Wait for the required number of players to join the game, players added are displayed in the message box</li>
      </ol>
      <h4>For Players other than Host</h4>
      <ol>
        <li>Click on Join Game</li>
        <li>Enter your name and Game Code</li>
        <li>Submit and wait for the room to get full</li>
      </ol>
      <h4>How to play the Game</h4>
        After the the required number of players have joined the game the game starts.
      <ol>
       <li> The player whose turn it is selects a category by clicking on the amount available </li>
      <li>A clue is presented to the player and an answer box is displayed</li>
      <li>The player enters the answer and submits</li>
      <li>if correct the amount is added to the player's score else the amount is deducted</li>
      <li>The Game ends when all the categories are over</li>
      <li>The final count of the players is displayed in the Screen</li>

          </ol>
    </div >
   )

 }

export default HelpScreen
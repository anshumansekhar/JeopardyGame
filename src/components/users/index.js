import React from 'react'

/**
* @author
* @function UsersScreen
**/

const UsersScreen = (props) => {
    const listItems = props.players.map((player) =>
        props.currentPlayer === player ?
            <li>Yoour {player.playerName}</li>
            : <li>{player.playerName}</li>
    );

    return (
        <div>
            <h4>Players in the Game</h4>
            <ol>{listItems}</ol>

            {props.currentPlayer ?
                <h5>Turn:{props.currentPlayer.playerName}</h5>
                : <></>}
        </div>
    )

}

export default UsersScreen
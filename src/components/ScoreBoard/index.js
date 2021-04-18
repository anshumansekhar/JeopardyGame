import React from 'react'

/**
* @author
* @function ScoreBoard
**/

const ScoreBoard = (props) => {
    return (
        <>
            <table>
                <tr>
                    <td colSpan="2" className="content-money">ScoreBoard</td>
                </tr>
                {
                    props.scoreBoard.list.map(element => (
                        <tr key={element.name}>
                            <td className="content-money">{element.name}</td>
                            <td className="content-money">{element.score}</td>
                        </tr>
                    ))
                }
            </table>
        </>
    )

}

export default ScoreBoard
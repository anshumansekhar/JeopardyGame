import React from 'react'

/**
* @author
* @function GameScreen
**/

const GameScreen = (props) => {

    return (
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
                        {/* if amountCards business is true render this else render empty td */}
                        {
                            props.amountCards.Business[0]
                                ? <td onClick={(e) => props.onAmountClicked(200, 'Business')}>₹200</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Sports[0]
                                ? <td onClick={(e) => props.onAmountClicked(200, 'Sports')}>₹200</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Films[0]
                                ? <td onClick={(e) => props.onAmountClicked(200, 'Films')}>₹200</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Editorial[0]
                                ?
                                <td onClick={(e) => props.onAmountClicked(200, 'Editorial')}>₹200</td>
                                : <td></td>
                        }
                    </tr>
                    <tr>
                        {
                            props.amountCards.Business[1]
                                ? <td onClick={(e) => props.onAmountClicked(400, 'Business')}>₹400</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Sports[1]
                                ? <td onClick={(e) => props.onAmountClicked(400, 'Sports')}>₹400</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Films[1]
                                ? <td onClick={(e) => props.onAmountClicked(400, 'Films')}>₹400</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Editorial[1]
                                ? <td onClick={(e) => props.onAmountClicked(400, 'Editorial')}>₹400</td>
                                : <td></td>
                        }
                    </tr>
                    <tr>
                        {
                            props.amountCards.Business[2]
                                ? <td onClick={(e) => props.onAmountClicked(600, 'Business')}>₹600</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Sports[2]
                                ? <td onClick={(e) => props.onAmountClicked(600, 'Sports')}>₹600</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Films[2]
                                ? <td onClick={(e) => props.onAmountClicked(600, 'Films')}>₹600</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Editorial[2]
                                ? <td onClick={(e) => props.onAmountClicked(600, 'Editorial')}>₹600</td>
                                : <td></td>
                        }
                    </tr>
                    <tr>
                        {
                            props.amountCards.Business[3]
                                ? <td onClick={(e) => props.onAmountClicked(800, 'Business')}>₹800</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Sports[3]
                                ? <td onClick={(e) => props.onAmountClicked(800, 'Sports')}>₹800</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Films[3]
                                ? <td onClick={(e) => props.onAmountClicked(800, 'Films')}>₹800</td>
                                : <td></td>

                        }
                        {
                            props.amountCards.Editorial[3]
                                ? <td onClick={(e) => props.onAmountClicked(800, 'Editorial')}>₹800</td>
                                : <td></td>
                        }
                    </tr>
                    <tr>
                        {
                            props.amountCards.Business[4]
                                ? <td onClick={(e) => props.onAmountClicked(1000, 'Business')}>₹1000</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Sports[4]
                                ? <td onClick={(e) => props.onAmountClicked(1000, 'Sports')}>₹1000</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Films[4]
                                ? <td onClick={(e) => props.onAmountClicked(1000, 'Films')}>₹1000</td>
                                : <td></td>
                        }
                        {
                            props.amountCards.Editorial[4]
                                ? <td onClick={(e) => props.onAmountClicked(1000, 'Editorial')}>₹1000</td>
                                : <td></td>
                        }
                    </tr>
                </tbody>
            </table>
        </>
    )

}

export default GameScreen
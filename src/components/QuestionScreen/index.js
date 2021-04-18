import React from 'react'

/**
* @author
* @function QuestionScreen
**/

const QuestionScreen = (props) => {
    return (
        <>
            <table >
                <tr>
                    <td colSpan="7" className="content-money">{props.question.text}</td>
                </tr>
                <tr >
                    <td colSpan="7">Answer&nbsp;
        <input type="text" onInput={(e) =>props.handleAnswerInput(e)} value={props.answer}></input>
                    </td>
                </tr>
                <tr>
                    <td colSpan="7">
                        <button onClick={(e) => props.onAnswerSubmit()}>Submit</button>
                    </td>
                </tr>
            </table>
        </>
    )

}

export default QuestionScreen
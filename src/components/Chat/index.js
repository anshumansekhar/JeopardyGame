import React from 'react'

/**
* @author
* @function ChatBox
* Chat Box Component to display chat messages
**/

const ChatBox = (props) => {
  return (
    <>
    <div>
      ChatBox
      <div>
        <div className="chatBox">messages</div>
        <input type="textbox"></input>
        <input type="button" value="send"></input>
      </div>
      </div>
    </>
  )

}

export default ChatBox
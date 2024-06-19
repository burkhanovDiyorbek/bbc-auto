import { useState, useEffect } from "react";
import PropTypes from "prop-types";

 const ChatRoom = ({ roomName }) => {



  return (
    <div>
      <h1>Room: {roomName}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom

ChatRoom.propTypes = {
  roomName: PropTypes.string,
};

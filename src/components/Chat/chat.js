import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Feild from "../Feild/feild";
import Bar from "../Bar/bar";
import "./chat_style.css";
const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [userlist, setUserlist] = useState([]);

  const socketRef = useRef();

  const newUser = props.match.params.user;
  const userRoom = props.match.params.room;

  useEffect(() => {
    socketRef.current = io.connect(
      "https://chatapp-socketio-backend.herokuapp.com/",
      { transport: ["websocket"] }
    );

    socketRef.current.emit("join", { name: newUser, room: userRoom });

    socketRef.current.on("message", (message) => {
      setMessages((oldmsg) => [...oldmsg, message]);
    });
    socketRef.current.on("roomdata", (data) => {
      setUserlist(data.users);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chatContainer">
      <Bar users={userlist} />
      <Feild
        socketreff={socketRef}
        msg={messages}
        admin={newUser}
        room={userRoom}
      />
    </div>
  );
};

export default Chat;

import React, { useState, useEffect, useRef } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TelegramIcon from "@material-ui/icons/Telegram";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import "./feild_style.css";

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 500,
  },
  inp: {
    "& label.Mui-focused": {
      color: "red",
    },
    width: "85%",
  },
});

const Feild = ({ socketreff, msg, admin, room }) => {
  const classes = useStyles();
  const [inputval, setInputval] = useState("");
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const sendMsg = (e) => {
    e.preventDefault();
    if (inputval) {
      socketreff.current.emit("sendMessage", inputval);
      setInputval("");
    }
  };

  const chatFormatter = () => {
    if (msg) {
      return msg.map((message, index) => {
        if (message.user === "admin") {
          return (
            <span key={index} className="adminMsg">
              {message.text}
            </span>
          );
        } else if (message.user === admin) {
          return (
            <div key={index} className="sendMsg">
              <div className="innerMsg green">
                <span className="innerHead">{`Admin:${message.user}`}</span>
                <span className="innerText">{message.text}</span>
                <span className="innerTime">{message.time}</span>
              </div>
              <span className="triangle-right"></span>
            </div>
          );
        } else
          return (
            <div key={index} className="receiveMsg">
              <div className="innerMsg grey">
                <span className="innerHead">{message.user}</span>
                <span className="innerText">{message.text}</span>
                <span className="innerTime">{message.time}</span>
              </div>
              <span className="triangle-left"></span>
            </div>
          );
      });
    }
    return null;
  };

  return (
    <Card className={classes.root}>
      <div className="roomSpace">
        <MeetingRoomIcon />{" "}
        <span style={{ marginLeft: 5, marginRight: 5 }}>Room</span> | {room}
      </div>
      <div className="chatSpace" ref={messageEl}>
        {chatFormatter()}
      </div>
      <div className="typeSpace">
        <TextField
          label="Chat Here..."
          placeholder="Enter Messages"
          variant="filled"
          className={classes.inp}
          onChange={(e) => setInputval(e.target.value)}
          value={inputval}
        />
        <button className="sendButton" onClick={(e) => sendMsg(e)}>
          <TelegramIcon style={{ fontSize: 35, color: "black" }} />
        </button>
      </div>
    </Card>
  );
};

export default Feild;

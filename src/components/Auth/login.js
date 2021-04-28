import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import "./login_style.css";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 250,
    marginTop: 30,
    padding: 20,
    boxShadow: "0px 2px 36px -6px rgba(0,0,0,0.89)",
  },
  inp: {
    marginBottom: 20,
    "& label.Mui-focused": {
      color: "red",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
  },
  sel: {
    marginBottom: 30,
    "&:before": {
      borderColor: "red",
    },
    "&:after": {
      borderColor: "red",
    },
  },
  btn: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#bd0112",
    },
  },
});

const Login = () => {
  const [userName, setUsername] = useState("");
  const [roomName, setRoomname] = useState("Sports");

  const history = useHistory();
  const socketRef = useRef();

  const classes = useStyles();

  useEffect(() => {
    socketRef.current = io.connect(
      "https://chatapp-socketio-backend.herokuapp.com/",
      { transport: ["websocket"] }
    );

    socketRef.current.on("checkuser", (obj) => {
      if (obj.status === "available") {
        history.push(`/new/${obj.data.name}/${obj.data.room}`);
      } else {
        alert("Username already exist");
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!userName) {
      return alert("Please fill all feilds");
    } else if (userName === "admin" || userName === "Admin") {
      return alert(`You cant choose ${userName} as your username.`);
    }
    socketRef.current.emit("checkuser", {
      name: userName.toLowerCase(),
      room: roomName,
    });
  };

  return (
    <div className="loginContainer">
      <Card className={classes.root}>
        <h1 className="loginHeader">Chat App</h1>
        <form className="loginForm">
          <TextField
            label="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            className={classes.inp}
          />
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={roomName}
            onChange={(e) => setRoomname(e.target.value)}
            className={classes.sel}
          >
            <MenuItem value={"Sports"}>Sports</MenuItem>
            <MenuItem value={"Movies"}>Movies</MenuItem>
            <MenuItem value={"Programming"}>Programming</MenuItem>
            <MenuItem value={"Friends"}>Make Friends</MenuItem>
          </Select>

          <Button
            variant="contained"
            onClick={(e) => {
              handleCheck(e);
            }}
            className={classes.btn}
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;

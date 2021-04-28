import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import "./bar_style.css";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 500,
    marginRight: 8,
    backgroundColor: "#383838",
    padding: 12,
  },
});

const Bar = ({ users }) => {
  const classes = useStyles();

  const userList = () => {
    return users.map((user, index) => {
      return (
        <div key={index} className="userCont">
          <span className="tag">{user.name[0].toUpperCase()}</span>
          <span className="username">{user.name}</span>
        </div>
      );
    });
  };

  return (
    <Card className={classes.root}>
      <div className="userHeader">
        <h3 className="userHead">Users</h3>
      </div>
      <div className="userlist">{userList()}</div>
    </Card>
  );
};
export default Bar;

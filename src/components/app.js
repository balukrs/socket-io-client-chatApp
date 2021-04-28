import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Auth/login";
import Chat from "./Chat/chat";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login}></Route>
      <Route path="/new/:user/:room" component={Chat}></Route>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import Login from "./Login";

var isLoggedIn = true;

function renderConditionally(){
  if(isLoggedIn){
    return (<h1>Hello</h1>);
  }else{
    return(
      <Login />
    );
  }
}

function App() {
  return (
    <div className="container">
      {isLoggedIn ? <h1>Hello</h1> : <Login />}
    </div>
  );
}

export default App;

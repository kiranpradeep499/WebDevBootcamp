import React from "react";
function App() {
  const [buttonStyle, setButtonStyle] = React.useState({backgroundColor:"white"});
  return (
    <div className="container">
      <h1>Hello</h1>
      <input type="text" placeholder="What's your name?" />
      <button style={buttonStyle} onMouseOver={addStyle} onMouseLeave={removeStyle}>Submit</button>
    </div>
  );
  function addStyle(){
    setButtonStyle({backgroundColor:"black"});
  }
  function removeStyle(){
    setButtonStyle({backgroundColor:"white"});
  }
}
export default App;

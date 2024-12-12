import React from "react";

function App() {
  const [name, setName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  function handleChange(event){
    setName(event.target.value);
  }
  function handleClick(event){
    setDisplayName(name);
    event.preventDefault();
  }
  return (
    <div className="container">
      <h1>Hello {displayName}</h1>
      <form onSubmit={handleClick}>
        <input type="text" placeholder="What's your name?" onChange={handleChange} value={name}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

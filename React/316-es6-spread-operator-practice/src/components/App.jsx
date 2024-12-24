import React from "react";

function App() {
  const [toDoList, setToDoList] = React.useState([]);
  const [item, setItem] = React.useState("");

  function handleChange(event){
      const {name, value} = event.target;
      setItem(value);
  }
  function handleClick(){
    if(item.trim() != ""){
      setToDoList(prev => {
        return [...prev,item];
      });
    }
    setItem("");
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={item}/>
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {toDoList.map((todo, index) => (
            <li key={index}>{todo}</li> // Render each item in the list
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

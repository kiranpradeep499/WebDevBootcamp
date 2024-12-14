import React from "react";

function App() {
  const [fullName, setFullName] = React.useState({
    fName:"",
    lName:""
  });
  function handleNameChange(event){
    const {name, value} = event.target;
    setFullName(prev => {
      if(name === "fName"){
        return({
          fName: value,
          lName: prev.lName
        });
      }
      else if(name === "lName"){
        return({
          fName: prev.fName,
          lName: value
        });
      }
    })
    
  }
  
  return (
    <div className="container">
      <h1>Hello {fullName.fName} {fullName.lName}</h1>
      <form>
        <input onChange = {handleNameChange} name="fName" placeholder="First Name" value = {fullName.fName} />
        <input onChange = {handleNameChange} name="lName" placeholder="Last Name" value={fullName.lName}/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;

import React from "react";

function App() {
  setInterval(updateTime, 1000);
  
  let currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Ensures 24-hour format
  });
  console.log(currentTime);
  const [time, setTime] = React.useState(currentTime);
  
  function updateTime(){
    let newTime = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Ensures 24-hour format
    });
    setTime(newTime);
  }
  
  return (
    <div>
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;

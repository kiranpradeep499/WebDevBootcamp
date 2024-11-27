import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  return (
    <div>
      <Header />
      {notes.map(noteObject => <Note key={noteObject.key} title={noteObject.title} content={noteObject.content}/>)}
      <Footer />
    </div>
  );
}

export default App;

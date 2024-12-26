import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { v4 as uuidv4 } from 'uuid';

function App() {
  console.log("App rendered");
  const [notes, setNotes] = React.useState([]);
  function addNote(newNote){
    if(newNote.title.trim() != "" && newNote.content.trim() != ""){
      console.log(newNote);
      setNotes(prev => {
        return [...prev, newNote];
      });
    }
  }
  function deleteNote(id){
    setNotes(prev=>{
      return prev.filter((item,index)=>{
        return item.id != id;
      })
    })
  }
  function createNoteCard(note){
    return <Note key={note.id} title={note.title} content={note.content} id={note.id} onDelete={deleteNote}/>;
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(createNoteCard)}
      <Footer />
    </div>
  );
}

export default App;

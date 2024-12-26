import React from "react";
import { v4 as uuidv4 } from 'uuid';

function CreateArea(props) {
  const [note, setNote] = React.useState({
    id:"",
    title:"",
    content:""
  });
  function handleChange(event){
    const {name, value} = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]:value,
        id:uuidv4()
      };
    });
  }
  function handleSubmit(event){
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title:"",
      content:"",
      id:""
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="title" placeholder="Title" value={note.title} />
        <textarea onChange={handleChange} name="content" placeholder="Take a note..." rows="3" value={note.content} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

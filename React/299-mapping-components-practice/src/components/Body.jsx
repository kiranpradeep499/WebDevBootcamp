import React from "react";
import emojipedia from "../emojipedia";
import Entry from "./Entry";

function createEmojiCard(emojiObject){
    return (
        <Entry 
            key = {emojiObject.id}
            emojiName = {emojiObject.name}
            emoji= {emojiObject.emoji}
            emojiDetail={emojiObject.meaning}   
        />
    );
}

function Body(){
    emojipedia.map(getEmojiMeaning)
    return (
      <dl className="dictionary">
        {emojipedia.map(createEmojiCard)}    
      </dl>
    );
}

export default Body;
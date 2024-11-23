import React from "react";
import Heading from "./Heading";
import Card from "./Card";
import contacts from "../contacts";

function App() {
  return (
    <div>
      <Heading />
      {contacts.map((contact) => (
        <Card name={contact.name} tel={contact.phone} img={contact.imgURL}
          alt="avatar_img" email={contact.email}
        />
      ))}
    </div>
  );
}

export default App;

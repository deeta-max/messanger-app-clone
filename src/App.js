import React, { useState, useEffect} from 'react';
import './App.css';
import { Button, FormControl, Input } from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {

  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
      db.collection("messages").orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {setMessage(snapshot.docs.map(doc => ({id:doc.id,data:doc.data()})))})
  }, []);
  useEffect(() => {
    setUserName(prompt("Please Enter your name"));
  }, [])

  function handleClick(e){
    e.preventDefault();
    db.collection("messages").add({
    text:input,
    username:userName,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
  })
      setInput("");
  }
    
  return (
    <div className="App">
      <img className="image-logo" src="https://www.freepnglogos.com/uploads/facebook-messenger-png/file-facebook-messenger-logo-svg-17.png?" alt="logo" />
      <h3>Welcome {userName}</h3>
      <FlipMove className="messages-list">
      {message.map(({id,data}) => (<Message key={id} username={userName} text={data} />))}
      </FlipMove>
      <form className="app-form">
      <FormControl className="app-formControl">
      <Input className="form-input"  value={input} onChange={e => setInput(e.target.value)} placeholder="Your Message" />
      <IconButton type="submit" disabled={!input} onClick={handleClick} variant="contained" color="primary">
        <SendIcon />
      </IconButton>
      </FormControl>
      </form>
    </div>
  );
}

export default App;

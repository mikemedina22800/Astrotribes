import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import {useNavigate} from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      title, 
      text, 
      name: auth.currentUser.displayName
    });
    navigate("/")

    await addDoc(collection(db, "users", auth.currentUser.uid, "user-posts"), {
      title, 
      text, 
      name: auth.currentUser.displayName
    });
  };

  return (
    <div className="createPostPage">
      {" "}
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input placeholder="Title..." onChange={(event) => {setTitle(event.target.value)}}/>
        </div>
        <div className="inputGp">
          <label>Text:</label>
          <textarea placeholder="Text..." onChange={(event) => {setText(event.target.value)}}/>
        </div> 
        <button onClick={createPost}> Submit Post </button>     
      </div>
    </div>
  )
}

export default CreatePost
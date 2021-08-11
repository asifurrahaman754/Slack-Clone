import { useState } from "react";

import { useSelector } from "react-redux";
import { IoSendSharp } from "react-icons/io5";
import { useParams } from "react-router";
import firebase from "firebase";
import db from "../../../firebase";

import * as s from "./style.module.css";

export default function ChatInput() {
  console.log("chatInput render");
  const [inputValue, setinputValue] = useState("");
  const { roomDetails, user } = useSelector(state => state.slackSlice);
  const { channelId } = useParams();

  const sendMessage = e => {
    e.preventDefault();

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputValue,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.name,
      userImage: user.image,
    });

    setinputValue("");
  };

  return (
    <div className={s.ChatInput}>
      <form onSubmit={sendMessage} className={s.input_wrap}>
        <input
          placeholder={`Message #${roomDetails.name}`}
          onChange={e => setinputValue(e.target.value)}
          name="message"
          type="text"
          className={s.chat_inputField}
          required
          value={inputValue}
        />
        <button
          type="submit"
          className={`${s.chat_submit} ${inputValue && s.chat_submit_active}`}
        >
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
}

import { useState, useRef } from "react";

import { useSelector } from "react-redux";
import { IoSendSharp } from "react-icons/io5";
import { useParams } from "react-router";
import db from "../../../firebase";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";

import * as s from "./style.module.css";

export default function ChatInput() {
  const [inputValue, setinputValue] = useState("");
  const inputRef = useRef(null);
  const { roomDetails, user } = useSelector(state => state.slackSlice);
  const { channelId } = useParams();

  //for extend the power of day.js library
  dayjs.extend(LocalizedFormat);

  const setInputValue = () => {
    setinputValue(inputRef.current.textContent);
  };

  const sendMessage = e => {
    e.preventDefault();

    new Audio("/assets/message.mp3").play();
    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .add({
        message: inputValue,
        timestamp: dayjs().format("lll"),
        //time is for sorting the message
        time: dayjs().format("LTS"),
        user: user.name,
        userImage: user.image,
      });

    inputRef.current.textContent = "";
    setinputValue("");
  };

  return (
    <div className={s.ChatInput}>
      <form onSubmit={sendMessage} className={s.input_wrap}>
        {!inputValue && (
          <span className={s.input_placeholder}>
            Message #{roomDetails.name}
          </span>
        )}
        <div
          ref={inputRef}
          onInput={setInputValue}
          className={s.chat_inputField}
          id="input"
          contentEditable
          suppressContentEditableWarning={true}
        ></div>

        <button
          disabled={inputValue ? false : true}
          type="submit"
          className={`${s.chat_submit} ${inputValue && s.chat_submit_active}`}
        >
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
}

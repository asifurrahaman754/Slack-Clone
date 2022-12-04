import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "simplebar";
import "simplebar/dist/simplebar.css";
import dayjs from "dayjs";

import db from "../../firebase";
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { setroomDetails } from "redux/ChatSlice";
import { sortMessage } from "Utils";
import * as s from "./style.module.css";

export default function Chat({ roomDetails }) {
  const [roomMessages, setroomMessages] = useState([]);
  const [chatLoading, setchatLoading] = useState(false);
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  //scrool to the bottom of the page
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateHistory = (roomName) => {
    let updatedHistory;
    //check if the history is already in the local storage
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const isChannelInHistory = history.find(
      (channel) => channel.id === channelId
    );
    const newHistory = {
      id: channelId,
      channel: roomName,
      time: dayjs().format("ll LT"),
    };

    //if the channel is not in the history, add it to the history
    if (!isChannelInHistory) {
      updatedHistory = [newHistory, ...history];
    } else if (isChannelInHistory) {
      //if it is , move it to the top of the history
      const otherHistoryItems = history.filter(
        (channel) => channel.id !== channelId
      );
      updatedHistory = [newHistory, ...otherHistoryItems];
    }

    //if the history is more than 4, remove the last one
    if (updatedHistory.length > 4) {
      updatedHistory.pop();
    }

    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    setchatLoading(true);

    //fetch the room info from firestore if a room is selected
    if (channelId) {
      db.collection("rooms")
        .doc(channelId)
        .onSnapshot((snapshot) => {
          dispatch(setroomDetails(snapshot.data()));
          updateHistory(snapshot.data().name);
        });
    }

    //fetch room messages
    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedMessage = sortMessage(messages);
        setroomMessages(sortedMessage);
        setchatLoading(false);
        scrollToBottom();
      });
  }, [channelId, dispatch]);

  return (
    <div className={s.chat_container}>
      {chatLoading && <div className={s.loading}>Loading&#8230;</div>}
      <ChatHeader roomDetails={roomDetails} />

      <div data-simplebar className={s.chat_box}>
        <div>
          {!roomMessages?.length && (
            <h4 className={s.no_msg}>There are no message in the room</h4>
          )}

          {roomMessages.map((chat) => (
            <Message key={chat.id} chat={chat} />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput />
    </div>
  );
}

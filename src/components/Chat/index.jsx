import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "simplebar";
import "simplebar/dist/simplebar.css";

import db from "../../firebase";
import * as s from "./style.module.css";
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { setroomDetails } from "../../redux/ChatSlice";
import { sortMessage } from "../../Utils";

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

  useEffect(() => {
    setchatLoading(true);

    //fetch the room info from firestore if a room is selected
    if (channelId) {
      db.collection("rooms")
        .doc(channelId)
        .onSnapshot(snapshot => {
          dispatch(setroomDetails(snapshot.data()));
        });
    }

    //fetch room messages
    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedMessage = sortMessage(messages);
        setroomMessages(sortedMessage);
        setchatLoading(false);
        scrollToBottom();
      });
  }, [channelId]);

  return (
    <div className={s.chat_container}>
      {chatLoading && <div className={s.loading}>Loading&#8230;</div>}
      <ChatHeader roomDetails={roomDetails} />

      <div data-simplebar className={s.chat_box}>
        <div>
          {!roomMessages?.length && (
            <h4 className={s.no_msg}>There are no message in the room</h4>
          )}

          {roomMessages.map(({ id, user, userImage, message, timestamp }) => (
            <Message
              key={id}
              user={user}
              userImage={userImage}
              message={message}
              timestamp={timestamp}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput />
    </div>
  );
}

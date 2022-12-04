import { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import * as s from "./style.module.css";
import db from "../../../firebase";

export default function Message({ chat }) {
  const [showmsgOpList, setshowmsgOpList] = useState(false);
  const { id, user, createdUserId, userImage, message, timestamp } = chat;

  return (
    <div className={s.message_wrap}>
      <img
        loading="lazy"
        className={s.chat_user_image}
        src={userImage}
        alt="user"
      />

      <div className={s.message_info}>
        <h4>
          {user}

          <span className={s.user_msg_time}>{timestamp}</span>
        </h4>
        <p className={s.user_message}>{message}</p>
      </div>

      <span
        onClick={() => setshowmsgOpList(!showmsgOpList)}
        className={s.message_options_icon}
      >
        <BsThreeDotsVertical />
      </span>

      <MessageOptions
        createdUserId={createdUserId}
        messageId={id}
        showmsgOpList={showmsgOpList}
      />
    </div>
  );
}

function MessageOptions({ showmsgOpList, messageId, createdUserId }) {
  const user = useSelector((state) => state.slackSlice.user);
  const { channelId } = useParams();

  //check if the loged-in user id matches with the message id
  const userOwnMessage = user.id === createdUserId;

  const handleMessageDelete = () => {
    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .doc(messageId)
      .delete();
  };

  return (
    <ul
      style={{ display: showmsgOpList ? "block" : "none" }}
      className={s.message_options_wrap}
    >
      <li
        onClick={handleMessageDelete}
        className={`${s.message_option_delete} ${
          !userOwnMessage && s.message_option_delete_disable
        }`}
      >
        Delete message
      </li>
    </ul>
  );
}

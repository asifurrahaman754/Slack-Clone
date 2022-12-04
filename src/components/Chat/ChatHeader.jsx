import { useDispatch, useSelector } from "react-redux";

import { setshowSidebar } from "redux/ChatSlice";
import { BsWindow } from "react-icons/bs";
import * as s from "./style.module.css";

export default function ChatHeader() {
  const roomDetails = useSelector((state) => state.slackSlice.roomDetails);
  const dispatch = useDispatch();

  return (
    <div className={s.chat_header}>
      <span
        onClick={() => dispatch(setshowSidebar(true))}
        className={s.sidebar_menu_icon}
      >
        <BsWindow />
      </span>

      <h3>#{roomDetails?.name}</h3>
      <p title={roomDetails?.description} className={s.chat_description}>
        {roomDetails?.description}
      </p>
    </div>
  );
}

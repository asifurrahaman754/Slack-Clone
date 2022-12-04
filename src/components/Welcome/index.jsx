import { useDispatch } from "react-redux";

import * as s from "./style.module.css";
import { setshowSidebar } from "../../redux/ChatSlice";

export default function Welcome() {
  const dispatch = useDispatch();
  return (
    <div className={s.welcome_container}>
      <h3>Welcome to the Slack Community</h3>
      <button
        onClick={() => dispatch(setshowSidebar(true))}
        className={s.open_room}
      >
        <img src="/assets/SlackLogo.png" alt="slack logo" />
        select a room
      </button>
    </div>
  );
}

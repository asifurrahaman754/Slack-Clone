import { useState } from "react";
import { useSelector } from "react-redux";

import { BiTime } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { MdAccountBox } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import * as s from "./style.module.css";
import { truncate } from "fs";

export default function Header() {
  const user = useSelector(state => state.slackSlice.user);
  const [hdHidden, sethdHidden] = useState(true);

  return (
    <header className={s.header_section}>
      <nav className={s.header_nav}>
        <span className={s.nav_history_icon}>
          <BiTime />
        </span>

        <div className={s.nav_search_wrap}>
          <input
            placeholder="Search #Rooms"
            type="search"
            name="search"
            className={s.nav_search_input}
          />
          <span className={s.nav_search_icon}>
            <FiSearch />
          </span>
        </div>

        <div className={s.nav_help_wrap}>
          <span
            onClick={() => sethdHidden(!hdHidden)}
            className={s.nav_help_icon}
          >
            <BsQuestionCircle />
          </span>

          <p
            style={{ display: hdHidden ? "none" : "block" }}
            className={s.help_description}
          >
            This is a communication platform where people can create different
            room and chat in real time with roommates
          </p>
        </div>
      </nav>

      <div className={s.header_user_wrap}>
        {user?.image ? (
          <div className={s.user_profile_img}>
            <img src={user?.image} alt="user profile image" />
          </div>
        ) : (
          <span className={s.user_icon}>
            <MdAccountBox />
          </span>
        )}
      </div>
    </header>
  );
}

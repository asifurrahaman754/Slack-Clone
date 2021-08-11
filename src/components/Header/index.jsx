import { useSelector } from "react-redux";

import { BiTime } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { MdAccountBox } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import * as s from "./style.module.css";

export default function Header() {
  const user = useSelector(state => state.slackSlice.user);

  return (
    <header className={s.header_section}>
      <nav className={s.header_nav}>
        <span className={s.nav_history_icon}>
          <BiTime />
        </span>

        <div className={s.nav_search_wrap}>
          <input
            placeholder="Search QA World"
            type="search"
            name="search"
            className={s.nav_search_input}
          />
          <span className={s.nav_search_icon}>
            <FiSearch />
          </span>
        </div>

        <span className={s.nav_help_icon}>
          <BsQuestionCircle />
        </span>
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

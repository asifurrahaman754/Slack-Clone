import { useState } from "react";
import { useSelector } from "react-redux";

import { BiTime } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { MdAccountBox } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import "simplebar";
import "simplebar/dist/simplebar.css";
import * as s from "./style.module.css";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

export default function Header() {
  const [searchInput, setsearchInput] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [hdHidden, sethdHidden] = useState(true);
  const [signouthide, setsignouthide] = useState(true);
  const { user, rooms } = useSelector(state => state.slackSlice);
  const history = useHistory();

  //when user change in search
  const handleChange = e => {
    const searchValue = e.target.value;
    setsearchInput(searchValue);

    let searchResultArr = [];
    //if the search value matches the existing rooms then push them in the array
    rooms.forEach(room => {
      if (room.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
        searchResultArr.push(room);
      }
    });

    setsearchResult(searchResultArr);
  };

  //when user clicks on the search result list item
  const handleClick = e => {
    const clickedChannelId = e.target.id;
    history.push(`/room/${clickedChannelId}`);

    setsearchInput("");
  };

  const handleSignout = () => {
    auth.signOut();
  };

  return (
    <header className={s.header_section}>
      <nav className={s.header_nav}>
        <span className={s.nav_history_icon}>
          <BiTime />
        </span>

        <div className={s.nav_search_wrap}>
          <input
            onInput={handleChange}
            maxLength="20"
            placeholder="Search #Rooms"
            type="search"
            name="search"
            value={searchInput}
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

      {searchInput && (
        <div className={s.search_result_container}>
          <h3 className={s.search_result_header}>
            <span>
              <HiOutlineDocumentSearch />
            </span>
            Searching for {searchInput}
          </h3>

          <ul data-simplebar className={s.search_result_list_wrap}>
            <div>
              {searchResult.length ? (
                searchResult.map(room => (
                  <li onClick={handleClick} id={room.id} key={room.id}>
                    # {room.name}
                  </li>
                ))
              ) : (
                <h4>No result found</h4>
              )}
            </div>
          </ul>
        </div>
      )}

      <div className={s.header_user_wrap}>
        {user?.image ? (
          <div
            onClick={() => setsignouthide(!signouthide)}
            className={s.user_profile_img}
          >
            <img src={user?.image} alt="user profile " />
          </div>
        ) : (
          <span
            onClick={() => setsignouthide(!signouthide)}
            className={s.user_icon}
          >
            <MdAccountBox />
          </span>
        )}

        <button
          style={{ display: signouthide ? "none" : "block" }}
          onClick={handleSignout}
          className={s.sign_out}
        >
          sign out
        </button>
      </div>
    </header>
  );
}

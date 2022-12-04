import { useState, useEffect, useRef } from "react";

import { BsPencilSquare } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropleft, IoMdArrowDropdown } from "react-icons/io";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "simplebar";
import sidebarOptions from "data/SidebarOptions.js";
import "simplebar/dist/simplebar.css";
import dayjs from "dayjs";

import SidebarItem from "./SidebarItem";
import db from "../../firebase";
import { setRooms, setshowChannelModal, setshowSidebar } from "redux/ChatSlice";
import * as s from "./style.module.css";

function Sidebar() {
  const [toggleshowOptions, settoggleshowOptions] = useState(false);
  const [showChannels, setshowChannels] = useState(true);
  const wrapperRef = useRef(null);
  const history = useHistory();

  const dispatch = useDispatch();
  const { showSidebar, showChannelModal, user, rooms } = useSelector(
    (state) => state.slackSlice
  );

  //close the sidebar whenever clicking outside of the sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        //check if the modal is open
        !showChannelModal && dispatch(setshowSidebar(false));
      }
    }

    showSidebar && document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSidebar, showChannelModal, dispatch]);

  //update the channel-chat info when user clicks on a channel
  const handleChannelClick = (e) => {
    history.push(`/room/${e.target.id}`);
    //hide the sidebar in mobile viewport
    dispatch(setshowSidebar(false));
    updateHistory(e.target);
  };

  const updateHistory = (targetEl) => {
    const { innerText, id } = targetEl;
    let updatedHistory;

    //check if the history is already in the local storage
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const isChannelInHistory = history.find((channel) => channel.id === id);

    //if the channel is not in the history, add it to the history
    if (!isChannelInHistory) {
      const newHistory = [
        { id, channel: innerText, time: dayjs().format("ll LT") },
        ...history,
      ];
      updatedHistory = newHistory;
    } else if (isChannelInHistory) {
      //if it is in the history, move it to the top of the history
      const otherHistoryItems = history.filter((channel) => channel.id !== id);
      const newHistory = [
        { id, channel: innerText, time: dayjs().format("ll LT") },
        ...otherHistoryItems,
      ];
      updatedHistory = newHistory;
    }

    //if the history is more than 4, remove the last one
    if (updatedHistory.length > 4) {
      updatedHistory.pop();
    }

    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  const toggleShowChannel = (e) => {
    //check if the user clicked on the add_new_channel button
    const isPlusBtn =
      e.target.hasAttribute("data-title") ||
      e.target.parentNode.hasAttribute("data-title");

    !isPlusBtn && setshowChannels(!showChannels);
  };

  const showModal = (e) => {
    dispatch(setshowChannelModal(true));
  };

  //fetch all the rooms/channels from firebase store;
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));

      dispatch(setRooms(data));
    });
  }, [dispatch]);

  return (
    <div
      ref={wrapperRef}
      className={`${s.sidebar_container} ${showSidebar && s.toggle_sidebar}`}
    >
      <div className={s.sidebar_header}>
        <h3>{user?.name}</h3>
        <span className={s.sidebar_header_icon}>
          <BsPencilSquare />
        </span>
      </div>

      <div data-simplebar className={s.sidebar_options_wrap}>
        <div>
          {toggleshowOptions && (
            <>
              {sidebarOptions.map(({ id, title, Icon }) => (
                <SidebarItem key={id} title={title}>
                  {Icon}
                </SidebarItem>
              ))}
            </>
          )}
          <SidebarItem
            onClick={() => settoggleshowOptions(!toggleshowOptions)}
            title={`show ${toggleshowOptions ? "less" : "more"}`}
            Icon={toggleshowOptions ? <MdExpandLess /> : <MdExpandMore />}
          />

          <SidebarItem
            onClick={toggleShowChannel}
            classname={s.channels}
            title="Channels"
            Icon={showChannels ? <IoMdArrowDropdown /> : <IoMdArrowDropleft />}
            Icon2={AiOutlinePlus}
            showModal={showModal}
          />

          {showChannels && (
            <div className={s.channel_list}>
              {rooms.map((channel) => (
                <SidebarItem
                  onClick={handleChannelClick}
                  id={channel.id}
                  title={channel.name}
                  key={channel.id}
                />
              ))}
              <SidebarItem
                onClick={showModal}
                title="Add channel"
                Icon={<AiOutlinePlus />}
                addIconStyle={s.addIcon_Style}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

import { useState, useEffect, useRef } from "react";

import { BsPencilSquare, BsBookmark, BsPeopleFill } from "react-icons/bs";
import { CgComment } from "react-icons/cg";
import { AiOutlinePlus } from "react-icons/ai";
import { RiFileCopy2Line } from "react-icons/ri";
import { IoMdArrowDropleft, IoMdArrowDropdown } from "react-icons/io";
import {
  MdMoveToInbox,
  MdDrafts,
  MdApps,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "simplebar";
import "simplebar/dist/simplebar.css";

import SidebarOptions from "./SidebarOptions";
import db from "../../firebase";
import { setshowChannelModal, setshowSidebar } from "../../redux/ChatSlice";
import * as s from "./style.module.css";

function Sidebar() {
  console.log("Sidebar render");
  const [toggleshowOptions, settoggleshowOptions] = useState(false);
  const [showChannels, setshowChannels] = useState(true);
  const [channels, setchannels] = useState([]);
  const wrapperRef = useRef(null);
  const history = useHistory();

  const dispatch = useDispatch();
  const { showSidebar, showChannelModal, user } = useSelector(
    state => state.slackSlice
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
  }, [showSidebar, showChannelModal]);

  //update the channel-chat info when user clicks on a channel
  const handleChannelClick = e => {
    const el = e.target.localName === "div" ? e.target : e.target.parentNode;
    history.push(`/room/${el.id}`);

    //hide the sidebar in mobile viewport
    dispatch(setshowSidebar(false));
  };

  const toggleShowChannel = e => {
    //check if the user clicked on the add_new_channel button
    const isPlusBtn =
      e.target.hasAttribute("data-title") ||
      e.target.parentNode.hasAttribute("data-title");

    !isPlusBtn && setshowChannels(!showChannels);
  };

  const showModal = e => {
    dispatch(setshowChannelModal(true));
  };

  //fetch all the rooms/channels from firebase store;
  useEffect(() => {
    db.collection("rooms").onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));

      setchannels(data);
    });
  }, []);

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
              <SidebarOptions title="Threads" Icon={CgComment} />
              <SidebarOptions
                title="Mentions & reactions"
                Icon={MdMoveToInbox}
              />
              <SidebarOptions title="Saved items" Icon={MdDrafts} />
              <SidebarOptions title="Channel browser" Icon={BsBookmark} />
              <SidebarOptions title="People & user group" Icon={BsPeopleFill} />
              <SidebarOptions title="Apps" Icon={MdApps} />
              <SidebarOptions title="FIle browser" Icon={RiFileCopy2Line} />
            </>
          )}
          <SidebarOptions
            onClick={() => settoggleshowOptions(!toggleshowOptions)}
            title={`show ${toggleshowOptions ? "less" : "more"}`}
            Icon={toggleshowOptions ? MdExpandLess : MdExpandMore}
          />

          <SidebarOptions
            onClick={toggleShowChannel}
            classname={s.channels}
            title="Channels"
            Icon={showChannels ? IoMdArrowDropdown : IoMdArrowDropleft}
            Icon2={AiOutlinePlus}
            showModal={showModal}
          />

          {showChannels && (
            <div className={s.channel_list}>
              {channels.map(channel => (
                <SidebarOptions
                  onClick={handleChannelClick}
                  id={channel.id}
                  title={channel.name}
                  key={channel.id}
                />
              ))}
              <SidebarOptions
                onClick={showModal}
                title="Add channel"
                Icon={AiOutlinePlus}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

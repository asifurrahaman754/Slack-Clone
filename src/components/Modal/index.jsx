import { useRef } from "react";

import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import * as s from "./style.module.css";
import { setshowChannelModal } from "redux/ChatSlice";
import db from "../../firebase";

export default function Modal() {
  const nameRef = useRef(null);
  const desRef = useRef(null);
  const rooms = useSelector((state) => state.slackSlice.rooms);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = desRef.current.value;

    //check if the room is already exists
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].name === name) {
        alert("Room already exist with this name, try a different name.");
        return;
      }
    }

    //if it is a new room store it in firebase store
    db.collection("rooms").add({ name, description });
    closeModal();
  };

  const closeModal = (e) => {
    dispatch(setshowChannelModal(false));
  };

  return (
    <div className={s.modal_bg_container}>
      <div className={s.modal_container}>
        <div className={s.modal_heading}>
          <h1>Create a channel</h1>
          <span onClick={closeModal} className={s.modal_close_btn}>
            <GrClose />
          </span>
        </div>

        <p className={s.about_modal}>
          Channels are where your team communicates. They’re best when organised
          around a topic – #marketing, for example.
        </p>

        <form onSubmit={handleSubmit} className={s.modal_input_wrap}>
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            required
            maxLength="20"
            type="text"
            name="name"
            id="name"
          />

          <label htmlFor="description">
            Description <span>(optional)</span>
          </label>
          <input ref={desRef} type="text" name="description" id="description" />
          <span className={s.about_description}>
            What’s this channel about?
          </span>

          <button className={s.modal_submit} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

import * as s from "./style.module.css";

export default function Message({ user, userImage, message, timestamp }) {
  return (
    <div className={s.message_wrap}>
      <img
        loading="lazy"
        className={s.chat_user_image}
        src={userImage}
        alt="user image"
      />

      <div className={s.message_info}>
        <h4>
          {user}

          <span className={s.user_msg_time}>
            {new Date(timestamp).toLocaleString()}
          </span>
        </h4>
        <p className={s.user_message}>{message}</p>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import * as s from "./style.module.css";

export default function SidebarOptions({
  classname = "",
  id,
  title,
  Icon,
  Icon2,
  onClick,
  showModal,
  addIconStyle,
}) {
  const { name: activeChannel } = useSelector(
    state => state.slackSlice.roomDetails
  );

  return (
    <div
      id={id && id}
      onClick={onClick && onClick}
      className={`${s.sidebar_option} ${classname} ${
        activeChannel === title && s.channel_active
      }`}
    >
      <span
        className={`${s.sidebar_option_icon} ${addIconStyle && addIconStyle}`}
      >
        {Icon ? <Icon /> : "#"}
      </span>
      <span className={s.sidebar_option_title}>{title}</span>

      {Icon2 && (
        <span
          onClick={showModal && showModal}
          data-title="Add a new channel"
          title="Add a new channel"
          className={s.sidebar_option_icon2}
        >
          <Icon2 data-title="Add a new channel" />
        </span>
      )}
    </div>
  );
}

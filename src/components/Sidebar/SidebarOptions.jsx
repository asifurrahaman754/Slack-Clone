import * as s from "./style.module.css";

export default function SidebarOptions({
  classname = "",
  id,
  title,
  Icon,
  Icon2,
  onClick,
  showModal,
}) {
  return (
    <div
      id={id && id}
      onClick={onClick && onClick}
      className={`${s.sidebar_option} ${classname}`}
    >
      <span className={s.sidebar_option_icon}>{Icon ? <Icon /> : "#"}</span>
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

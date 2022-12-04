import { useHistory } from "react-router-dom";
import * as s from "./style.module.css";

const History = ({ setshowHistory }) => {
  const histories = JSON.parse(localStorage.getItem("history"));
  const history = useHistory();

  function handleClick(id) {
    history.push(`/room/${id}`);
    setshowHistory(false);
  }

  return (
    <ul className={s.history_wrapper}>
      {histories?.map(({ id, channel, time }) => (
        <li key={id} className={s.history_item} onClick={() => handleClick(id)}>
          {channel}
          <span className={s.history_item_time}>{time}</span>
        </li>
      ))}
    </ul>
  );
};

export default History;

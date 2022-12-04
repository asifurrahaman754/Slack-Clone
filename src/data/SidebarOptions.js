import { CgComment } from "react-icons/cg";
import { MdMoveToInbox, MdDrafts, MdApps } from "react-icons/md";
import { BsPeopleFill, BsBookmark } from "react-icons/bs";
import { RiFileCopy2Line } from "react-icons/ri";

const sidebarOptions = [
  {
    id: 1,
    title: "Threads",
    Icon: <CgComment />,
  },
  {
    id: 2,
    title: "Mentions & Reactions",
    Icon: <MdMoveToInbox />,
  },
  {
    id: 3,
    title: "Saved Items",
    Icon: <MdDrafts />,
  },
  {
    id: 4,
    title: "Channel Browser",
    Icon: <BsBookmark />,
  },
  {
    id: 5,
    title: "People & User Groups",
    Icon: <BsPeopleFill />,
  },
  {
    id: 6,
    title: "Apps",
    Icon: <MdApps />,
  },
  {
    id: 7,
    title: "File Browser",
    Icon: <RiFileCopy2Line />,
  },
];

export default sidebarOptions;

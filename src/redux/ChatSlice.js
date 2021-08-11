import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showChannelModal: false,
  showSidebar: false,
  user: null,
  roomDetails: {},
};

export const slackSlice = createSlice({
  name: "SlackData",
  initialState,
  reducers: {
    setshowChannelModal: (state, action) => {
      state.showChannelModal = action.payload;
    },
    setshowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setuser: (state, action) => {
      state.user = action.payload;
    },
    setroomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setshowChannelModal, setshowSidebar, setuser, setroomDetails } =
  slackSlice.actions;

export default slackSlice.reducer;

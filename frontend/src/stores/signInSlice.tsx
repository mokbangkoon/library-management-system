import { createSlice } from "@reduxjs/toolkit";

const loginIn = createSlice({
  name: 'loginIn',
  initialState: { active: false },
  reducers: {
    activeSign(state) {
      state.active ? (state.active = false) : (state.active = true);
    },
    openSign(state) {
      state.active = true;
    },
    closeSign(state) {
      state.active = false;
    },
  },
});
export default loginIn;
export const { activeSign, openSign, closeSign } = loginIn.actions;

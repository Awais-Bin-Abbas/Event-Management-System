
import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registrations",

  initialState: JSON.parse(localStorage.getItem("registrations")) || [],

  reducers: {
    addRegistration: (state, action) => {
      const alreadyRegistered = state.some(
        (registration) =>
          registration.eventId === action.payload.eventId &&
          registration.userEmail === action.payload.userEmail
      );

      if (!alreadyRegistered) {
        state.push(action.payload);
      }
    },

    cancelRegistration: (state, action) => {
      return state.filter(
        (registration) =>
          !(
            registration.eventId === action.payload.eventId &&
            registration.userEmail === action.payload.userEmail
          )
      );
    },
  },
});

export const { addRegistration, cancelRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;

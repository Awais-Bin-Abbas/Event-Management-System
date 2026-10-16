import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import registrationReducer from "./registrationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    registrations: registrationReducer,
  },
});

export default store;
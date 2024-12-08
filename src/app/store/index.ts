import { AnyAction, configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
function authReducer(state = {}, action: AnyAction): {} {
  switch (action.type) {
    default:
      return state;
  }
}

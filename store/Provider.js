"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { rehydrateAuth, setRehydrated, AUTH_STORAGE_KEY } from "./slices/authSlice";

function RehydrateAuth({ children }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { user, token } = JSON.parse(stored);
        if (user) store.dispatch(rehydrateAuth({ user, token }));
      }
    } catch (_) {}
    store.dispatch(setRehydrated());
  }, []);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <RehydrateAuth>{children}</RehydrateAuth>
    </Provider>
  );
}

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Slice } from "./slice";

const persistConfig = {
  key: "root", 
  version:1,
  storage, 
};

const persistedReducer = persistReducer(persistConfig, Slice.reducer);

const store = configureStore({
  reducer: {
    shopCart: persistedReducer, 
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import themeReducer from "./Theme/themeSlice";
import allUsersReducer from "./userSlice/allUsersSlice";

// Configure persistence
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  allUsers: allUsersReducer,
});

// Configure redux persistence
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persisteReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisteReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false})
});

export const persistor=persistStore(store)

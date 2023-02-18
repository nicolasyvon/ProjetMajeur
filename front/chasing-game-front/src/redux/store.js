import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import timerReducer from "./reducers/timerReducer";
import roomReducer from "./reducers/roomReducer";
import mapReducer from "./reducers/mapReducer";
import playerCordsReducer from "./reducers/playerCordsReducer";
import playerVolumeReducer from "./reducers/playerVolumeReducer";

export default configureStore({
  reducer: {
    userReducer: userReducer,
    timerReducer: timerReducer,
    roomReducer: roomReducer,
    mapReducer: mapReducer,
    playerCordsReducer: playerCordsReducer,
    playerVolumeReducer: playerVolumeReducer,
  },
});

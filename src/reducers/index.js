import { combineReducers } from "redux";

import { songsReducer } from "./songsReducer";
import { toggleActiveReducer } from "./toggleActiveReducer";

export default combineReducers({ songsReducer, toggleActiveReducer });

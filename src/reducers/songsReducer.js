import {
  FETCH_SONGS_ERROR,
  FETCH_SONGS_LOADING,
  FETCH_SONGS_SUCCESS
} from "../actions/types";

const initialState = {
  loading: false,
  songsList: [],
  error: null
};

export function songsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SONGS_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case FETCH_SONGS_SUCCESS:
      return {
        ...state,
        songsList: action.payload
      };
    case FETCH_SONGS_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export const getSongs = state => state.songsList;
export const getSongsLoading = state => state.loading;
export const getLoadingError = state => state.error;

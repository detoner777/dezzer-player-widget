import {
  FETCH_SONGS_ERROR,
  FETCH_SONGS_LOADING,
  FETCH_SONGS_SUCCESS,
} from "./types";

export function fetchSongsLoading(loading) {
  return {
    type: FETCH_SONGS_LOADING,
    loading: loading,
  };
}

export function fetchSongsSuccess(songsList) {
  return {
    type: FETCH_SONGS_SUCCESS,
    songsList: songsList,
  };
}

export function fetchSongsError(error) {
  return {
    type: FETCH_SONGS_ERROR,
    error: error,
  };
}

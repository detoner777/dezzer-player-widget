import axios from "axios";

import {
  fetchSongsLoading,
  fetchSongsSuccess,
  fetchSongsError,
} from "./fetchLoadingErr";

const axiosHeader = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "fd5e535407msh96b57bf29ae745cp16744cjsne6da179ab6f5",
  },
  //use proxy server to solve cors issues
  proxy: {
    host: "104.236.174.88",
    port: 3128,
  },
};

function fetchSongs(searchValue) {
  return (dispatch) => {
    dispatch(fetchSongsLoading(true));
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://deezerdevs-deezer.p.rapidapi.com/artist/${searchValue}`,
        axiosHeader
      )
      .then((response) => {
        const traklist = response.data.tracklist;
        return axios.get(
          `https://cors-anywhere.herokuapp.com/${traklist}`,
          axiosHeader
        );
      })
      .then((response) => {
        dispatch(fetchSongsSuccess(response.data.data));
        console.log(response.data.data);
        dispatch(fetchSongsLoading(false));
        return response.songsList;
      })
      .catch((err) => {
        dispatch(fetchSongsError(err.message));
      });
  };
}

export default fetchSongs;

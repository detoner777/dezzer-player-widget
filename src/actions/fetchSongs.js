import {
  fetchSongsLoding,
  fetchProductsSuccess,
  fetchProductsError
} from "./fetchLoadingErr";

const axiosHeader = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "fd5e535407msh96b57bf29ae745cp16744cjsne6da179ab6f5"
  },
  //use proxy server to solve cors issues
  proxy: {
    host: "104.236.174.88",
    port: 3128
  }
};

function fetchSongs(searchValue) {
  dispatch(fetchSongsLoding(true));
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://deezerdevs-deezer.p.rapidapi.com/artist/${searchValue}`,
      axiosHeader
    )
    .then(response => {
      const traklist = response.data.tracklist;
      return axios.get(
        `https://cors-anywhere.herokuapp.com/${traklist}`,
        axiosHeader
      );
    })
    .then(response => {
      dispatch(fetchProductsSuccess(response.songsList));
      dispatch(fetchSongsLoding(false));
      return response.songsList;

      //   setSongsList(response.data.data);
      //   console.log(response.data.data);
      //   setLoading(false);
    })
    .catch(err => {
      dispatch(fetchProductsError(err));
      //   setErrorMessage(err.message);
    });
}

export default fetchSongs;

import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Player from "./components/Player";
import Song from "./components/Song";
import axios from "axios";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [songsList, setSongsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

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
        setSongsList(response.data.data);
        console.log(response.data.data);
      })
      .catch(err => {
        setErrorMessage(err);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <Search search={search} />
      <Player />
      <div className="songs">
        {loading && !setErrorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          songsList.map((song, index) => <Song key={`${index}`} song={song} index={index}/>)
        )}
      </div>
    </div>
  );
};

export default App;

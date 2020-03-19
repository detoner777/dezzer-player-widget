import React, { useState, useEffect } from "react";
import Search from "./components/Search";
// import Player from "./components/Player";
import SongsList from "./components/SongsLis";
import axios from "axios";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(false);

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
        setLoading(false);
      })
      .catch(err => {
        setErrorMessage(err.message);

        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <Search search={search} />
      <div className="main-wrapper">
        {/* <Player /> */}
        <SongsList
          loading={loading}
          errorMessage={errorMessage}
          songsList={songsList}
        />
      </div>
    </div>
  );
};

export default App;

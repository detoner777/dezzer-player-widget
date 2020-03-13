import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Player from "./components/Player";
import SongsList from "./components/SongsList";
import axios from "axios";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState([]);
  const [errorMesage, setErrorMessage] = useState(null);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    //   fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    //     .then(response => )response.json()
    //     .then(jsonResponse => {
    //       if (jsonResponse.Response === "True") {
    //         setArtist(jsonResponse.Search);
    //         setLoading(false);
    //       } else {
    //         setErrorMessage(jsonResponse.Error);
    //         setLoading(false);
    //       }
    //     });
    // };

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://deezerdevs-deezer.p.rapidapi.com/artist/${searchValue}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "fd5e535407msh96b57bf29ae745cp16744cjsne6da179ab6f5"
          },
          //use proxy server to solve cors issues
          proxy: {
            host: "104.236.174.88",
            port: 3128
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Search search={search} />
      <Player />
      <SongsList />
    </div>
  );
};

export default App;

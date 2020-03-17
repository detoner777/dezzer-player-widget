import React, { useState, useEffect } from "react";
import Song from "./Song";

const SongsList = ({ loading, errorMessage, songsList }) => {
  const [toggleAtive, setToggleAtive] = useState();

  return (
    <div className="songs__list">
      {loading && !errorMessage ? (
        <span>Loading...</span>
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        songsList.map((song, index) => (
          <Song
            key={`${index}`}
            song={song}
            index={index}
            active={toggleAtive === index}
            setToggleAtive={setToggleAtive}
          />
        ))
      )}
      
    </div>
  );
};

export default SongsList;

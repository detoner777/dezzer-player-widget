import React, { useState, useEffect } from "react";
import Song from "./Song";

function SongsList({ loading, errorMessage, songsList }) {
  return (
    <div className="songs__list">
      {loading && !errorMessage ? (
        <span>Loading...</span>
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        songsList.map((song, index) => (
          <Song key={`${index}`} song={song} index={index} />
        ))
      )}
    </div>
  );
}

export default SongsList;

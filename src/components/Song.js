import React, { useState, useEffect } from "react";

const Song = ({ song, index }) => {
  console.log(song);

  function timeFormat(time) {
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  return (
    <div className="song">
      <span>{index + 1}</span>
      <a href={song.preview} className="song__title">
        {song.title}
      </a>
      <span>{timeFormat(song.duration)}</span>
    </div>
  );
};

export default Song;

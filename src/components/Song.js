import React from "react";

function Song({ song, index }) {
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
    <div className="Song">
      <p>Song {index+1}</p>
      <span>{song.title}</span>
      <span>{timeFormat(song.duration)}</span>
    </div>
  );
}

export default Song;

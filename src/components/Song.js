import React, { useState, useEffect } from "react";

const Song = ({ song, index, active, setToggleActive, refs, scrollView }) => {
  const scroll = () => (active ? scrollView(song.id) : undefined);
  useEffect(() => scroll());

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
    <div
      className={active ? "song__active" : "song"}
      onClick={() => setToggleActive((active = index))}
      ref={refs}
    >
      <span>{index + 1}</span>
      <span className="song__title">{song.title}</span>

      <span>{timeFormat(song.duration)}</span>
    </div>
  );
};

export default Song;

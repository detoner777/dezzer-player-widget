import React from "react";
import Song from "./Song";

import { connect } from "react-redux";
import { setToggleActive } from "../actions/SetToggleActive";

const SongsList = (props) => {
  const {
    loading,
    errorMessage,
    songsList,
    toggleActive,
    setToggleActive,
  } = props;

  const refs = songsList.reduce((song, value) => {
    song[value.id] = React.createRef();
    return song;
  }, {});
  console.log(refs);

  const handleClick = (id) =>
    refs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <div className='player-list'>
      <ul>
        {/*  */}

        {songsList.map((song) => (
          <li key={song.id}>
            <button type='button' onClick={() => handleClick(song.id)}>
              Scroll Item {song.id} Into View
            </button>
          </li>
        ))}

        {/*  */}
      </ul>
      <div className='songs__list'>
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>
        ) : (
          songsList.map((song, index) => (
            <Song
              key={`${index}`}
              song={song}
              refs={refs[song.id]}
              index={index}
              active={toggleActive === index}
              setToggleActive={() => {
                setToggleActive(index);
                // console.log(toggleActive);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setToggleActive,
};

const mapStateToProps = (state) => ({
  toggleActive: state.toggleActiveReducer.toggleActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);

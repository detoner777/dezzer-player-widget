import React, { Component } from "react";
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
  return (
    <div className='player-list'>
      <div className='songs__list'>
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>
        ) : (
          songsList.map((song, index) => (
            <Song
              autoFocus={true}
              key={`${index}`}
              song={song}
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

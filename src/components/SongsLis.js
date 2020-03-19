import React, { Component } from "react";
import Song from "./Song";
import Player from "./Player";

class SongsList extends Component {
  constructor() {
    super();
    this.state = {
      toggleAtive: ""
    };
  }

  render() {
    const { loading, errorMessage, songsList } = this.props;
    const { toggleAtive, setToggleAtive } = this.state;
    return (
      <div className="player-list">
        <Player
          active={toggleAtive}
          setToggleAtive={setToggleAtive}
          songsList={songsList}
        />
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
                setToggleAtive={() => {
                  this.setState({
                    toggleAtive: index
                  });
                }}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default SongsList;

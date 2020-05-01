import React from "react";

import { connect } from "react-redux";
import { setToggleActive } from "../actions/SetToggleActive";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

let TRACKS = [];

class Player extends React.Component {
  state = {
    player: "stopped",
    currentTime: null,
    duration: null,
    title: null,
  };

  componentDidMount() {
    this.player.addEventListener("timeupdate", (e) => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration,
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.toggleActive !== prevProps.toggleActive) {
      TRACKS = this.props.songsList.map((x, i) => ({ ...x, id: i }));
      let track;

      if (this.props.toggleActive !== null) {
        track = TRACKS.find((track) => track.id === this.props.toggleActive)
          .preview;
      }

      if (track) {
        //set active track title to the player
        let activeTrack = this.props.songsList[this.props.toggleActive];
        //
        this.player.src = track;
        this.player.play();
        this.setState({
          player: "playing",
          duration: this.player.duration,
          title: activeTrack.title,
        });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.props.setToggleActive(null);
        this.setState({
          player: "stopped",
          currentTime: null,
          duration: null,
        });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
    if (
      this.state.duration &&
      !isNaN(this.state.duration) &&
      this.state.duration === this.state.currentTime
    ) {
      const currentTrackIndex = TRACKS.findIndex(
        (track) => track.id === this.props.toggleActive
      );
      const tracksAmount = TRACKS.length - 1;
      if (currentTrackIndex === tracksAmount) {
        this.props.setToggleActive(null);
        this.setState({
          player: "stopped",
          currentTime: null,
          duration: null,
        });
      } else {
        this.handleSkip("next");
      }
    }
  }

  handleSkip = (direction) => {
    if (direction === "previous") {
      this.props.setToggleActive(
        this.props.toggleActive
          ? this.props.toggleActive - 1
          : this.props.toggleActive
      );
    } else if (direction === "next") {
      this.props.setToggleActive(
        this.props.toggleActive < TRACKS.length - 1
          ? this.props.toggleActive + 1
          : this.props.toggleActive
      );
    }
  };

  setTime = (time) => {
    this.player.currentTime = time;
  };

  render() {
    return (
      <>
        <div className="player">
          <ul className="tracklist">{this.state.title}</ul>
          <TimeBar
            setTime={this.setTime}
            currentTime={this.state.currentTime}
            duration={this.state.duration}
          />
          {this.state.player !== "stopped" && (
            <div className="buttons">
              <button onClick={() => this.handleSkip("previous")}>
                Previous
              </button>
              {this.state.player === "paused" && (
                <button onClick={() => this.setState({ player: "playing" })}>
                  Play
                </button>
              )}
              {this.state.player === "playing" && (
                <button onClick={() => this.setState({ player: "paused" })}>
                  Pause
                </button>
              )}
              <button onClick={() => this.setState({ player: "stopped" })}>
                Stop
              </button>
              <button onClick={() => this.handleSkip("next")}>Skip</button>
            </div>
          )}
        </div>
        <audio ref={(ref) => (this.player = ref)} />
      </>
    );
  }
}

function TimeBar({ currentTime, duration, setTime }) {
  const formattedCurrentTime = getTime(currentTime);
  const formattedDuration = getTime(duration);
  const sBits = [];
  let count = 0;
  while (count < duration) {
    sBits.push(count);
    count++;
  }
  const seconds = sBits.map((second) => {
    return (
      <div
        key={second}
        onClick={() => setTime(second)}
        style={{
          float: "left",
          cursor: "pointer",
          height: "30px",
          width: `${300 / Math.round(duration)}px`,
          background:
            currentTime && Math.round(currentTime) === second
              ? "white"
              : "black",
          transition: "all 0.5s ease-in-out",
        }}
      />
    );
  });
  return (
    <div className="timebar">
      <div className="bar">{seconds}</div>
      {currentTime ? (
        <div className="time">
          {formattedCurrentTime} / {formattedDuration}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const mapDispatchToProps = {
  setToggleActive,
};

const mapStateToProps = (state) => ({
  toggleActive: state.toggleActiveReducer.toggleActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

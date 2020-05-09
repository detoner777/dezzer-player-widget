import React from "react";
import PlayerCard from "./PlayerCard/PlayerCard";

import IconButton from "@material-ui/core/IconButton";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/PauseOutlined";
import StopIcon from "@material-ui/icons/StopOutlined";
import PrevIcon from "@material-ui/icons/SkipPreviousOutlined";
import NextIcon from "@material-ui/icons/SkipNextOutlined";

import { withStyles } from "@material-ui/core/styles";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { setToggleActive } from "../actions/SetToggleActive";

const useStyles = (theme) => ({
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      color: "white",
    },
  },
});

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
    activeTrack: "",
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
          activeTrack: activeTrack,
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
    const { classes } = this.props;

    return (
      <>
        <div className="player">
          <PlayerCard
            className="tracklist"
            activeTrack={this.state.activeTrack}
          />

          <TimeBar
            setTime={this.setTime}
            currentTime={this.state.currentTime}
            duration={this.state.duration}
          />
          {
            // ----Prev -----
            this.state.player !== "stopped" && (
              <div className="buttons">
                <IconButton
                  onClick={() => this.handleSkip("previous")}
                  aria-label="play"
                  size="small"
                  className={classes.button}
                >
                  <PrevIcon fontSize="large" />
                </IconButton>
                {
                  // ----Play start -----
                  this.state.player === "paused" && (
                    <IconButton
                      onClick={() => this.setState({ player: "playing" })}
                      aria-label="play"
                      size="small"
                      className={classes.button}
                    >
                      <PlayIcon fontSize="large" />
                    </IconButton>
                  )
                  // ----Play end -----
                }
                {
                  // ----Paused start -----
                  this.state.player === "playing" && (
                    <IconButton
                      onClick={() => this.setState({ player: "paused" })}
                      aria-label="play"
                      size="small"
                      className={classes.button}
                    >
                      <PauseIcon fontSize="large" />
                    </IconButton>
                  )
                  // ----Paused end -----
                  // ----STOP start -----
                }
                <IconButton
                  onClick={() => this.setState({ player: "stopped" })}
                  aria-label="play"
                  size="small"
                  className={classes.button}
                >
                  <StopIcon fontSize="large" />
                </IconButton>

                <IconButton
                  onClick={() => this.handleSkip("next")}
                  aria-label="play"
                  size="small"
                  className={classes.button}
                >
                  <NextIcon fontSize="large" />
                </IconButton>
              </div>
            )
          }
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
          height: "5px",
          width: `${300 / Math.round(duration)}px`,
          background:
            currentTime && Math.round(currentTime) === second
              ? "white"
              : "rgb(8, 97, 112)",
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

export default withStyles(useStyles)(
  connect(mapStateToProps, mapDispatchToProps)(Player)
);

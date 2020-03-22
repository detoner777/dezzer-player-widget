import React from "react";

const campfireStory =
  "https://cdns-preview-e.dzcdn.net/stream/c-e7e6e2142422aa4599294dee57197be9-7.mp3";
const bootingUp =
  "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-10.mp3";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}
let TRACKS = [];
// const TRACKS = [
//   { id: 1, title: "Campfire Story" },
//   { id: 2, title: "Booting Up" }
// ];

class Player extends React.Component {
  state = {
    selectedTrack: this.props.activeIndex,
    player: "stopped",
    currentTime: null,
    duration: null
  };

  componentDidMount() {
    // TRACKS = this.props.songsList.map((x, i) => ({ ...x, id: i }));
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      TRACKS = this.props.songsList.map((x, i) => ({ ...x, id: i }));
      let track;

      if (this.state.selectedTrack !== null) {
        track = TRACKS.find(track => track.id === this.state.selectedTrack)
          .preview;
      }

      // let track;
      // switch (this.state.selectedTrack) {
      //   case 0:
      //     track = campfireStory;
      //     break;
      //   case 1:
      //     track = bootingUp;
      //     break;
      //   default:
      //     break;
      // }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.setState({
          selectedTrack: null,
          player: "stopped",
          currentTime: null,
          duration: null
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
      // TRACKS = this.props.songsList.map((x, i) => ({ ...x, id: i }));
      const currentTrackIndex = TRACKS.findIndex(
        track => track.id === this.state.selectedTrack
      );
      const tracksAmount = TRACKS.length - 1;
      if (currentTrackIndex === tracksAmount) {
        this.setState({
          selectedTrack: null,
          player: "stopped",
          currentTime: null,
          duration: null
        });
      } else {
        this.handleSkip("next");
      }
    }
  }

  handleSkip = direction => {
    // const currentTrackIndex = TRACKS.findIndex(
    //   track => track.id === this.state.selectedTrack
    // );
    // const tracksAmount = TRACKS.length - 1;
    if (direction === "previous") {
      // const previousTrack =
      //   currentTrackIndex === 0 ? tracksAmount : currentTrackIndex - 1;
      // const trackToPlay = this.state.selectedTrack - 1;

      // !this.state.selectedTrack
      //   ? this.setState({ selectedTrack: this.state.selectedTrack - 1 })
      //   : this.setState({ selectedTrack: this.state.selectedTrack });
      this.setState({
        selectedTrack: this.state.selectedTrack
          ? this.state.selectedTrack - 1
          : this.state.selectedTrack
      });
    } else if (direction === "next") {
      // const nextTrack =
      //   currentTrackIndex === tracksAmount ? 0 : currentTrackIndex + 1;
      // const trackToPlay = TRACKS[nextTrack];
      this.setState({
        selectedTrack:
          this.state.selectedTrack < TRACKS.length - 1
            ? this.state.selectedTrack + 1
            : this.state.selectedTrack
      });
    }
  };

  setTime = time => {
    this.player.currentTime = time;
  };

  render() {
    let TRACKS = this.props.songsList;
    console.log(this.state);
    const list = TRACKS.map((item, index) => {
      return (
        <li
          key={index}
          onClick={() => this.setState({ selectedTrack: index })}
          style={{
            fontWeight: index === this.state.selectedTrack && "bold"
          }}
        >
          {item.title}
        </li>
      );
    });

    // const currentTime = getTime(this.state.currentTime);
    // const duration = getTime(this.state.duration);

    return (
      <>
        <div className="player">
          <ul className="tracklist">{list}</ul>
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
        <audio ref={ref => (this.player = ref)} />
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
  const seconds = sBits.map(second => {
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
          transition: "all 0.5s ease-in-out"
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

export default Player;

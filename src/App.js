import React from "react";
import Search from "./components/Search";
import SongsList from "./components/SongsLis";
import { connect } from "react-redux";
import fetchSongs from "./actions/fetchSongs";
import Player from "./components/Player";

const App = ({ fetchSongs, loading, errorMessage, songsList }) => {
  const search = (searchValue) => {
    fetchSongs(searchValue);
  };

  return (
    <div className="container">
      <Search search={search} />
      <div className="main-wrapper">
        <Player songsList={songsList} />
        <SongsList
          loading={loading}
          errorMessage={errorMessage}
          songsList={songsList}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  fetchSongs,
};

const mapStateToProps = (state) => ({
  loading: state.songsReducer.loading,
  errorMessage: state.songsReducer.error,
  songsList: state.songsReducer.songsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

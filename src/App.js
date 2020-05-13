import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Search from "./components/Search";
import SongsList from "./components/SongsLis";
import { connect } from "react-redux";
import fetchSongs from "./actions/fetchSongs";
import Player from "./components/Player";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 800,
    margin: "0 auto",
    marginTop: "10%",
    background: "#232529",
  },
  cardcontent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const App = ({ fetchSongs, loading, errorMessage, songsList }) => {
  const search = (searchValue) => {
    fetchSongs(searchValue);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth='md' style={{ backgroundColor: "#16171a" }}>
        <Card className={classes.root}>
          <CardContent className={classes.cardcontent}>
            <div className='search-player-wrapper'>
              <Search search={search} />
              <Player songsList={songsList} />
            </div>
            <SongsList
              loading={loading}
              errorMessage={errorMessage}
              songsList={songsList}
            />
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};

{
  /* <div className="container">
      <Search search={search} />
      <div className="main-wrapper">
        <Player songsList={songsList} />
        <SongsList
          loading={loading}
          errorMessage={errorMessage}
          songsList={songsList}
        />
      </div>
    </div> */
}

const mapDispatchToProps = {
  fetchSongs,
};

const mapStateToProps = (state) => ({
  loading: state.songsReducer.loading,
  errorMessage: state.songsReducer.error,
  songsList: state.songsReducer.songsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

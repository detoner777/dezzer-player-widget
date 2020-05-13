import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    maxHeight: 100,
    background: "none",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    color: "grey",
  },
  content: {
    flex: "1 0 auto",
    maxWidth: "300px",
    color: "white",
  },
  cover: {
    width: 100,
    height: 100,
  },
}));

const MediaControlCard = ({ activeTrack }) => {
  const classes = useStyles();

  console.log(activeTrack);

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h7' variant='h7'>
            {!activeTrack ? "" : activeTrack.title}
          </Typography>
          <Typography variant='subtitle1' style={{ color: "grey" }}>
            {!activeTrack ? "" : activeTrack.artist.name}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={!activeTrack ? "" : activeTrack.album.cover_medium}
        title='Live from space album cover'
      />
    </Card>
  );
};

export default MediaControlCard;

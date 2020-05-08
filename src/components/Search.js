import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import { connect } from "react-redux";
import { fetchSongsError } from "../actions/fetchLoadingErr";

//input styling
const useStyles = makeStyles((theme) => ({
  input: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    width: "100px",
    height: "56px",
  },
}));

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
    props.fetchSongsError(null);
  };

  return (
    <div className="search">
      <form className={classes.input} noValidate autoComplete="off">
        <TextField
          id="outlined-secondary"
          label="Tab an artist"
          variant="outlined"
          color="secondary"
          value={searchValue}
          onChange={handleSearchInputChanges}
        />
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          endIcon={<SearchIcon />}
          type="submit"
          value="SEARCH"
          onClick={callSearchFunction}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  fetchSongsError,
};

export default connect(null, mapDispatchToProps)(Search);

// https://codesandbox.io/s/react-autosuggest-example-with-hooks-mreii

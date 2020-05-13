import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import { connect } from "react-redux";
import { fetchSongsError } from "../actions/fetchLoadingErr";

//input styling
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "grey",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f50057",
      },
    },
  },
  input: {
    color: "white",
  },
  button: {
    width: "20px",
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
    <div className='search'>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='outlined-search'
          label='Search artist'
          type='search'
          variant='outlined'
          onChange={handleSearchInputChanges}
          InputProps={{
            className: classes.input,
          }}
        />

        <Button
          className={classes.button}
          variant='outlined'
          color='secondary'
          type='submit'
          value='SEARCH'
          onClick={callSearchFunction}
        >
          <SearchIcon style={{ fontSize: 30 }} />
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

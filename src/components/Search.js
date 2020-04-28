import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchSongsError } from "../actions/fetchLoadingErr";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

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
      <div>VISAGE</div>

      <Form className="search__form">
        {" "}
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchInputChanges}
        />
        <Button type="submit" value="SEARCH" onClick={callSearchFunction}>
          Start
        </Button>
      </Form>
    </div>
  );
};

const mapDispatchToProps = {
  fetchSongsError,
};

export default connect(null, mapDispatchToProps)(Search);

// https://codesandbox.io/s/react-autosuggest-example-with-hooks-mreii

import React, { Component } from "react";
import "./SearchBox.css";
import { Link } from "react-router-dom";
import { InputBase } from "@material-ui/core";
import axios from "axios";

class SearchBox extends Component {
  state = {
    cities: [],
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  };

  componentDidMount() {
    axios
      .get("/api/cities")
      .then(({ data }) => {
        this.setState({
          cities: data,
        });
      })
      .catch((error) => {});
  }

  onChange = (e) => {
    const { cities } = this.state;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = cities.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  clearInput = (e) => {
    this.setState({
      userInput: "",
    });
  };

  render() {
    const {
      clearInput,
      onChange,
      state: { filteredSuggestions, showSuggestions, userInput },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, i) => {
              return (
                <li onClick={clearInput} key={i}>
                  <Link
                    style={{ display: "block" }}
                    to={{
                      pathname: `/city/${suggestion.name}`,
                      id: suggestion.id,
                    }}
                  >
                    {suggestion.name}, {suggestion.country_id}
                  </Link>
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = <></>;
      }
    }

    return (
      <>
        <InputBase
          type="text"
          onChange={onChange}
          placeholder="Find my city?"
          style={{ width: `85%` }}
          value={userInput}
        />
        {suggestionsListComponent}
      </>
    );
  }
}

export default SearchBox;

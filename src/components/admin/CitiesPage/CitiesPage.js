import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from 'query-string';

import AdminLayout from "../../layouts/AdminLayout/AdminLayout";

// Material-UI
import Button from "@material-ui/core/Button";
import { TextField, Grid, makeStyles, Paper } from "@material-ui/core";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    flexGrow: 2
  },
  addButton: {
    marginTop: 30,
    color: "white",
    height: "56px",
    background: "#1b3757"
  },
  searchButton: {
    height: 56,
    color: "white",
    background: "#1b3757"
  },
  detailsButton: {
    height: `38px`,
    color: "white",
    background: "#1b3757"
  },
  table: {
  },
  paper: {
    width: "100%",
    marginTop: 40,
    overflowX: "auto"
  }
});

function CitiesPage(props) {

  const searchedValues = queryString.parse(props.location.search);

  useEffect(() => {props.dispatch({type: "SEARCH_CITY", payload: searchedValues.citySearched || ''})}, []);
  useEffect(() => {props.dispatch({type: "CLEAR_INDIVIDUAL_ORGANIZATION"})}, []);
  useEffect(() => {props.dispatch({type: "CLEAR_INDIVIDUAL_CITY"})}, []); 
  useEffect(() => {props.dispatch({type: "CLEAR_MEDICATIONS"})}, []);

  // use classes names for styling
  const classes = useStyles();

  // Local state to store inputs for city and country to search.
  const [searchValues, setSearchValues] = useState({
    city: searchedValues.citySearched || '',
    country:''
  });

  // Takes in a property name and the event to update local state.
  const handleChange = property => event => {
    setSearchValues({ ...searchValues, [property]: event.target.value });
    switch (property) {
      case "city":
        props.dispatch({
          type: "SEARCH_CITY",
          payload: event.target.value
        });
        setSearchValues({ city: event.target.value, country: '' });
        break;
      case "country":
        props.dispatch({
          type: "SEARCH_CITY_BY_COUNTRY",
          payload: event.target.value,
        });
        setSearchValues({ city: '', country: event.target.value });
        break;
      default:
        return;
    }
  };

  return (
    <AdminLayout>
      <Grid container>
        <Grid container
          item spacing={1}
          direction="row"
          alignItems="center"
        >
          <Grid item>
            <Link to="/cities/new">
              <Button
                fullWidth
                className={classes.addButton}
                variant="contained"
              >
                Add New City
            </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          item spacing={1}
          direction="row"
          alignItems="center"
        >
          <Grid item>
            <TextField
              id="city-search-input"
              label="Search City"
              value={searchValues.city}
              onChange={handleChange("city")}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={1} direction="row" alignItems="center">
        <Grid item>
          <TextField
            id="country-search-input"
            label="Search Country"
            value={searchValues.country}
            onChange={handleChange("country")}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container item spacing={1} direction="row" alignItems="center">
        <Grid container item>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>City</TableCell>
                  <TableCell align="right">Country</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {props.searchCityReducer &&
                  props.searchCityReducer.map(city => {
                    return (
                      <TableRow key={city.city_id}>
                        <TableCell>{city.city_name}</TableCell>
                        <TableCell align="right">{city.country_name}</TableCell>
                        <TableCell>
                          <Link to={`/cities/${city.city_name}`}>
                            <Button
                              variant="contained"
                              fullWidth
                              className={classes.detailsButton}
                              value={city.city_id}
                            >
                              Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
//
const mapReduxStateToProps = reduxState => ({
  searchCityReducer: reduxState.searchReducer.searchCityReducer,
  reduxState: reduxState
});

export default connect(mapReduxStateToProps)(CitiesPage);

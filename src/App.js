import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import RecipeReviewCard from "./components/card";

const OMDB_API_KEY = process.env.OMDB_KEY ? process.env.OMDB_KEY : "a3136a8c";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
    // width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  const [filter, setFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };
  const changeSearch = (event) => {
    setSearch(event.target.value);
  };
  const toggleFavourite = (imdbID) => {
    if (!favourites.includes(imdbID)) setFavourites([...favourites, imdbID]);
  };
  const searchMovies = (event) => {
    event.preventDefault();
    const payload = { apikey: OMDB_API_KEY };
    if (search) Object.assign(payload, { s: search });
    if (filter && filter !== "All") Object.assign(payload, { type: filter });
    axios
      .get("http://www.omdbapi.com/", {
        params: payload
      })
      .then((response) => {
        if (response?.data?.Search) {
          setMovies(response.data.Search);
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((error) => {
        console.log("Something went wrong. Error", error);
        alert("Something went wrong.");
      });
  };

  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Movie"
          inputProps={{ "aria-label": "search movies" }}
          onChange={(e) => {
            changeSearch(e);
          }}
          calue={search}
        />

        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={changeFilter}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="movie">Movies</MenuItem>
            <MenuItem value="series">Series</MenuItem>
            <MenuItem value="episode">Episodes</MenuItem>
          </Select>
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={(e) => searchMovies(e)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {favourites}
      <Grid className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {movies.map((movie) => (
              <Grid key={movie.imdbID} item>
                <RecipeReviewCard
                  title={movie.Title}
                  year={movie.Year}
                  poster={movie.Poster}
                  type={movie.Type}
                  imdbID={movie.imdbID}
                  addToFavourite={toggleFavourite}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

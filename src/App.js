import React from "react";
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

  const [age, setAge] = React.useState("All");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Movie"
          inputProps={{ "aria-label": "search google maps" }}
        />

        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Movies">Movies</MenuItem>
            <MenuItem value="Series">Series</MenuItem>
            <MenuItem value="Episodes">Episodes</MenuItem>
          </Select>
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing="2">
            <Grid key="1" item>
              <RecipeReviewCard />
            </Grid>
            <Grid key="2" item>
              <RecipeReviewCard />
            </Grid>
            <Grid key="3" item>
              <RecipeReviewCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

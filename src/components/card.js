import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={
          props.poster && props.poster !== "N/A"
            ? props.poster
            : "https://dummyimage.com/300x425/000000/fff"
        }
        title={props.title ? props.title.slice(0, 25) : "Dummy title"}
      />
      <CardHeader
        avatar={
          <Avatar
            aria-label="Add to favorites"
            className={classes.avatar}
            onClick={() => {
              props.addToFavourite(props.imdbID, {
                imdbID: props.imdbID,
                Title: props.title,
                Year: props.year,
                Poster: props.poster,
                Type: props.type
              });
            }}
          >
            <FavoriteIcon />
          </Avatar>
        }
        title={
          props.title
            ? props.title.length > 14
              ? props.title.slice(0, 12) + "..."
              : props.title
            : "Dummy title"
        }
        subheader={"Released in " + props.year}
      />
    </Card>
  );
}

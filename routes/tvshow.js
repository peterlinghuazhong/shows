const express = require("express");
//create a express router
const router = express.Router();

// import the Movie model
const Tvshows = require("../models/tvshow");
const Tvshow = require("../models/tvshow");
const {
  getTvshows,
  updateTvshow,
  deleteTvshow,
  addTvshow,
} = require("../controllers/tvshow");

/*
  Routes for shows
  GET /shows - list all the shows
  GET /shows/68943cf564aa9f8354cef260 - get a specific show
  POST /shows - add new show
  PUT /shows/68943cf564aa9f8354cef260 - update show
  DELETE /shows/68943cf564aa9f8354cef260 - delete show
*/
// GET /shows - list all the shows
router.get("/", async (req, res) => {
  const premiere_year = req.query.premiere_year;
  const genre = req.query.genre;
  const rating = req.query.rating;
  const Tvshow = await getTvshows(genre, rating, premiere_year);
  res.status(200).send(Tvshow);
});

// GET /tvshows/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the show data based on id
  const tvshow = await getTvshow(id);
  res.status(200).send(tvshow);
});

/* 
  POST /movies - add new movie
  This POST route need to accept the following parameters:
  - title
  - director
  - release_year
  - genre
  - rating
*/
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (
      !title ||
      !creator ||
      !premiere_year ||
      !end_year ||
      !seasons ||
      !genre ||
      !rating
    ) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      // short hand
      .send(
        await addTvshow(
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  PUT /movies/68943cf564aa9f8354cef260 - update movie
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (
      !title ||
      !creator ||
      !premiere_year ||
      !seasons ||
      !end_year ||
      !genre ||
      !rating
    ) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      .send(
        await updateTvshow(
          id,
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  DELETE /movies/68943cf564aa9f8354cef260 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTvshow(id);
    res.status(200).send({
      message: `Tvshows with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});
module.exports = router;

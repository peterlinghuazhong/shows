const express = require("express");
//create a express router
const router = express.Router();

// import the Movie model
const Tvshows = require("../models/tvshow");

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

  // create a empty container for filter
  let filter = {};
  // if premiere_year exists, then only add it into the filter container
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }
  // if genre exists, then only add it into the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the shows data from Mongodb
  const tvshow = await Tvshows.find(filter);
  res.send(tvshow);
});

// GET /tvshows/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the show data based on id
  const tvshow = await Tvshows.findById(id);
  res.send(tvshow);
});
module.exports = router;

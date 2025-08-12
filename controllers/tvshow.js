const Tvshows = require("../models/tvshow");
async function getTvshows(genre, rating, premiere_year) {
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
  // return the movies
  return tvshow;
}

async function getTvshow(id) {
  // load the movie data based on id
  const tvshow = await Tvshows.findById(id);
  res.send(tvshow);
}

async function addTvshow(
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  const newTvshow = new Tvshows({
    title: title,
    creator: creator,
    premiere_year: premiere_year,
    end_year: end_year,
    seasons: seasons,
    genre: genre,
    rating: rating,
  });
  // save the new movie into mongodb
  await newTvshow.save(); // clicking the "save" button
  return newTvshow;
}

async function updateTvshow(
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  return await Tvshows.findByIdAndUpdate(
    id,
    {
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      end_year: end_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteTvshow(id) {
  return await Tvshows.findByIdAndDelete(id);
}
module.exports = {
  getTvshows,
  getTvshow,
  addTvshow,
  updateTvshow,
  deleteTvshow,
};

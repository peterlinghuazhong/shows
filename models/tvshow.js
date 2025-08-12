const { Schema, model } = require("mongoose");
// tvshow schema
const tvShowSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  premiere_year: {
    type: Number,
    required: true,
  },
  end_year: Number,
  seasons: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// tvshow modal
const Tvshow = model("Tvshow", tvShowSchema);

// export the Modal
module.exports = Tvshow;

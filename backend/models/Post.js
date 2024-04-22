const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: "User" },
  locationName: {
    type: String,
    require: true,
  },

  lat: Number,
  long: Number,
  rent: {
    type: Number,
    require: true,
  },
  size: {
    type: Number,
    require: true,
  },
  descrp: String,
  img: [String],
  numOfView: {
    type: Number,
    default: 0,
  },
  ageSum: {
    type: Number,
    default: 0,
  },
  maleViews: {
    type: Number,
    default: 0,
  },
  femaleViews: {
    type: Number,
    default: 0,
  },
  viewerLocations: [
    {
      lat: Number,
      lon: Number,
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);

const Post = require("../models/Post");

const handleSearch = async (req, res) => {
  const searchKey = req.params["searchkey"];
  var searchKeyArray = searchKey
    .split("+")
    .filter((x) => x !== "" && x.toLowerCase() !== "dhaka" && x.toLowerCase() !== "bangladesh");

  console.log(searchKeyArray);

  var regexString = "^";
  for (let index = 0; index < searchKeyArray.length; index++) {
    regexString += `(?=.*${searchKeyArray[index]})`;
  }
  //regex += searchKeyArray.map((key) => `(?=.*${key})`);
  regexString += ".+";
  const regexObject = new RegExp(regexString);

  console.log(regexObject);

  const result = await Post.find({
    locationName: { $regex: regexObject, $options: "i" },
  }).exec();

  return res.status(200).json(result);
};

module.exports = { handleSearch };

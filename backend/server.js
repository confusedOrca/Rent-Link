const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");

const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsConfig");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const Post = require("./models/Post");

const app = express();
const PORT = 3500;
require("dotenv").config();

connectDB();
app.use(cors(corsOptions));
app.use(credentials);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("files"));

app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/search", require("./routes/api/search"));
app.use("/getpost", require("./routes/api/getpost"));
app.use(express.static("files"));

app.use(verifyJWT);
app.use("/logout", require("./routes/api/logout"));
app.use("/post", require("./routes/api/post"));
app.use("/getuserposts", require("./routes/api/userpost"));

//chat
app.use("/getchats", require("./routes/api/getAllChats"));
app.use("/getchat", require("./routes/api/getChat"));
app.use("/addMessage", require("./routes/api/message"));
app.use("/view", require("./routes/api/view"));

app.all("*", (req, res) => {
  res.status(404).json({ error: "404 not found" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
});

const homerentScrape = () => {
  request("https://rents.com.bd/property-type/residential/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $(".d-flex").each((i, el) => {
        const address = $(el).find(".item-address").text();
        const image = $(el).find("a").find("img").attr("src");
        const size = $(el).find(".hz-figure").text();
        const price = $(el).find(".item-price-wrap").find("li").text();

        const priceNumber = parseInt(price.replaceAll(",", "").split(" ")[2]);

        const sizeNumber = parseInt(size.slice(4));
        if (price && size && address) {
          Post.create({
            locationName: address,
            rent: priceNumber,
            size: sizeNumber,
            img: [image],
          });
        }
      });
    }
  });
};

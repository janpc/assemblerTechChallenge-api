require("dotenv").config();

const axios = require("axios");
const mongoose = require("mongoose");
const db = require("../models");
const { connect } = require("../db/connect");

const { MONGO_DB_URL } = process.env;

mongoose.connect(MONGO_DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

async function seedDB() {
  try {
    await connect();
    console.log("Connected correctly to server");

    // The drop() command destroys all data from a collection.
    await db.Meme.collection.drop();

    const memesResponse = await axios.get(
      "http://alpha-meme-maker.herokuapp.com/"
    );

    for (const meme of memesResponse.data.data) {
      const upMeme = new db.Meme();
      upMeme.url = meme.image;
      upMeme.userEmail = "meme@seed.com";
      upMeme.tags = meme.tags.split(" ");
      upMeme.type = "meme";
      await upMeme.save();
    }

    const gifsResponse = await axios.get("https://g.tenor.com/v1/trending");

    for (const gif of gifsResponse.data.results) {
      const upMeme = new db.Meme();

      upMeme.url = gif.media[0].gif.url;
      upMeme.userEmail = "gif@seed.com";
      upMeme.tags = randomTags(5, 5);
      upMeme.type = "gif";
      await upMeme.save();
    }

    mongoose.connection.close();
  } catch (err) {
    console.log(err.stack);
  }
}

function randomTags(number, length) {
  let result = [];
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < number; i++) {
    let word = "";
    for (let j = 0; j < length; j++) {
      word += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result.push(word);
  }

  return result;
}

seedDB();

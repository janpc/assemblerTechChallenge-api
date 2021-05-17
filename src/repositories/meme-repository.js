const db = require("../models");
const normalizeResponse = require("../utils/normalizeResponse");

class MemeRepository {
  create(options) {
    return normalizeResponse(db.Meme.create(options));
  }

  getOne(query) {
    return normalizeResponse(db.Meme.findOne(query, "-__v"));
  }

  getAll(query) {
    return normalizeResponse(db.Meme.find(query, "-__v"));
  }
}

module.exports = new MemeRepository();

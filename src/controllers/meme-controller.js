const { MemeRepo } = require("../repositories");
const { uploadImageToCloudinary } = require("../utils/cloudinary");

async function create(req, res, next) {
  /* const { uid, email } = req.user; */
  const { url, tags = [], email, type = "meme" } = req.body;

  try {
    const response = await MemeRepo.create({
      url,
      userEmail: email,
      tags,
      type,
    });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    res.status(201).send({
      data: response.data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  const { id } = req.params;

  try {
    const response = await MemeRepo.getOne({
      _id: id,
    });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    res.status(201).send({
      data: response.data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const response = await MemeRepo.getAll({});
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    res.status(201).send({
      data: response.data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
};

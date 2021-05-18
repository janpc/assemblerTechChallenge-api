const { Router } = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const { authMiddleware } = require("../middlewares");
const { memeController } = require("../controllers");

const memeRouter = Router();

/* memeRouter.get("/user/:userName", authMiddleware, memeController.getByUsername); */
memeRouter.post("/meme", /* authMiddleware, */ memeController.create);
memeRouter.get("/meme/:id", memeController.getById);
memeRouter.get("/:type", memeController.getAll);

module.exports = { memeRouter };

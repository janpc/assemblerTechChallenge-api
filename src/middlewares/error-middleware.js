function errorMiddleware(err, req, res, next) {
  console.log(err);
  if (req.headersSent) {
    return next(err);
  }

  res.status(500).send({
    data: null,
    error: "Something went wrong",
  });
}

module.exports = {
  errorMiddleware,
};

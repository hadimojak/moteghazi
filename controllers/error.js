exports.get404 = (req, res, next) => {
  res.status(200).json({
    message: "not found",
  });
};

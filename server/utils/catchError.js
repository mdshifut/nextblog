module.exports = function catchError(res, error) {
  console.log(error);

  res.status(200).json({
    error: {
      message: 'Server Error'
    }
  });
};

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case 400:
      res
        .status(400)
        .json({
          message: err.message,
          stackTrace: err.stack,
          title: "Bad Request",
        });
      break;

    case 401:
      res
        .status(401)
        .json({
          message: err.message,
          stackTrace: err.stack,
          title: "Unauthorized",
        });
      break;

    case 403:
      res
        .status(403)
        .json({
          message: err.message,
          stackTrace: err.stack,
          title: "Forbidden",
        });
      break;
    case 404:
      res
        .status(404)
        .json({
          message: err.message,
          stackTrace: err.stack,
          title: "Not Found",
        });
      break;
    default:
      res
        .status(500)
        .json({
          message: err.message || "Internal Server Error",
          stackTrace: err.stack,
          title: "Internal Server Error",
        });
      break;
  }
};

module.exports = errorHandler;

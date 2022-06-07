const error = (err, req, res, next) => {
  let error = "";
  let code = "";
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      error = "Email must be unique";
      code = 400;
      break;
    case "SequelizeValidationError":
      error = err.errors;
      error = error.map((e) => {
        return e.message;
      });
      error = error[0];
      code = 400;
      break;
    case "Email is required":
    case "Password is required":
    case "This item already in the list":
      error = err.name;
      code = 400;
      break;
    case "Invalid email/password":
      error = err.name;
      code = 401;
      break;
    case "Item not Found":
    case "Not Found":
      error = err.name;
      code = 404;
      break;
    case "You are not authorized":
      error = err.name;
      code = 403;
      break;
    case "Invalid token":
    case "JsonWebTokenError":
    case "TokenExpiredError":
      error = "Invalid token";
      code = 401;
      break;
    default:
      error = "Internal server error";
      code = 500;
  }
  res.status(code).json(error);
};

module.exports = error;

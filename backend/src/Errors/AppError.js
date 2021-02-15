function AppError(status, message) {
  this.name = "App Error";
  this.message = message || "Internal Server Error";
  this.status = status || 500;
  this.stack = new Error().stack;
};
AppError.prototype = new Error;
module.exports = AppError
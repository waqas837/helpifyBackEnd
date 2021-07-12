//all errors are caught by this central middleware
//this is global error catcher middleware and express
//know this to catch every error in our app
// module.exports = (err, req, res, next) => {
//   err.status = err.status;
//   err.statusCode = err.statusCode || 500;
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     stack:err.stack
//   });
// };

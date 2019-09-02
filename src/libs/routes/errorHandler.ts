export const errorHandlerMiddleware = ( error, req, res, next ) => {
  res.send({
      error: error.error || 'error',
      message: error.message ||'not found',
      status: error.status ,
     timestamp: new Date(),
  });
};

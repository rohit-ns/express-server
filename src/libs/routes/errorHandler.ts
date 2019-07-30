export const errorHandlerMiddleware = (err , req , res, next ) => {
   console.log('INSIDE 2nd MIDDLEWARE', err);
   res.send( {
       error: 'Not Found',
       message: 'err',
       status: 500,
       timestamp: new Date(),
  });
};

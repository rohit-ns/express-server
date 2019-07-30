export const errorHandlerMiddleware = (req , res , next ) => {
  console.log('INSIDE Ist MIDDLEWARE');
  next('not found');
};

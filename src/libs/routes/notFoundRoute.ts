export const notFoundRouteMiddleware = (req , res , next ) => {
  console.log('INSIDE Ist MIDDLEWARE');
  next('not found');
};

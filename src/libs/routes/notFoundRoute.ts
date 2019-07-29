export const middleware1 = (req , res , next ) => {
  console.log('INSIDE Ist MIDDLEWARE');
  next('not found');
};

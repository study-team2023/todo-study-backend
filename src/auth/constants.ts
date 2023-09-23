export const jwtConstants = {
  secret: `${process.env.JWT_SECRET}`,
};

export const googleCallbackUrl =
  process.env.NODE_ENV == 'production'
    ? 'http://localhost:3000'
    : 'http://localhost:4000';

export const mainUrl =
  process.env.NODE_ENV == 'production'
    ? 'http://localhost:3000'
    : 'http://localhost:3000';

export const jwtConstants = {
  secret: `${process.env.JWT_SECRET}`,
};

export const googleCallbackUrl =
  process.env.NODE_ENV == 'production'
    ? 'https://port-0-todo-study-backend-iciy2almpz5uyx.sel5.cloudtype.app'
    : 'http://localhost:3000';

export const mainUrl =
  process.env.NODE_ENV == 'production' ? '' : 'http://localhost:3001';

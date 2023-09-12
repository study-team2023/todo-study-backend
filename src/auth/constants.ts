export const jwtConstants = {
  secret: `${process.env.JWT_SECRET}`,
};

export const sessionConstants = {
  secret: `${process.env.JWT_SECRET}`,
};

export const googleCallbackUrl =
  process.env.NODE_ENV == 'production'
    ? 'https://port-0-meta-be-30yyr422almfhq6h4.sel5.cloudtype.app'
    : 'http://localhost:3000';

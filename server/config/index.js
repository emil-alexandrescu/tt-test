export default {
  port: process.env.PORT || 3000,
  db: {
    host: 'localhost',
    name: 'toptal-test',
    password: 'test',
    username: 'test'
  },
  jwt: {
    secret: 'TOPTAL-EXPENSE-TEST'
  }
};

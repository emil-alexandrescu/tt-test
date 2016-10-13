export default {
  port: process.env.PORT || 3000,
  db: {
    host: 'localhost',
    name: 'toptal-test',
    password: 'root',
    username: 'root'
  },
  jwt: {
    secret: 'TOPTAL-EXPENSE-TEST'
  }
};

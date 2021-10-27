const { PORT } = require('./config');
const { sequelize } = require('./models');
const app = require('./app');

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected on PORT: ${PORT}`);
  } catch (e) {
    console.error(e);
  }
});

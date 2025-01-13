require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Імпорт маршрутів
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const notificationsRouter = require('./routes/notifications');
const deviceStatusRouter = require('./routes/devicestatus');
const lampSettingsRouter = require('./routes/lampsettings');
const reportRouter = require('./routes/lampsettings');

// Реєстрація маршрутів
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/notifications', notificationsRouter);
app.use('/devicestatus', deviceStatusRouter);
app.use('/lampsettings', lampSettingsRouter);
app.use('/reports', reportRouter);

// Запуск сервера
app.listen(PORT, async () => {
  console.log(`Сервер працює на порту ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Підключено до бази даних');
  } catch (error) {
    console.error('Не вдалося підключитися до бази даних:', error);
  }
});

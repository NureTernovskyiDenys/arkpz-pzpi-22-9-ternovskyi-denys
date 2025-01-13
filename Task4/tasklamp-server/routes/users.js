const express = require('express');
const bcrypt = require('bcrypt'); // Імпорт bcrypt
const router = express.Router();
const { User } = require('../models');

// Отримати всіх користувачів
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати користувача за ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити нового користувача
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10); // 10 - кількість раундів солі

    const newUser = await User.create({
      username,
      email,
      passwordHash: hashedPassword, // Зберігаємо хеш замість пароля
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Оновити інформацію користувача
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { username, email, password } = req.body;

    // Якщо переданий новий пароль, хешуємо його
    if (password) {
      user.passwordHash = await bcrypt.hash(password, 10);
    }

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Видалити користувача
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Пошук користувачів за іменем
router.get('/search/:username', async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        username: req.params.username,
      },
    });
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Notification } = require('../models');

// Отримати всі сповіщення
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити нове сповіщення
router.post('/', async (req, res) => {
  try {
    const { userId, title, message, isRead } = req.body;
    const newNotification = await Notification.create({ userId, title, message, isRead });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

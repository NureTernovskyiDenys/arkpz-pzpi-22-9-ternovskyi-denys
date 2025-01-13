const express = require('express');
const router = express.Router();
const { DeviceStatus } = require('../models');

// Отримати статус усіх пристроїв
router.get('/', async (req, res) => {
  try {
    const statuses = await DeviceStatus.findAll();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

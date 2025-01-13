const express = require('express');
const router = express.Router();
const { LampSetting } = require('../models');

// Отримати всі налаштування
router.get('/', async (req, res) => {
  try {
    const settings = await LampSetting.findAll();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

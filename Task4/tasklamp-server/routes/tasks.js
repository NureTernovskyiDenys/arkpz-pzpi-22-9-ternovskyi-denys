const express = require('express');
const router = express.Router();
const { Task } = require('../models');

// Отримати всі завдання
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати завдання за ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати всі завдання за UserID
router.get('/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити нове завдання
router.post('/', async (req, res) => {
  try {
    const { userId, title, description, dueDate, isCompleted } = req.body;
    const newTask = await Task.create({ userId, title, description, dueDate, isCompleted });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Оновити інформацію про завдання
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const { title, description, dueDate, isCompleted } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Видалити завдання
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Пошук завдань за назвою
router.get('/search/:title', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        title: req.params.title,
      },
    });
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Пошук завдань за статусом виконання
router.get('/status/:isCompleted', async (req, res) => {
  try {
    const isCompleted = req.params.isCompleted === 'true';
    const tasks = await Task.findAll({
      where: {
        isCompleted,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Task } = require('../models');
const { Op } = require('sequelize');

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const totalTasks = await Task.count({ where: { userId } });

    const completedTasks = await Task.count({
      where: { userId, isCompleted: true },
    });

    const pendingTasks = totalTasks - completedTasks;

    const overdueTasks = await Task.findAll({
      where: {
        userId,
        dueDate: { [Op.lt]: new Date() },
        isCompleted: false,
      },
    });

    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks: overdueTasks.map(task => ({
        id: task.id,
        title: task.title,
        dueDate: task.dueDate,
      })),
      completionRate: `${completionRate.toFixed(2)}%`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId/overdue', async (req, res) => {
  try {
    const userId = req.params.userId;

    const overdueTasks = await Task.findAll({
      where: {
        userId,
        dueDate: { [Op.lt]: new Date() },
        isCompleted: false,
      },
    });

    res.json(
      overdueTasks.map(task => ({
        id: task.id,
        title: task.title,
        dueDate: task.dueDate,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId/completion-rate', async (req, res) => {
  try {
    const userId = req.params.userId;

    const totalTasks = await Task.count({ where: { userId } });
    const completedTasks = await Task.count({
      where: { userId, isCompleted: true },
    });

    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.json({ completionRate: `${completionRate.toFixed(2)}%` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

import { Response } from 'express';
import Task from '../models/task';
import {AuthenticatedRequest} from "../middleware/authMiddleware"

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, status, due_date } = req.body;
    const userId = req.user!.id;

    const task = await Task.create({
      title,
      description,
      status,
      due_date,
      userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export const     getTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const tasks = await Task.findAll({ where: { userId } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};
export const getTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.user!.id;

    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, status, due_date } = req.body;
    const taskId = req.params.id;
    const userId = req.user!.id;

    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update({ title, description, status, due_date });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.user!.id;

    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

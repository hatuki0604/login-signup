import express from 'express';
import { connectToDatabase } from '../lib/db.js';

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.execute('SELECT * FROM todos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err });
  }
});

// ADD a new todo
router.post('/', async (req, res) => {
  const { task, due_time } = req.body; 

  try {
    const db = await connectToDatabase();
    const [result] = await db.execute(
      'INSERT INTO todos (task, completed, due_time) VALUES (?, ?, ?)', 
      [task, false, due_time] 
    );

    res.json({
      id: result.insertId,
      task,
      completed: false,
      due_time, 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding todo', error: err });
  }
});


// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    await db.execute('DELETE FROM todos WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err });
  }
});

// TOGGLE complete
router.put('/toggle/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    await db.execute(
      'UPDATE todos SET completed = NOT completed WHERE id = ?',
      [req.params.id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: 'Error toggling todo', error: err });
  }
});

// EDIT a task
router.put('/:id', async (req, res) => {
  const { task } = req.body;
  try {
    const db = await connectToDatabase();
    await db.execute('UPDATE todos SET task = ? WHERE id = ?', [
      task,
      req.params.id,
    ]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err });
  }
});

export default router;

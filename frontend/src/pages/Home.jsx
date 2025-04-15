import React, { useState, useEffect } from 'react';
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos';

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from API on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (task, due_time) => {
    try {
      const res = await axios.post(API_URL, { task, due_time });
      setTodos([...todos, res.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.put(`${API_URL}/toggle/${id}`);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task, id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { task });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: false } : todo
        )
      );
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    
<div
  style={{
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fefefe",
    fontFamily: "'Segoe UI', sans-serif",
  }}
>
  <h1
    style={{
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
      fontSize: "28px",
    }}
  >
    Get Things Done!
  </h1>

  <TodoForm addTodo={addTodo} />

  {todos.map((todo) =>
    todo.isEditing ? (
      <EditTodoForm key={todo.id} task={todo} editTodo={editTask} />
    ) : (
      <Todo
        key={todo.id}
        task={todo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    )
  )}
</div>

  );
};

export default TodoWrapper;

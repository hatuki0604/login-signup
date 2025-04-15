import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [dueTime, setDueTime] = useState(''); // Thêm input thời gian

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && dueTime) {
      addTodo(value, dueTime); // Gửi task + thời gian
      setValue('');
      setDueTime('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="TodoForm"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          outline: "none",
        }}
      />
      <input
        type="datetime-local"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
        className="todo-input"
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          outline: "none",
        }}
      />
      <button
        type="submit"
        className="todo-btn"
        style={{
          backgroundColor: "#4a90e2",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;

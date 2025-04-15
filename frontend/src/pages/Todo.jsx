import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        padding: "12px 16px",
        marginBottom: "12px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggleComplete(task.id)}>
        <p
          style={{
            margin: 0,
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#999" : "#333",
          }}
        >
          {task.task}
        </p>
        {task.due_time && (
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            🕒 {new Date(task.due_time).toLocaleString()}
          </p>
        )}
      </div>
      <div style={{ display: "flex", gap: "10px", marginLeft: "10px" }}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
          style={{ cursor: "pointer", color: "#4a90e2" }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
          style={{ cursor: "pointer", color: "#e94e4e" }}
        />
      </div>
    </div>
  );
};

export default Todo;

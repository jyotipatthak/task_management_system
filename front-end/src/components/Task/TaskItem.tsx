import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/TaskItem.css';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Task deleted successfully!');
      window.location.reload(); // Reload the page to update the task list
    } catch (error) {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      <div className="task-item-button-container">
        <Link to={`/tasks/edit/${task.id}`} className="task-item-button">Edit</Link>
        <button onClick={handleDelete} className="task-item-button">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

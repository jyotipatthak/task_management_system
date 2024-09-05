import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import './css/TaskList.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link for navigation

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://task-management-system-qrgm.onrender.com/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="task-list-container">
      <h1>Tasks</h1>
      <Link to="/tasks/add" className="add-task-button">Add Task</Link>
      <div className="task-item-container">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <TaskItem task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

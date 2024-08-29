import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import TaskList from './components/Task/TaskList';
import AddTask from './components/Task/AddTask';
import EditTask from './components/Task/EditTask';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';  // Redirect to login page
  };

  return (
    <Router>
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <Link to="/tasks" style={styles.navLink}>Task Management System</Link>
        </div>
        <div style={styles.navRight}>
          {isLoggedIn ? (
            <>
              <Link to="/tasks" style={styles.addTaskButton}>My Tasks</Link>
              <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" style={styles.navLink}>Register</Link>
              <Link to="/login" style={styles.navLink}>Login</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Vertically center items
    padding: '15px', // Increased padding for more height
    backgroundColor: '#28a745',
    borderBottom: '1px solid #ddd',
  },
  navLeft: {
    flex: 1,
  },
  navRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center', // Vertically center items
  },
  navLink: {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#fff',
  },
  addTaskButton: {
    margin: '0 10px',
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textDecoration: 'none', // Remove underline from link
  },
  logoutButton: {
    margin: '0 10px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default App;

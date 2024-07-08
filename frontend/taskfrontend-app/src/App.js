import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import UpdateTask from './components/UpdateTask';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <h1>Task Manager</h1>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/tasks" element={<TaskList/>} />
                    <Route path="/create" element={<CreateTask/>} />
                    <Route path="/update/:id" element={<UpdateTask/>} />
                    <Route path="/update" element={<TaskList />} />
                    <Route path="/delete" element={<TaskList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskService from '../services/Taskservice';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        TaskService.getAllTasks().then(response => {
            setTasks(response.data);
        });
    }, []);

    const handleDelete = (taskId) => {
        TaskService.deleteTask(taskId).then(() => {
            setTasks(tasks.filter(task => task.id !== taskId));
        });
    };

    return (
        <div>
            <h2>Task List</h2>
            <Link to="/create">Create New Task</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                            <td>
                                <Link to={`/update/${task.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // function handleDelete(taskId) {
    //     TaskService.deleteTask(taskId).then(() => {
    //         setTasks(tasks.filter(task => task.id !== taskId));
    //     });
    // }
};

export default TaskList;

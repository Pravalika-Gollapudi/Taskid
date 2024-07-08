import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from '../services/Taskservice';

const UpdateTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'TO_DO',
        dueDate: '',
        priority: 'LOW'
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        TaskService.getTaskById(id)
            .then(response => {
                setTask(response.data);
            })
            .catch(err => {
                setError('Failed to load task. Please try again.');
                console.error('Error loading task:', err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        TaskService.updateTask(id, task)
            .then(() => {
                navigate('/');
            })
            .catch(err => {
                setError('Failed to update task. Please try again.');
                console.error('Error updating task:', err.response || err.message || err);
            });
    };

    return (
        <div>
            <h2>Update Task</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={task.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={task.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Status:</label>
                    <select name="status" value={task.status} onChange={handleChange}>
                        <option value="TO_DO">TO DO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                </div>
                <div>
                    <label>Due Date:</label>
                    <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Priority:</label>
                    <select name="priority" value={task.priority} onChange={handleChange}>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;

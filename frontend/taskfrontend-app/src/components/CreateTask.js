import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskService from '../services/Taskservice';

const CreateTask = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'TO_DO',
        dueDate: '',
        priority: 'LOW'
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
        setValidationError(null); // Clear validation error when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.title.trim() === '') {
            setValidationError('Title is required');
            return;
        }

        TaskService.createTask(task)
            .then(() => {
                setSuccessMessage('Successfully Created');
                setError(null);
                setValidationError(null);
                setTimeout(() => setSuccessMessage(''), 3000);
                navigate('/tasks'); 
            })
            .catch(err => {
                setError('Failed to create task. Please try again.');
                console.error('Error creating task:', err);
                setSuccessMessage('');
            });
    };

    return (
        <div>
            <h2>Create Task</h2>
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
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
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;

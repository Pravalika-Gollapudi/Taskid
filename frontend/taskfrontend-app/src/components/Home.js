import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>List of Actions</h2>
            <div>
                <Link to="/tasks" className="nav-link">
                    <button>View All Tasks</button>
                </Link>
            </div>
            <div>
                <Link to="/create" className="nav-link">
                    <button>Create Task</button>
                </Link>
            </div>
            <div>
                <Link to="/update" className="nav-link">
                    <button>Update Task</button>
                </Link>
            </div>
            <div>
                <Link to="/delete" className="nav-link">
                    <button>Delete Task</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;

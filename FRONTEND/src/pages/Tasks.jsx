import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import API from '../utils/api';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const fetchTasks = async () => {
        setLoading(true);
        setFetchError('');
        try {
            const res = await API.get('tasks');
            setTasks(res.data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setFetchError('Failed to Fetch Tasks');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAdd = () => fetchTasks();
    const handleDelete = () => fetchTasks();

    return (
        <div className='container tasks-container'>
            <h2 className="task-title">Your Tasks</h2>
            <AddTask onAdd={handleAdd} />
            {loading ? <p className="loading">Loading Tasks...</p> :
                <TaskList tasks={tasks} onDelete={handleDelete} />}
            {fetchError && <div className='error message'>{fetchError}</div>}
            <button
                className='logout-btn'
                onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Tasks;

import axios from 'axios';

const API_URL = 'http://localhost:8080/tasks';

class TaskService {
    getAllTasks() {
        return axios.get(API_URL);
    }

    createTask(task) {
        return axios.post(API_URL, task);
    }

    getTaskById(taskId) {
        return axios.get(`${API_URL}/${taskId}`);
    }

    updateTask(taskId, task) {
        return axios.put(`${API_URL}/${taskId}`, task);
    }

    deleteTask(taskId) {
        return axios.delete(`${API_URL}/${taskId}`);
    }
}

export default new TaskService();

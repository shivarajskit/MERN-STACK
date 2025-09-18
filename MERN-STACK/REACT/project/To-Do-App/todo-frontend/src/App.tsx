import React, { useEffect, useState } from 'react';
import type { Task } from './types';
import api from './api';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await api.get<Task[]>('/');
        setTasks(response.data);
      } catch {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (title: string) => {
    try {
      const res = await api.post<Task>('/', { title });
      setTasks([...tasks, res.data]);
    } catch {
      setError("Failed to add task");
    }
  }

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const res = await api.patch<Task>(`/${id}`, { completed: !completed });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch {
      setError("Failed to update task");
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const res = await api.delete(`/${id}`);
      if (res.status === 200) {
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        setError("Failed to delete task");
      }
    } catch {
      setError("Failed to delete task");
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{error}</div>
        )}
        
        {loading && <p className="text-gray-500">Loading...</p>}

        <TaskForm addTask={addTask} />
        <ul className="mt-4">
          {
            tasks.map(task => (
              <TaskItem key={task._id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))
          }  
        </ul>
      </div>
    </>
  )
}

export default App;

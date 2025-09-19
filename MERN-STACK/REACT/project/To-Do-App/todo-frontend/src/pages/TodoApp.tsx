import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types";
import api from "../api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Logout from "./Logout";

const TodoApp: React.FC = () => {
  const queryClient = useQueryClient();

  // 🔹 Fetch tasks
  const fetchTasks = async (): Promise<Task[]> => {
    const response = await api.get<Task[]>("/tasks/");
    return response.data;
  };

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // 🔹 Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: (title: string) => api.post<Task>("/tasks/", { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // refresh list
    },
  });

  // 🔹 Toggle task mutation
  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      api.patch<Task>(`/tasks/${id}`, { completed: !completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // 🔹 Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // 🔹 Handlers
  const addTask = (title: string) => addTaskMutation.mutate(title);

  const toggleTask = (id: string, completed: boolean) =>
    toggleTaskMutation.mutate({ id, completed });

  const deleteTask = (id: string) => deleteTaskMutation.mutate(id);

  return (
    <div className="card">
      <div className="flex-header">
        <h4 className="heading-2xl">To-Do List</h4>
        <Logout />
      </div>

      {isError && <div className="error-box">{error?.message}</div>}

      {isLoading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <>
          <TaskForm addTask={addTask} />
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoApp;

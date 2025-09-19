import React from "react";
import type { Task } from "../types";

interface Props {
    task: Task,
    toggleTask: (id: string, completed: boolean) => void,
    deleteTask: (id: string) => void
}

const TaskItem: React.FC<Props> = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className="task-item">
      <span
        onClick={() => toggleTask(task._id, task.completed )}
        className={`task-title ${task.completed ? "task-completed" : ""}`}
      >
        {task.title}
      </span>
      <button
        onClick={() => deleteTask(task._id)}
        className="btn-delete"
      >
        ✕
      </button>
    </li>
  );
};

export default TaskItem;
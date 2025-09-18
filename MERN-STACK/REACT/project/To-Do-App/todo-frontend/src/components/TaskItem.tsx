import React from "react";
import type { Task } from "../types";

interface Props {
    task: Task,
    toggleTask: (id: string, completed: boolean) => void,
    deleteTask: (id: string) => void
}

const TaskItem: React.FC<Props> = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className="flex justify-between items-center p-2 border-b">
      <span
        onClick={() => toggleTask(task._id, task.completed)}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.title}
      </span>
      <button
        onClick={() => deleteTask(task._id)}
        className="text-red-500"
      >
        ✕
      </button>
    </li>
  );
};

export default TaskItem;
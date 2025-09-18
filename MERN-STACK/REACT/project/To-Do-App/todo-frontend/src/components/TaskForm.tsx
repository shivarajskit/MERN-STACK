import type React from "react";
import { useState } from "react";

interface TaskProps {
    addTask: (title: string) => void;
}

const TaskForm: React.FC<TaskProps> = ({addTask}) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(title);
            setTitle("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Add a new task"
                className="border p-2 flex-grow rounded"
            />
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add
            </button>
        </form>
    );
}

export default TaskForm;
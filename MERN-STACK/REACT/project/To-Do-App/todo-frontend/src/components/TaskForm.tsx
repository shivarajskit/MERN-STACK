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
        <form onSubmit={handleSubmit} className="form-row">
            <input value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Add a new task"
                className="input flex-grow"
            />
            <button 
                type="submit" 
                className="btn-add">
                Add
            </button>
        </form>
    );
}

export default TaskForm;
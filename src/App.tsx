import React, { useState } from "react";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");

  const addTask = () => {
    if (!taskTitle.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: taskTitle }]);
    setTaskTitle("");
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Task Manager</h1>
      <input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} <button onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

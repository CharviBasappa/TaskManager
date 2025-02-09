import React, { useState } from "react";
import { Task } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");

  const addTask = () => {
    if (!taskTitle.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: taskTitle, completed: false },
    ]);
    setTaskTitle("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1>📌 Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet! 🎉</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`task ${task.completed ? "completed" : ""}`}
            >
              <span onClick={() => toggleTask(task.id)}>{task.title}</span>
              <div>
                <button
                  className="complete-btn"
                  onClick={() => toggleTask(task.id)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => removeTask(task.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;

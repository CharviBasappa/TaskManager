import React, { useState, useEffect } from "react";
import { Task } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState<"High" | "Medium" | "Low">(
    "Medium"
  );

  // ✅ Load tasks from localStorage when the app starts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        setTasks(
          JSON.parse(savedTasks).sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return (
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
          })
        );
      } catch (error) {
        console.error("Error parsing localStorage tasks:", error);
      }
    }
  }, []);

  // ✅ Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks"); // Remove when empty
    }
  }, [tasks]);

  const addTask = () => {
    if (!taskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
      dueDate: taskDueDate || "9999-12-31",
      priority: taskPriority,
    };

    setTasks((prevTasks) =>
      [...prevTasks, newTask].sort((a, b) => {
        // Priority Sorting: High > Medium > Low
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        // If same priority, sort by due date
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      })
    );
    setTaskTitle("");
    setTaskDueDate("");
    setTaskPriority("Medium"); // Reset priority
  };

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks
        .map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
        .sort((a, b) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        })
    );
  };

  const removeTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <select
          value={taskPriority}
          onChange={(e) =>
            setTaskPriority(e.target.value as "High" | "Medium" | "Low")
          }
        >
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">✅ Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet! 🎉</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`task ${
                task.completed ? "completed" : ""
              } ${task.priority.toLowerCase()}`}
            >
              <div>
                <span onClick={() => toggleTask(task.id)}>{task.title}</span>
                <p className="task-info">
                  📅 {task.dueDate ? task.dueDate : "No Due Date"}
                </p>
                <p className={`priority ${task.priority.toLowerCase()}`}>
                  🔥 {task.priority} Priority
                </p>
              </div>
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

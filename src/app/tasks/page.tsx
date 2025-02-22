"use client";
import Status from "@/lib/status-enum";
import { addTask, deleteTask, getTasks, updateTask } from "@/lib/taskService";
import { useEffect, useState } from "react";

export default function TaskPage() {
  const [tasks, setTasks] = useState<
    { id: string; title: string; description: string; status: Status }[]
  >([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // 🔹 Ambil Task dari Firestore saat halaman dimuat
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const fetchedTasks: { id: string; title: string; description: string; status: Status }[] = await getTasks();
    setTasks(fetchedTasks);
  };

  // 🔹 Tambah Task Baru
  const handleAddTask = async () => {
    if (!taskTitle) return;
    await addTask(taskTitle, taskDescription);
    setTaskTitle("");
    setTaskDescription("");
    loadTasks();
  };

  // 🔹 Toggle Status Task
  const handleToggleTask = async (task: { id: string; title: string; description: string; status: Status }) => {
    const newStatus = task.status === Status.OPEN ? Status.DONE : Status.OPEN;
    await updateTask(task.id, newStatus, task.title, task.description);
    loadTasks();
  };

  // 🔹 Hapus Task
  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    loadTasks();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>

      {/* 🔹 Input Tambah Task */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter task title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="Enter task description..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2">Add</button>
      </div>

      {/* 🔹 List Task */}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border rounded">
            <span
              onClick={() => handleToggleTask(task)}
              className={`cursor-pointer ${task.status === Status.DONE ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </span>
            <button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 text-white px-2 py-1">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

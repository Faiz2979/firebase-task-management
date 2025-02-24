"use client";
import Status from "@/lib/status-enum";
import { addTask, deleteTask, getTasks, updateTask } from "@/pages/taskService";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function TaskPage() {
  const [tasks, setTasks] = useState<
    { id: string; title: string; description: string; status: Status }[]
  >([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(new Date);
  const [user,setUser] = useState<User | null>(null);
  // 🔹 Ambil Task dari Firestore saat halaman dimuat
  useEffect(() => {
    fetchUser();
    if (user) {
      loadTasks(user.uid);
    }
  }, []);


  const fetchUser= async () => {
    const storedUser = localStorage.getItem("authToken");
    if (storedUser) {
      const decodedToken = JSON.parse(atob(storedUser.split(".")[1]));
      setUser(decodedToken);
    }

  }
  const loadTasks = async (userId:string) => {
    const fetchedTasks: { id: string; title: string; description: string; status: Status }[] = await getTasks(userId);
    setTasks(fetchedTasks);
  };

  // 🔹 Tambah Task Baru
  const handleAddTask = async () => {
    if (!taskTitle) return;
    if (user) {
      await addTask(taskTitle, taskDescription, taskDeadline, user.uid);
    }
    setTaskTitle("");
    setTaskDescription("");
    if (user) {
      loadTasks(user.uid);
    }
  };

  // 🔹 Toggle Status Task
  const handleToggleTask = async (task: { id: string; title: string; description: string; status: Status }) => {
    const newStatus = task.status === Status.OPEN ? Status.DONE : Status.OPEN;
    await updateTask(task.id, newStatus, task.title, task.description, taskDeadline);
    if (user) {
      loadTasks(user.uid);
    }
  };

  // 🔹 Hapus Task
  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    if (user) {
      loadTasks(user.uid);
    }
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
          className="border p-2 text-black"
        />
        <textarea
          placeholder="Enter task description..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border p-2 text-black"
        />

        <input
          placeholder="Select a date"
          type="date"
          className="text-black"
          name="date"
          id=""
          value={taskDeadline.toISOString().split('T')[0]}
          onChange={(e) => setTaskDeadline(new Date(e.target.value))}
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2">Add</button>
      </div>

      {/* 🔹 List Task */}
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-2 border rounded-lg shadow">
          <div>
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-sm">{task.description}</p>
          </div>
          <div>
            <button onClick={() => handleToggleTask(task)} className="bg-blue-500 text-white px-4 py-2">
              {task.status === Status.OPEN ? "Done" : "Open"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 text-white px-4 py-2">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

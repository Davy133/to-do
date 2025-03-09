import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FaHome, FaUser } from "react-icons/fa";
import { Sidebar, TaskCard } from "../components";
import Header from "../components/Header";
import TaskModal from "../components/TaskModal";
import { TaskEditModal } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<{
    isCompleted: boolean;
    id: string;
    title: string;
    description: string;
    dueDate: string;
  }[]>([]);

  const [user, setUser] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/tasks")
      .then((response) => {
        setTasks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api.get("/user").then((response) => {
      setUser(response.data.data.name);
    });
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openEditModal = () => setEditModalIsOpen(true);
  const closeEditModal = () => setEditModalIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.post("/tasks", newTask).then((response) => {
      setTasks((prevTasks) => [...prevTasks, response.data.data]);
      toast.success("Task added successfully! ✅", { toastId: "task-added" });
      closeModal();
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    api.put(`/tasks/${newTask.id}`, newTask).then((response) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === newTask.id ? response.data.data : task))
      );
      toast.success("Task updated successfully! ✏️", { toastId: "task-updated" });
      closeEditModal();
    });
  };

  const deleteTask = (id: string) => {
    api
      .delete(`/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
        toast.error("Task deleted successfully! ❌", { toastId: `task-deleted-${id}` });
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const completeTask = (id: string) => {
    api
      .patch(`/tasks/${id}/completed`)
      .then(() => {
        setTasks(
          tasks.map((task) => (task.id === id ? { ...task, isCompleted: true } : task))
        );
        toast.success("Task marked as completed! ✅", { toastId: `task-completed-${id}` });
      })
      .catch((error) => {
        console.error("Error completing task:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1E1F22] text-white">
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-[#1E1F22] text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar.Sidebar>
        <Sidebar.SidebarItem icon={<FaHome />} link="/" />
        <Sidebar.SidebarItem icon={<FaUser />} link="/profile" />
      </Sidebar.Sidebar>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Header
          title={`Bem vindo de volta, ${
        user ? user.split(" ")[0].charAt(0).toUpperCase() + user.split(" ")[0].slice(1, 30) : ""
          }👋`}
        />

        {/* Add New Task Button - Centered on Small Screens */}
        <div className="flex justify-center md:justify-start items-center mb-6">
          <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300"
          >
        Add New Task
          </button>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg">Suas tasks aparecerão aqui.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onDelete={() => deleteTask(task.id)}
            onComplete={() => completeTask(task.id)}
            onEdit={() => {
          setNewTask(task);
          openEditModal();
            }}
          />
        ))}
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Modals */}
      <TaskModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <TaskEditModal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleSubmit={handleEdit}
      />
    </div>
  );
};

export default Home;

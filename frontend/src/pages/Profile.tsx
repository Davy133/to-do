import React, { useEffect, useState } from "react";
import { Sidebar } from "../components";
import Header from "../components/Header";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import api from "../services/api";

interface User {
  name: string;
  email: string;
  gender: string;
  age: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    gender: "",
    age: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/user");
        setUser(response.data.data);
        setFormData(response.data.data);
      } catch (error) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    if (user) setFormData(user);
  };

  const handleSaveClick = async () => {
    if (!formData.name || !formData.email || !formData.gender || formData.age <= 0) {
      setError("Please fill out all fields correctly.");
      return;
    }

    try {
      await api.put("/user", formData);
      setUser(formData);
      setIsEditing(false);
      setError("");
    } catch {
      setError("Error saving user info.");
    }
  };

  return (
    <div className="flex bg-[#1E1F22] text-white min-h-screen">
      <Sidebar.Sidebar>
        <Sidebar.SidebarItem icon={<FaHome />} link="/" />
        <Sidebar.SidebarItem icon={<FaUser />} link="/profile" />
        <Sidebar.SidebarItem icon={<FaCog />} link="/settings" />
      </Sidebar.Sidebar>

      <div className="flex-1 p-8">
        <Header title="Meu Perfil" />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          user && (
            <div className="bg-[#2A2B2F] p-6 rounded-lg shadow-md w-full max-w-lg mx-auto border border-[#3A3B3E]">
              {/* Profile Picture Placeholder */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-[#3A3B3E] rounded-full flex items-center justify-center text-gray-400">
                  <span className="text-4xl">📷</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">No profile picture</p>
              </div>

              {/* User Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full p-2 bg-[#3A3B3E] border border-[#55565A] rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      !isEditing ? "cursor-not-allowed text-gray-400" : "text-white"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full p-2 bg-[#3A3B3E] border border-[#55565A] rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      !isEditing ? "cursor-not-allowed text-gray-400" : "text-white"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Gênero</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full p-2 bg-[#3A3B3E] border border-[#55565A] rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      !isEditing ? "cursor-not-allowed text-gray-400" : "text-white"
                    }`}
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Idade</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full p-2 bg-[#3A3B3E] border border-[#55565A] rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      !isEditing ? "cursor-not-allowed text-gray-400" : "text-white"
                    }`}
                  />
                </div>
                <div className="flex space-x-4">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSaveClick}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelClick}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition"
                    >
                      Editar
                    </button>
                  )}
                </div>
              </form>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;

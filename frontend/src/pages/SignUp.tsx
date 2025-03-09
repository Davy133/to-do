import React, { useState } from "react";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    try {
      await api.post("/user", formData);
      toast.success("Cadastro realizado com sucesso! Redirecionando para a página de login.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center px-10 bg-[#2A2B2F] text-white">
      <div className="w-full lg:w-1/2 max-w-md text-center">
        <h1 className="font-montserrat font-bold text-2xl text-white">
          Faça seu cadastro
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="relative">
            <FiUser className="absolute left-4 top-1/3 transform -translate-y-1/3 text-gray-400 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-gray-700 bg-[#1C1D22] rounded-xl focus:outline-none text-white"
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/3 transform -translate-y-1/3 text-gray-400 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-gray-700 bg-[#1C1D22] rounded-xl focus:outline-none text-white"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FiLock className="absolute left-4 top-1/3 transform -translate-y-1/3 text-gray-400 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-gray-700 bg-[#1C1D22] rounded-xl focus:outline-none text-white"
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <FiLock className="absolute left-4 top-1/3 transform -translate-y-1/3 text-gray-400 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-gray-700 bg-[#1C1D22] rounded-xl focus:outline-none text-white"
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Age Field */}
          <div className="relative">
            <select
              className="text-xl w-full pl-4 p-4 mb-4 border border-gray-700 bg-[#1C1D22] text-gray-400 rounded-xl focus:outline-none"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecione sua idade
              </option>
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Field */}
          <div className="relative">
            <select
              className="text-xl w-full pl-4 p-4 mb-4 border border-gray-700 bg-[#1C1D22] text-gray-400 rounded-xl focus:outline-none"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecione seu gênero
              </option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          </div>

            {/* Submit Button */}
            <button
            className="w-full p-4 bg-gray-700 rounded-xl text-white font-bold hover:bg-gray-800 transition duration-300"
            type="submit"
            >
            Cadastrar
            </button>
        </form>
      </div>

      {/* Toast Notifications Container */}
      <ToastContainer />
    </div>
  );
};

export default Register;

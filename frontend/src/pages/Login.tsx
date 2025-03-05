import React, { useState } from "react";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    login(email, password).then(() => {
      navigate("/");
    }
    ).catch((error) => { 
      console.error("Login failed", error);
      toast.error(error.data.message);
      setLoading(false);
    }
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center px-10 bg-[#2A2B2F]">
      <div className="w-full lg:w-1/2 max-w-md text-center lg:text-left">
        <h1 className="mb-10 font-mono font-bold text-4xl text-white">SyncNote</h1>
        <h1 className="font-montserrat font-bold text-4xl text-white">Faça seu login</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/3 transform -translate-y-1/3 text-gray-400 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-gray-700 bg-[#1C1D22] text-white rounded-xl focus:outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

            <div className="relative">
            <FiLock className="absolute left-4 top-1/3 transform -translate-y-1/3 text-gray-400 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-gray-700 bg-[#1C1D22] text-white rounded-xl focus:outline-none"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>

          <button
            className="w-full p-4 bg-gray-700 rounded-xl text-white font-bold"
            type="submit"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-2 text-gray-400 text-sm flex items-center justify-center lg:justify-start">
          <FiLogIn className="mr-2 text-gray-400" />
          <a href="/signup" className="text-base text-gray-400">Não tenho cadastro</a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;

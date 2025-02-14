import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import astronautIcon from "../assets/astronaut.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center px-10">
      <div className="w-full lg:w-1/2 max-w-md text-center lg:text-left">
        <h1 className="mb-10 font-mono font-bold text-4xl text-black-500">
          SyncNote
        </h1>
        <h1 className="font-montserrat font-bold text-2xl text-red-500">
          Faça seu login
        </h1>
        <form className="mt-6">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/3 transform -translate-y-1/3 text-red-500 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-red-500 rounded-xl focus:outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/3 transform -translate-y-1/3 text-red-500 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-red-500 rounded-xl focus:outline-none"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full p-4 bg-red-500 rounded-xl text-white font-bold"
            type="submit"
            onClick={handleSubmit}
          >
            Entrar
          </button>
        </form>
        <p className="mt-2 text-gray-600 text-sm">Não tenho cadastro</p>
      </div>

      <div className="hidden lg:flex w-1/2 justify-center">
        <img src={astronautIcon} alt="Astronaut" />
      </div>
    </div>
  );
};

export default Login;

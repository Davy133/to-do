import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";

//TODO: Implementar aviso de erro ao tentar cadastrar usuário com senha diferente
//TODO: Implementar sistema de autenticação

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
      <div className="w-full lg:w-1/2 max-w-md text-center">
        <h1 className="font-montserrat font-bold text-2xl text-red-500">
          Faça seu cadastro
        </h1>
        <form className="mt-6">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/3 transform -translate-y-1/3 text-red-500 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-red-500 rounded-xl focus:outline-none"
              type="email"
              placeholder="Nome"
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

          <div className="relative">
            <FiLock className="absolute left-4 top-1/3 transform -translate-y-1/3 text-red-500 text-xl" />
            <input
              className="text-xl w-full pl-12 p-4 mb-4 border border-red-500 rounded-xl focus:outline-none"
              type="password"
              placeholder="Confirme sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="text-xl w-full pl-4 p-4 mb-4 border border-red-500 text-red-500 rounded-xl focus:outline-none"
              defaultValue=""
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

            <div className="relative">
                <select
                    className="text-xl w-full pl-4 p-4 mb-4 border border-red-500 text-red-500 rounded-xl focus:outline-none"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecione seu gênero
                    </option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                </select>
            </div>

          <button
            className="w-full p-4 bg-red-500 rounded-xl text-white font-bold"
            type="submit"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

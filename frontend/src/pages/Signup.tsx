import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../api/client";

export default function ClientSignup() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [balance, setBalance] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createClient(fullName, password, cpf, parseFloat(balance));
      alert("Cliente criado com sucesso!");
      navigate("/login");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 tracking-tight">
            Criar Cliente
          </h1>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 
                  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                  transition-all duration-300 ease-in-out"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Senha"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 
                  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                  transition-all duration-300 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="CPF"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 
                  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                  transition-all duration-300 ease-in-out"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Valor Inicial"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 
                  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                  transition-all duration-300 ease-in-out"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg 
              hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 
              shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}

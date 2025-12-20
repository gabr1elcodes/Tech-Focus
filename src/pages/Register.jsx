import galaxia from '../assets/galaxia.jpg'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import techfocusLogo from '../assets/techfocusLogo.png'
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // ← ADIÇÃO
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // limpa erro anterior

    // Simulação de backend
    const emailJaExiste = true;

    setTimeout(() => {
      if (emailJaExiste) {
        setIsLoading(false);
        setError("Este email já está cadastrado. Faça login para continuar.");
        return;
      }

      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">

      <div className="w-full max-w-md bg-blue-900/70 backdrop-blur-md rounded-2xl shadow-2xl p-10 text-white">

      <h1 className="flex items-center justify-center gap-3 text-3xl font-semibold mb-8">
        <img
          src={techfocusLogo}
          alt="Tech Focus"
          className="w-10 h-10 rounded-xl"
        />
          Cadastre-se
      </h1>


        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
<div className="relative">
  <i className="bx bx-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl"></i>
  <input
    type="email"
    autoComplete="email"
    placeholder="Digite seu Email"
    className="w-full px-12 py-3 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>

{/* Crie sua senha */}
<div className="relative">
  <i className="bx bx-lock-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl"></i>
  <input
    type={showPassword ? 'text' : 'password'}
    autoComplete="new-password"
    placeholder="Crie sua Senha"
    className="w-full px-12 py-3 pr-16 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
  >
    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
  </button>
</div>

{/* Repita a senha */}
<div className="relative">
  <i className="bx bx-lock-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl"></i>
  <input
    type={showPassword ? 'text' : 'password'}
    autoComplete="new-password"
    placeholder="Repita a Senha"
    className="w-full px-12 py-3 pr-16 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
  >
    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
  </button>
</div>


          {/* Mensagem de erro */}
          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          {/* Botão de submit */}
          <button
            type="submit"
            className="w-full py-3 bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-100 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Confirmar'}
          </button>

          <p className="text-center text-sm mt-4 text-gray-300">
              Já tem uma conta?{" "}
            <Link to="/" className="text-blue-300 hover:underline">
              Voltar para Login
            </Link>

          </p>

        </form>

      </div>
    </div>
  );
}

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import techfocusLogo from "../assets/techfocusLogo.png";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      setShowSuccessToast(true);

      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessToast(false);
        navigate("/");
      }, 2000);

    } catch (err) {
      setIsLoading(false);
      const message = err.response?.data?.message || "Erro ao criar conta. Tente novamente.";
      setError(message);
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-blue-900/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 text-white">

        <h1 className="flex items-center justify-center gap-3 text-3xl font-semibold mb-8">
          <img
            src={techfocusLogo}
            alt="Tech Focus"
            className="w-10 h-10 rounded-xl"
          />
          Cadastre-se
        </h1>

        {showSuccessToast && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Conta criada com sucesso! Redirecionando...
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="relative">
            <i className="bx bx-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl" />
            <input
              type="email"
              autoComplete="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <i className="bx bx-lock-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl" />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Crie sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-14 py-3 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
          </div>

          <div className="relative">
            <i className="bx bx-lock-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl" />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-12 pr-14 py-3 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-100 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Criando conta..." : "Confirmar"}
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
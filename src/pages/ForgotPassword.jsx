import techfocusLogo from '../assets/techfocusLogo.png'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!regex.test(value)) {
      setEmailError("Email inválido");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError || !email) return;

    setIsLoading(true);

    // Simula envio de email de recuperação
    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);

      // Aguarda o feedback visual antes de redirecionar
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 1500);
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
          Tech Focus
        </h1>

        <p className="text-center text-sm text-gray-300 mb-6">
          Digite seu email para recuperar a senha
        </p>

        {showToast && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Email de recuperação enviado!
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="relative">
              <i className="bx bx-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl"></i>
              <input
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className="w-full px-12 py-3 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {emailError && (
              <p className="text-red-400 text-sm mt-2">
                {emailError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !!emailError || !email}
            className="w-full py-3 bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-100 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Enviando..." : "Recuperar senha"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Lembrou da senha?{" "}
          <Link to="/login" className="text-blue-300 hover:underline">
            Faça login
          </Link>
        </p>

      </div>
    </div>
  );
}

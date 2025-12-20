import galaxia from '../assets/galaxia.jpg'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import techfocusLogo from '../assets/techfocusLogo.png'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) {
      setEmailError("Email inválido");
    } else {
      setEmailError("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

      // ✅ salvar ou remover email no localStorage
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
      <div className="w-full max-w-md bg-blue-900/70 backdrop-blur-md rounded-2xl shadow-2xl p-10 text-white transition-all">
        
        <h1 className="flex items-center justify-center gap-3 text-3xl font-semibold mb-8">
          <img
            src={techfocusLogo}
            alt="Tech Focus"
            className="w-10 h-10 rounded-xl" 
          />
          Tech Focus
        </h1>

        <p className="text-center text-sm text-gray-300 mb-6">
          Faça login para continuar
        </p>

        {showToast && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity">
            Login realizado com sucesso!
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email com ícone */}
          <div className="relative">
            <i className='bx bx-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl'></i>
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
              className="w-full pl-12 px-4 py-3 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-1 absolute left-0 -bottom-5">{emailError}</p>
            )}
          </div>

          {/* Senha com ícone */}
          <div className="relative">
            <i className='bx bx-lock-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-2xl'></i>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Senha"
              className="w-full pl-12 px-4 py-3 rounded-full bg-blue-800/70 border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Checkbox Lembrar senha */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Lembrar senha
            </label>

            <a href="/forgot-password" className="text-blue-300 hover:underline">
              Esqueci a senha
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading || !!emailError}
            className="w-full py-3 bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-100 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Entrando..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Não tem uma conta?{" "}
          <a href="/register" className="text-blue-300 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  )
}

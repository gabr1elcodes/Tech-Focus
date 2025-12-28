import { useState, useRef, useEffect } from "react";
import { Bell, Settings, Moon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function LogoMenu({ darkMode, onToggleDarkMode, onOpenProfile, user }) {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const containerRef = useRef(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);



  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarSrc =
    user.avatar && user.avatar.trim() !== ""
      ? user.avatar
      : "https://via.placeholder.com/40?text=TF";

  return (
    <>
      {/* ================= DROPDOWN ================= */}
      <div ref={containerRef} className="relative inline-block">
        {/* Avatar */}
        <div
          className="
            w-10 h-10 sm:w-9 sm:h-9
            rounded-full
            bg-blue-600 text-white
            flex items-center justify-center
            text-sm font-semibold
            cursor-pointer
            overflow-hidden
          "
          onClick={() => setOpen(prev => !prev)}
        >
          <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
        </div>

        {open && (
          <div
            className="
              absolute top-full right-0 mt-2
              bg-white dark:bg-gray-900
              shadow-lg rounded-md
              overflow-hidden
              min-w-[180px] sm:min-w-[150px]
              max-w-[90vw]
              z-50
            "
          >
            <ul className="flex flex-col text-sm text-gray-800 dark:text-gray-100">

              {/* Meu perfil */}
              <li
                onClick={() => {
                  onOpenProfile();
                  setOpen(false);
                }}
                className="flex items-center px-4 py-2.5 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <Bell className="w-5 h-5 mr-2" />
                Meu perfil
              </li>

              {/* 🔹 CONFIGURAÇÕES */}
              <li
                onClick={() => {
                  setOpenSettings(true); // abre o modal
                  setOpen(false);        // fecha o dropdown
                }}
                className="flex items-center px-4 py-2.5 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <Settings className="w-5 h-5 mr-2" />
                Configurações
              </li>

              <li
                onClick={onToggleDarkMode}
                className="flex items-center px-4 py-2.5 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <Moon className="w-5 h-5 mr-2" />
                {darkMode ? "Modo Claro" : "Modo Escuro"}
              </li>

              <li className="flex items-center px-4 py-2.5 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-red-600">
                <LogOut className="w-5 h-5 mr-2" />
                <Link to="/" className="hover:underline">
                  Sair
                </Link>
              </li>

            </ul>
          </div>
        )}
      </div>

      {/* ================= MODAL CONFIGURAÇÕES ================= */}
      {openSettings && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/40
            flex items-center justify-center
          "
        >
          <div
            className="
              bg-white dark:bg-gray-900
              rounded-lg
              p-6
              w-[90%] max-w-md
              shadow-xl
            "
          >
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Configurações
              </h2>
              <button
                onClick={() => setOpenSettings(false)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo (placeholder) */}
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Notificações no Site
              </span>

              <button
                onClick={() => setNotificationsEnabled(prev => !prev)}
                className={`w-11 h-6 rounded-full transition-colors
                ${notificationsEnabled ? "bg-blue-600" : "bg-gray-300"}
                `}
              >
                <span
                  className={`
                  block w-5 h-5 bg-white rounded-full
                  transform transition-transform
                  ${notificationsEnabled ? "translate-x-5" : "translate-x-1"}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Desativar Som
              </span>

              <button
                onClick={() => setSoundEnabled(prev => !prev)}
                className={`
                w-11 h-6 rounded-full transition-colors
                ${soundEnabled ? "bg-blue-600" : "bg-gray-300"}
                `}
              >
                <span
                  className={`
                  block w-5 h-5 bg-white rounded-full
                  transform transition-transform
                  ${soundEnabled ? "translate-x-5" : "translate-x-1"}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <span
                className="text-sm text-gray-700 dark:text-gray-300">
                Notificações por E-mail
              </span>

              <button onClick={() => setEmailEnabled(prev => !prev)}
                className={`
                relative w-11 h-6 rounded-full transition-colors
                ${emailEnabled ? "bg-blue-600" : "bg-gray-300"}
                `}
              >

                <span
                  className={`
                block w-5 h-5 bg-white rounded-full
                transform transition-transform
                ${emailEnabled ? "translate-x-5" : "translate-x-1"}
                `}
                />
              </button>
            </div>


          </div>
        </div>
      )}
    </>
  );
}

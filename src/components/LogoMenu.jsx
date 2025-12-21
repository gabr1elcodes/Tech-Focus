import { useState, useRef, useEffect } from "react";
import { Bell, Settings, Moon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function LogoMenu({ darkMode, onToggleDarkMode, onOpenProfile }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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
        "
        onClick={() => setOpen(prev => !prev)}
      >
        TF
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

            <li className="flex items-center px-4 py-2.5 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
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
  );
}

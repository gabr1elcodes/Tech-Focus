import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNotificacoes } from "./contexts/NotificationContext";

export default function Sino() {
  const { notificacoes, removerNotificacao } = useNotificacoes();
  const [aberto, setAberto] = useState(false);
  const ref = useRef(null);

  function handleMarcarComoLido(id) {
    removerNotificacao(id);
    setAberto(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setAberto(prev => !prev)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />

        {notificacoes.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {notificacoes.length}
          </span>
        )}
      </button>

      {aberto && notificacoes.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
          <ul>
            {notificacoes.map(n => (
              <li
                key={n.id}
                className="px-4 py-2 border-b last:border-b-0 text-sm flex justify-between items-center"
              >
                <span className="pr-2">
                  [{n.tipo}] {n.mensagem}
                </span>

                <button
                  onClick={() => handleMarcarComoLido(n.id)}
                  className="text-blue-600 dark:text-blue-400 text-xs hover:underline whitespace-nowrap"
                >
                  Marcar como lida
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

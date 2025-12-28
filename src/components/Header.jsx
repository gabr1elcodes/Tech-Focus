import { useState } from "react";
import { Bell, Plus } from "lucide-react";
import LogoMenu from "./LogoMenu";
import { useNotificacoes } from "./contexts/NotificationContext";

export default function Header({ onCreateNote, onToggleDarkMode, darkMode, user, setUser, onOpenProfile }) {
  const { notificacoes, removerNotificacao } = useNotificacoes();
  const [aberto, setAberto] = useState(false);

  function handleMarcarComoLido(id) {
    removerNotificacao(id);
  }

  return (
    <header className="min-h-[56px] sm:h-16 px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
      <div className="w-6 sm:w-10" />
      <h1 className="hidden sm:block text-xl font-semibold text-gray-800 dark:text-gray-100">
        Concentre-se e produza.
      </h1>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* Sino de notificações */}
        <div className="relative">
          <button
            onClick={() => setAberto(!aberto)}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {notificacoes.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {notificacoes.length}
              </span>
            )}
          </button>

          {/* Menu de notificações */}
          {aberto && notificacoes.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
              <ul>
                {notificacoes.map(n => (
                  <li key={n.id} className="px-4 py-2 border-b last:border-b-0 text-sm flex justify-between items-center">
                    <span>[{n.tipo}] {n.mensagem}</span>
                    <button
                      className="text-blue-600 dark:text-blue-400 text-xs hover:underline"
                      onClick={() => handleMarcarComoLido(n.id)}
                    >
                      Marcar como lida
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Botão Nova Nota */}
        <button
          onClick={onCreateNote}
          className="flex items-center gap-1 px-3 py-2 sm:px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 sm:hidden" />
          <span className="hidden sm:inline">Nova nota</span>
        </button>

        {/* Menu do usuário */}
        <LogoMenu
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
          user={user}
          setUser={setUser}
          onOpenProfile={onOpenProfile}
        />
      </div>
    </header>
  );
}

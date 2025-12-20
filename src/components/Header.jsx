import { Bell } from "lucide-react";
import LogoMenu from "./LogoMenu";

export default function Header({
  onCreateNote,
  onToggleDarkMode,
  darkMode
}) {
  return (
    <header className="
      h-16 px-6 
      bg-white dark:bg-gray-900 
      border-b border-gray-200 dark:border-gray-800
      flex items-center justify-between
    ">
      {/* Esquerda */}
      <div className="w-10" />

      {/* Centro */}
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Concentre-se e produza.
      </h1>

      {/* Direita */}
      <div className="flex items-center gap-4">
      

        {/* Notificações */}
        <button className="
          relative p-2 rounded-full 
          hover:bg-gray-100 dark:hover:bg-gray-800
        ">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Criar nota */}
        <button
          onClick={onCreateNote}
          className="
            px-4 py-2 rounded-lg 
            bg-blue-600 text-white text-sm font-medium
            hover:bg-blue-700 transition
          "
        >
          + Nova nota
        </button>

        {/* Menu / Avatar */}
        <LogoMenu 
          darkMode={darkMode} 
          onToggleDarkMode={onToggleDarkMode} 
          
        />

      </div>
    </header>
  );
}

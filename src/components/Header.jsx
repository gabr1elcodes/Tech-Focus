import { Bell, Plus } from "lucide-react";
import LogoMenu from "./LogoMenu";

export default function Header({ onCreateNote, onToggleDarkMode, darkMode, user, setUser, onOpenProfile }) {
  return (
    <header className="min-h-[56px] sm:h-16 px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
      <div className="w-6 sm:w-10" />
      <h1 className="hidden sm:block text-xl font-semibold text-gray-800 dark:text-gray-100">
        Concentre-se e produza.
      </h1>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <button onClick={onCreateNote} className="flex items-center gap-1 px-3 py-2 sm:px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
          <Plus className="w-4 h-4 sm:hidden" />
          <span className="hidden sm:inline">Nova nota</span>
        </button>

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

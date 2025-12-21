import logo from "../assets/techfocusLogo.png";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
  {/* Topo: Logo + título */}
  <div className="p-6 font-semibold flex justify-center">
    <h1 className="flex items-center gap-2 relative -top-2 text-2xl">
      <img src={logo} alt="Logo" className="w-8 h-8" />
      Tech Focus
    </h1>
  </div>

  {/* Linha separadora */}
  <hr className="border-0 h-px bg-gray-700 relative bottom-4 w-full" />

  {/* Menu */}
  <nav className="flex flex-col mt-4 flex-1">
    <button className="flex items-center gap-2 px-6 py-3 hover:bg-gray-800 transition-colors">
      <i className="bx bx-briefcase text-xl"></i> {/* Ícone Projetos */}
      Projetos
    </button>
    <button className="flex items-center gap-2 px-6 py-3 hover:bg-gray-800 transition-colors mt-2">
      <i className="bx bx-help-circle text-xl"></i> {/* Ícone Ajuda */}
      Ajuda
    </button>
    <button className="flex items-center gap-2 px-6 py-3 hover:bg-gray-800 transition-colors mt-2">
      <i className="bx bx-comment-detail text-xl"></i> {/* Ícone Feedback */}
      Feedback
    </button>
    <button className="flex items-center gap-2 px-6 py-3 hover:bg-gray-800 transition-colors mt-2">
      <i className="bx bx-cog text-xl"></i> {/* Ícone Configurações */}
      Configurações
    </button>
  </nav>

  {/* Footer */}
    <div className="mt-auto p-6 text-gray-400 text-sm text-center">
     © 2025 Tech Focus
    </div>
</aside>


  );
}
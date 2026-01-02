import logo from "../../assets/techfocusLogo.png";
import Projetos from "./Projetos";
import Ajuda from "./Ajuda";
import Feedback from "./Feedback";
import Configuracoes from "./Configuracoes";


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
    <Projetos />
    <Ajuda />
    <Feedback />
    <Configuracoes />
  </nav>

  {/* Footer */}
    <div className="mt-auto p-6 text-gray-400 text-sm text-center">
     © 2025 Tech Focus
    </div>
</aside>


  );
}
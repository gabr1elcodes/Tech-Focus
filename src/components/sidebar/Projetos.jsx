import { useState } from "react";
import { Folder, X, Star, Plus } from "lucide-react";

export default function Projetos() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
    <button
        onClick={() => setModalAberto(true)}
        className="
            w-full flex items-center gap-3
            px-6 py-3
            text-left
            rounded-md
            hover:bg-gray-800
            transition-colors
            "
        >
        <i className="bx bx-folder text-lg"></i>
        <span>Projetos</span>
    </button>


      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalAberto(false)}
          />

          {/* Conteúdo do modal */}
          <div className="relative z-50 w-full max-w-md bg-gray-900 text-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Projetos</h2>
              <button onClick={() => setModalAberto(false)}>
                <X />
              </button>
            </div>

            {/* Ações */}
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800">
                <Folder size={16} />
                Todos os projetos
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800">
                <Plus size={16} />
                Criar projeto
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800">
                <Star size={16} />
                Favoritos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

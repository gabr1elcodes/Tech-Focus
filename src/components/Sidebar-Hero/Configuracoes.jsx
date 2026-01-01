import { useState } from "react";

export default function Configuracoes() {
  const [open, setOpen] = useState(false);
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [denseMode, setDenseMode] = useState(false);
  const [language, setLanguage] = useState("pt");
  const [toast, setToast] = useState(false); // novo estado para toast

  const salvarPreferencias = () => {
    // Aqui você poderia salvar em localStorage ou API
    setToast(true); // mostrar toast

    // Esconder toast e fechar modal depois de 1.5s
    setTimeout(() => {
      setToast(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <>
      {/* Botão da Sidebar */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-6 py-3 hover:bg-gray-800 transition-colors mt-2 w-full text-left"
      >
        <i className="bx bx-cog text-lg"></i>
        Configurações
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* Conteúdo */}
          <div className="relative z-10 w-[460px] rounded-xl bg-gray-900 text-white p-6 shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Configurações do App</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Seções */}
            <div className="space-y-6">
              {/* Layout */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">
                  Layout
                </h3>

                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <span>Sidebar compacta</span>
                  <button
                    onClick={() => setCompactSidebar(!compactSidebar)}
                    className={`px-3 py-1 rounded-md text-sm transition ${
                      compactSidebar
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {compactSidebar ? "Ativado" : "Desativado"}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg mt-3">
                  <span>Densidade da interface</span>
                  <button
                    onClick={() => setDenseMode(!denseMode)}
                    className={`px-3 py-1 rounded-md text-sm transition ${
                      denseMode
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {denseMode ? "Compacta" : "Confortável"}
                  </button>
                </div>
              </div>

              {/* Idioma */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">
                  Idioma da Interface
                </h3>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="pt">Português (Brasil)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>

              {/* Produtividade */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">
                  Produtividade
                </h3>

                <div className="bg-gray-800 p-3 rounded-lg flex items-center justify-between">
                  <span>Atalhos avançados</span>
                  <span className="text-xs text-gray-400">
                    Em breve
                  </span>
                </div>
              </div>

              {/* Ações */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={salvarPreferencias}
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium"
                >
                  Salvar preferências
                </button>

                <button className="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-sm text-gray-300">
                  Restaurar padrões do app
                </button>
              </div>
            </div>
          </div>

          {/* Toast */}
          {toast && (
            <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-up">
              Preferências salvas com sucesso!
            </div>
          )}
        </div>
      )}
    </>
  );
}

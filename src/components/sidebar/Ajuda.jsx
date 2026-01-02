import { useState } from "react";

export default function Ajuda() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-6 py-3 hover:bg-gray-800 transition-colors mt-2 w-full text-left"
      >
        <i className="bx bx-help-circle text-xl"></i>
        Ajuda
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-[420px] rounded-xl bg-gray-900 text-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Ajuda & Suporte</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer">
                📘 Central de Ajuda
              </div>
              <div className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer">
                💬 Falar com o Suporte
              </div>
              <div className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer">
                ❓ Perguntas Frequentes
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

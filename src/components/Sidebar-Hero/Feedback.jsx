import { useState } from "react";

export default function Feedback() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão da Sidebar */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-6 py-3 hover:bg-gray-800 transition-colors mt-2 w-full text-left"
      >
        <i className="bx bx-comment-detail text-xl"></i>
        Feedback
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
          <div className="relative z-10 w-[420px] rounded-xl bg-gray-900 text-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Enviar Feedback</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <textarea
                placeholder="Conte pra gente sua ideia, sugestão ou problema..."
                className="w-full h-28 p-3 rounded-lg bg-gray-800 text-white outline-none resize-none"
              />

              <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition">
                Enviar Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

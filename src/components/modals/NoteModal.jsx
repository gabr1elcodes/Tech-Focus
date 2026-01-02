import { useState, useEffect } from "react";

export function NoteModal({ isOpen, onClose, note, onSave }) {
  if (!isOpen || !note) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [listItems, setListItems] = useState([]);
  const [focusContent, setFocusContent] = useState(false);

  useEffect(() => {
    setContent(note.content || "");
    setListItems(note.list || []);
    setIsEditing(false);
    setFocusContent(false);
  }, [note]);

  function addItem() {
    setListItems(prev => [...prev, { id: Date.now(), text: "" }]);
  }

  function updateItem(id, value) {
    setListItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, text: value } : item
      )
    );
  }

  function removeItem(id) {
    setListItems(prev => prev.filter(item => item.id !== id));
  }

  function handleSave() {
    const updatedNote = {
      ...note,
      content,
      list: listItems,
    };
    onSave(updatedNote);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="
          w-full
          max-w-6xl
          max-h-[94vh]
          bg-white dark:bg-gray-900
          rounded-2xl sm:rounded-3xl
          shadow-2xl
          p-4 sm:p-8
          mx-2 sm:mx-0
          flex flex-col"
      >

        {/* HEADER */}
        <header className="flex justify-between items-center pb-3">
          {focusContent ? (
            <button
              onClick={() => setFocusContent(false)}
              className="text-sm flex items-center gap-2 text-blue-600 hover:underline"
            >
              ⬅ Voltar
            </button>
          ) : (
            <div>
              <h2 className="text-lg sm:text-2xl font-semibold flex items-center gap-2">
                📝 {note.title}
              </h2>
              <p className="text-sm text-gray-500">
                TechFocus • sua nota organizada
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 overflow-y-auto pr-0 sm:pr-2">
          {focusContent ? (
            /* CONTEÚDO EM DESTAQUE */
            <section className="h-full rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 px-6 py-4">
              
              {/* TÍTULO MAIS COMPACTO */}
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2 text-gray-500">
                ✍️ Conteúdo em destaque
              </h3>

              {isEditing ? (
                <textarea
                  autoFocus
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  placeholder="Escreva livremente aqui…"
                  className="
                    w-full h-[50vh] sm:h-[72vh]
                    bg-transparent resize-none outline-none
                    text-gray-800 dark:text-gray-200
                    leading-relaxed text-base
                  "
                />
              ) : (
                <div
                  onClick={() => setIsEditing(true)}
                  className="
                    cursor-text rounded-xl p-4
                    text-gray-700 dark:text-gray-300
                    hover:bg-black/5 dark:hover:bg-white/5
                    transition whitespace-pre-wrap
                    min-h-[50vh] sm:min-h-[72vh] text-base"
                >
                  {content.trim() || (
                    <span className="text-gray-400 italic">
                      Clique para começar a escrever…
                    </span>
                  )}
                </div>
              )}
            </section>
          ) : (
            <>
              {/* CONTEÚDO NORMAL */}
              <section className="rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    📄 Conteúdo
                  </h3>

                  <button
                    onClick={() => setFocusContent(true)}
                    className="
                      text-xs sm:text-sm
                      px-3 py-1.5 sm:py-1 rounded-full
                      bg-blue-100 text-blue-700
                      hover:bg-blue-200 transition
                    "
                  >
                    Abrir em destaque
                  </button>
                </div>

                <p className="text-sm text-gray-400 italic">
                  Abra para editar com foco total ✨
                </p>
              </section>

              {/* LISTA */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium flex items-center gap-2">
                    📋 Lista rápida
                  </h3>

                  <button
                    onClick={addItem}
                    className="
                      text-sm px-3 py-1.5 rounded-lg
                      bg-gray-100 dark:bg-gray-800
                      hover:bg-gray-200 dark:hover:bg-gray-700
                      transition
                    "
                  >
                    + Adicionar
                  </button>
                </div>

                {listItems.length === 0 && (
                  <p className="text-sm text-gray-400 italic">
                    Clique em “Adicionar” para criar sua lista ✨
                  </p>
                )}

                {listItems.map(item => (
                  <div
                    key={item.id}
                    className="
                      flex items-center gap-3
                      bg-white dark:bg-gray-800
                      border border-gray-200 dark:border-gray-700
                      rounded-xl px-4 py-2
                    "
                  >
                    <span className="text-gray-400">•</span>

                    <input
                      value={item.text}
                      onChange={e => updateItem(item.id, e.target.value)}
                      placeholder="Digite algo..."
                      className="flex-1 bg-transparent outline-none text-sm"
                    />

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </section>
            </>
          )}
        </div>

        {/* FRASE MOTIVACIONAL (APENAS NA HOME) */}
        {!focusContent && (
          <div className="mt-8 mb-4 flex justify-center">
            <p
              className="
                text-sm font-medium
                bg-gradient-to-r
                from-blue-500 via-purple-500 to-pink-500
                bg-clip-text text-transparent
                text-gradient-animate
                select-none
              "
            >
              💪 Disciplina hoje, conquistas amanhã — avance um passo de cada vez!

            </p>
          </div>
        )}

        {/* FOOTER */}
        <footer className="
            flex flex-col sm:flex-row
            gap-3 sm:gap-0
            justify-between sm:items-center
            pt-4 border-t dark:border-gray-700">
          <span className="text-xs text-gray-400">
            TechFocus • 2026
          </span>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="
                px-4 py-2 text-sm rounded-lg
                bg-gray-100 dark:bg-gray-800
                hover:bg-gray-200 dark:hover:bg-gray-700 transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              className="
                px-4 py-2 text-sm rounded-lg
                bg-blue-600 text-white
                hover:bg-blue-700 transition
              "
            >
              💾 Salvar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

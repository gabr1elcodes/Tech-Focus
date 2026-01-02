import { useState } from "react";

const DESCRIPTION_LIMIT = 400;

const EMOJIS = [
  "📝","📋","📊","📈","⏳","🚀","🎯",
  "💡","🧠","💻","🐛","⚙️","🔍","🧪",
  "📂","🗂","🗓","🔖","⭐","🧾",
  "✨","🎨","📖","🎵",
  "✅","⏸","❌","🔥", "📚", "⚠️"
];

export default function EditNoteModal({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || "");
  const [description, setDescription] = useState(note?.content || "");
  const [emojiOpen, setEmojiOpen] = useState(false);

  function handleSelectEmoji(emoji) {
    const titleWithoutEmoji = title.replace(/^[^\w\s]+ /, "");
    setTitle(`${emoji} ${titleWithoutEmoji}`);
    setEmojiOpen(false);
  }

  function handleSave() {
    onSave(note.id, title, description);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Editar card
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Título
            </label>

            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 pr-10 rounded-lg
                bg-gray-100 dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setEmojiOpen(!emojiOpen)}
              className="absolute right-2 top-9 text-lg"
            >
              🏷️
            </button>

            {emojiOpen && (
              <div className="absolute z-50 mt-2 grid grid-cols-6 gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border">
                {EMOJIS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleSelectEmoji(emoji)}
                    className="text-xl hover:scale-125 transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <textarea
              value={description}
              onChange={e => {
                if (e.target.value.length <= DESCRIPTION_LIMIT) {
                  setDescription(e.target.value);
                }
              }}
              rows={5}
              className="mt-1 w-full px-3 py-2 rounded-lg
                bg-gray-100 dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva sua nota..."
            />

            <div className="mt-1 text-right text-xs">
              {description.length} / {DESCRIPTION_LIMIT}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 text-sm rounded-lg
              bg-gray-200 dark:bg-gray-700"
          >
            Cancelar
          </button>

          <button
            disabled={!description.trim()}
            onClick={handleSave}
            className="flex-1 px-3 py-2 text-sm rounded-lg
              bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

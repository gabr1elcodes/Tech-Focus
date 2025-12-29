import { useState } from "react";

const EMOJIS = [
  "📝","📋","📊","📈","⏳","🚀","🎯",
  "💡","🧠","💻","🐛","⚙️","🔍","🧪",
  "📂","🗂","🗓","🔖","⭐","🧾",
  "✨","🎨","📖","🎵",
  "✅","⏸","❌","🔥", "📚", "⚠️"
];

export default function CreateNoteModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);

  function handleCreate() {
    onCreate({
      id: Date.now(),
      title,
      content,
      cardDescription,
    });
  }

  function handleSelectEmoji(emoji) {
    const titleWithoutEmoji = title.replace(/^[^\w\s]+ /, "");
    setTitle(`${emoji} ${titleWithoutEmoji}`);
    setEmojiOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold mb-4">
          Nova nota
        </h2>

        <div className="space-y-4">
          {/* Título com Emoji */}
          <div className="relative">
            <input
              placeholder="Ex: Projeto X, Ideias para startup, Plano de estudos…"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 pr-10 rounded-lg bg-gray-100 dark:bg-gray-800"
            />

            <button
              type="button"
              onClick={() => setEmojiOpen(!emojiOpen)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-lg hover:scale-110 transition"
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

          <textarea
            placeholder="Descrição do Card"
            value={cardDescription}
            onChange={e => setCardDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          />

          <textarea
            placeholder="O que você quer registrar? Ideias, links, checklist…"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          />
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleCreate}
            className="flex-1 px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}

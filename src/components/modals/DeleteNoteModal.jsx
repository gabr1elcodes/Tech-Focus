export default function DeleteNoteModal({ note, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        onClick={onCancel}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-sm mx-4
                max-h-[90vh] overflow-y-auto
                bg-white dark:bg-gray-900
                rounded-xl shadow-xl p-6">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Excluir nota
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Tem certeza que deseja excluir <strong>{note.title}</strong>?
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-3 py-2 text-sm rounded-lg
                       bg-gray-200 dark:bg-gray-700 flex-col sm:flex-row
                       text-gray-800 dark:text-white"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 px-3 py-2 text-sm rounded-lg flex-col sm:flex-row
                       bg-red-600 text-white hover:bg-red-700 transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

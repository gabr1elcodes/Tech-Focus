export default function NoteCard({ note, onOpen, onEdit, onDelete }) {
  return (
    <div
      className="
        bg-white dark:bg-gray-800
        rounded-xl
        border border-gray-200 dark:border-gray-700
        shadow-sm
        p-4 sm:p-5
        flex flex-col justify-between
        transition-all duration-200
        cursor-pointer
        sm:hover:shadow-lg
        sm:hover:scale-105
        sm:hover:border-blue-300
      "
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {note.title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 line-clamp-3">
          {note.content}
        </p>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          onClick={onOpen}
          className="
            w-full sm:flex-1
            px-3 py-3 sm:py-2
            text-sm rounded-lg
            bg-blue-600 text-white
            hover:bg-blue-700 transition
          "
        >
          Abrir nota
        </button>

        <button
          onClick={() => onEdit(note)}
          className="
            w-full sm:w-auto
            px-3 py-3 sm:py-2
            text-sm rounded-lg
            bg-gray-100 dark:bg-gray-800
            text-gray-800 dark:text-gray-100
            border border-gray-300 dark:border-gray-700
            shadow-sm
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition
          "
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(note)}
          className="
            w-full sm:w-auto
            px-3 py-3 sm:py-2
            text-sm rounded-lg
            text-red-600 dark:text-red-400
            bg-transparent
            border border-gray-300 dark:border-gray-700
            shadow-sm
            hover:bg-red-100 dark:hover:bg-gray-700
            transition
          "
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

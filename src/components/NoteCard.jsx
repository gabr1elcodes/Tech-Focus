import { useState } from "react";

export default function NoteCard({ note, onOpen, onEdit, onDelete }) {

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.content);


  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl border border border-gray-200
                 dark:border-gray-700 shadow-sm p-5 flex flex-col justify-between
                 hover:shadow-lg hover:scale-105 hover:border-blue-300
                 transition-all duration-200 cursor-pointer">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {note.title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 line-clamp-3">
          {note.cardDescription || note.content}
        </p>

      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onOpen}
          className="flex-1 px-3 py-2 
          text-sm rounded-lg bg-blue-600 text-white 
          hover:bg-blue-700 transition"
        >
          Abrir nota
        </button>

        <button
          onClick={() => onEdit(note)}
          className="
          px-3 py-2 text-sm rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          shadow-sm
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition"
        >
          Editar
        </button>



        <button
          onClick={() => onDelete(note)}
          className="
            px-3 py-2 text-sm rounded-lg
            text-red-600 dark:text-red-400
            bg-transparent
            border border-gray-300 dark:border-gray-700
            shadow-sm
            hover:bg-red-100 dark:hover:bg-gray-700
            transition"
        >
          Excluir
        </button>

      </div>
    </div>
  );
}

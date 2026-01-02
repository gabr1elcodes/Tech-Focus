import { useState, useEffect } from "react";
import { getNotes, saveNotes } from "../utils/storage";
import Header from "../components/common/Header";
import Sidebar from "../components/sidebar/Sidebar";
import NoteCard from "../components/modals/NoteCard";
import EmptyState from "../components/common/EmptyState";
import { NoteModal } from "../components/modals/NoteModal";
import EditNoteModal from "../components/modals/EditNoteModal";
import DeleteNoteModal from "../components/modals/DeleteNoteModal";
import CreateNoteModal from "../components/modals/CreateNoteModal";
import ProfileModal from "../components/modals/ProfileModal";
import { useNotificacoes } from "../components/contexts/NotificationContext";

const defaultNotes = [
  { id: 1, title: "Plano de Estudos 📚", content: "Essa é uma nota de exemplo. Você pode editar ou excluir quando quiser." },
  { id: 2, title: "Ideias de Projetos 💡", content: "Use o botão 'Nova nota' para criar algo do zero." },
  { id: 3, title: "Organização ", content: "Crie notas para estudos, ideias ou tarefas." },
  { id: 4, title: "Produtividade", content: "Mantenha suas anotações simples e objetivas." },
  { id: 5, title: "Tarefas do Dia ✅", content: "Em breve você poderá usar atalhos de teclado." },
  { id: 6, title: "Referências Úteis 🔗", content: "Estamos preparando um modo escuro pra você." },
  { id: 7, title: "Metas Semanais 🎯", content: "Defina objetivos claros para cada semana." },
  { id: 8, title: "Inspiração Diária ✨", content: "Anote frases, ideias ou insights que te motivam." },
  { id: 9, title: "Recursos e Links 🌐", content: "Colecione links, artigos e ferramentas úteis para seus estudos e projetos." }
];

export default function Dashboard() {
  const { adicionarNotificacao } = useNotificacoes();
  const [notes, setNotes] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("techfocus_user");
    return stored ? JSON.parse(stored) : {
      avatar: "",
      name: "Gabriel Oliveira",
      bio: "Desenvolvedor web",
      email: "gabriel@email.com",
      notes: 12
    };
  });

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const storedNotes = getNotes();
    if (!storedNotes || storedNotes.length === 0) {
      saveNotes(defaultNotes);
      setNotes(defaultNotes);
    } else {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function handleOpenNote(note) {
    setSelectedNote(note);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedNote(null);
  }

  function handleSaveNote(updatedNote) {
    const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);

    adicionarNotificacao("alterado", updatedNote.title);
  }

  function handleEditNote(note) {
    setEditingNote(note);
  }

  function handleSaveEdit(id, title, description) {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, title, content: description } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);

    adicionarNotificacao("alterado", title);

    setEditingNote(null);
  }


  function handleDeleteNote(note) {
    setDeletingNote(note);
  }

  function confirmDelete(id) {
    const nota = notes.find(n => n.id === id);
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);

    adicionarNotificacao("excluído", nota.title);

    setDeletingNote(null);
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <aside className="hidden md:block"><Sidebar /></aside>
      <div className="flex-1 flex flex-col">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(prev => !prev)}
          onCreateNote={() => setIsCreatingNote(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          user={user}
          setUser={setUser}
        />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {showWelcome && (
            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between transition-colors">
              <p className="text-blue-700 dark:text-blue-300 font-medium">Bem-vindo ao <span className="font-bold">TechFocus</span> 👋</p>
              <button onClick={() => setShowWelcome(false)} className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Fechar</button>
            </div>
          )}

          {notes.length === 0 ? <EmptyState /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {notes.map(note => (
                <NoteCard key={note.id} note={note} onOpen={() => handleOpenNote(note)} onEdit={() => handleEditNote(note)} onDelete={handleDeleteNote} />
              ))}
            </div>
          )}
        </main>
      </div>

      <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} note={selectedNote} onSave={handleSaveNote} />
      {editingNote && <EditNoteModal note={editingNote} onClose={() => setEditingNote(null)} onSave={handleSaveEdit} />}
      {deletingNote && <DeleteNoteModal note={deletingNote} onCancel={() => setDeletingNote(null)} onConfirm={() => confirmDelete(deletingNote.id)} />}
      {isCreatingNote && (
        <CreateNoteModal
          onClose={() => setIsCreatingNote(false)}
          onCreate={newNote => {
            const updatedNotes = [newNote, ...notes];
            setNotes(updatedNotes);
            saveNotes(updatedNotes);
            setIsCreatingNote(false);

            adicionarNotificacao("criado", newNote.title);
          }}
        />
      )}

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} setUser={setUser} />
    </div>
  );
}

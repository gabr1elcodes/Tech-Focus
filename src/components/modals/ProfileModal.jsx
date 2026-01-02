import React, { useState, useEffect } from "react";
import techfocusLogo from "../../assets/techfocusLogo.png";

const ProfileModal = ({ isOpen, onClose, user, setUser }) => {
  if (!isOpen) return null;

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");

  useEffect(() => {
    setName(user.name || "");
    setBio(user.bio || "");
  }, [user]);

  const avatarSrc = user.avatar && user.avatar.trim() !== "" ? user.avatar : techfocusLogo;

  function handleSave() {
    setUser({ ...user, name, bio });
    localStorage.setItem("techfocus_user", JSON.stringify({ ...user, name, bio }));
    onClose();
  }

  function handleRemoveAvatar() {
    setUser(prev => ({ ...prev, avatar: "" }));
  }

  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div onClick={e => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
          </div>

          <div className="flex gap-2 text-sm">
            <label className="cursor-pointer text-blue-600 hover:underline">
              Alterar foto
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setUser(prev => ({ ...prev, avatar: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            {user.avatar && <button onClick={handleRemoveAvatar} className="text-red-500 hover:underline">Remover</button>}
          </div>

          <div className="w-full">
            <label className="text-sm text-gray-600 dark:text-gray-300">Nome / Apelido</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full">
            <label className="text-sm text-gray-600 dark:text-gray-300">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Conte um pouco sobre você…"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 w-full pt-4">
            <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">Cancelar</button>
            <button onClick={handleSave} className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

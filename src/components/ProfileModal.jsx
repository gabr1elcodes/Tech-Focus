import React from "react";
import techfocusLogo from '../assets/techfocusLogo.png';

const ProfileModal = ({ isOpen, onClose, user, setUser }) => {
  if (!isOpen) return null;

  const avatarSrc =
    user.avatar && user.avatar.trim() !== ""
      ? user.avatar
      : techfocusLogo;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center
                 bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white dark:bg-gray-800
          rounded-xl shadow-lg
          p-6
          w-full max-w-sm
          max-h-[90vh] overflow-y-auto
        "
      >
        <div className="flex flex-col items-center space-y-4">
          
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src={avatarSrc}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {user.email}
          </p>

          <div className="flex justify-around w-full mt-4">
            <div className="text-center">
              <span className="font-bold">{user.notes}</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Notas
              </p>
            </div>
          </div>

          {/* Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setUser(prev => ({ ...prev, avatar: reader.result }));
                };
                reader.readAsDataURL(file);
              }
            }}
            className="text-sm"
          />

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Fechar
            </button>
            <button
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Editar Perfil
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

import { createContext, useState, useContext } from "react";

const NotificacaoContext = createContext();

export function NotificacaoProvider({ children }) {
  const [notificacoes, setNotificacoes] = useState([]);

  const adicionarNotificacao = (tipo, nota) => {
    const nova = {
      id: Date.now(),
      tipo,
      notaId: nota.id,
      mensagem: `${tipo === "criado" ? "Nova nota criada" : tipo === "alterado" ? "Nota alterada" : "Nota excluída"}: '${nota.titulo}'`,
      timestamp: new Date().toISOString(),
    };
    setNotificacoes(prev => [nova, ...prev]);
  };

  return (
    <NotificacaoContext.Provider value={{ notificacoes, adicionarNotificacao }}>
      {children}
    </NotificacaoContext.Provider>
  );
}

export const useNotificacoes = () => useContext(NotificacaoContext);

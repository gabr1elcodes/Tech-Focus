import { createContext, useState, useContext } from "react";

const NotificacaoContext = createContext();

export function NotificacaoProvider({ children }) {
  const [notificacoes, setNotificacoes] = useState([]);

  const adicionarNotificacao = (tipo, titulo) => {
    const notificacoesAtivas = localStorage.getItem("notificacoes_ativas");


    if (notificacoesAtivas === "false") return;

    const mensagens = {
      criado: `Nota criada: ${titulo}`,
      alterado: `Nota atualizada: ${titulo}`,
      excluído: `Nota excluída: ${titulo}`,
    };

    const nova = {
      id: Date.now(),
      tipo,
      mensagem: mensagens[tipo] || titulo,
      timestamp: new Date().toISOString(),
    };

    setNotificacoes(prev => [nova, ...prev]);
  };

  const removerNotificacao = (id) => {
    setNotificacoes(prev =>
      prev.filter(notificacao => notificacao.id !== id)
    );
  };

  const limparNotificacoes = () => {
    setNotificacoes([]);
  };

  return (
    <NotificacaoContext.Provider
      value={{
        notificacoes,
        adicionarNotificacao,
        removerNotificacao,
        limparNotificacoes,
      }}
    >
      {children}
    </NotificacaoContext.Provider>
  );
}

export const useNotificacoes = () => useContext(NotificacaoContext);

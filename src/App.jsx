import AppRoutes from './routes/AppRoutes';
import { NotificacaoProvider } from './components/contexts/NotificationContext';

export default function App() {
  return (
    <NotificacaoProvider>
      <AppRoutes />
    </NotificacaoProvider>
  );
}

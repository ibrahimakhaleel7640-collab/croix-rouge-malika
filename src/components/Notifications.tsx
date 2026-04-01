import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
}

interface NotificationsContextType {
  showNotification: (type: NotificationType, title: string, message: string) => void;
}

const NotificationsContext = React.createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const icons: Record<NotificationType, string> = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };

  const colors: Record<NotificationType, string> = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    info: 'border-l-blue-500',
    warning: 'border-l-amber-500'
  };

  return (
    <NotificationsContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 w-80">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`bg-white rounded-lg shadow-lg p-4 border-l-4 ${colors[n.type]} animate-in slide-in-from-right duration-300`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{icons[n.type]}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{n.title}</div>
                <div className="text-sm text-gray-600 mt-0.5">{n.message}</div>
              </div>
              <button
                onClick={() => removeNotification(n.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = React.useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}

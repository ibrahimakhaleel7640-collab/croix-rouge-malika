import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { NotificationsProvider } from '@/components/Notifications';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { PublicActivities } from '@/pages/PublicActivities';
import { UserDashboard } from '@/pages/UserDashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';
import './App.css';

// Main App Content Component
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { currentUser } = useAuth();

  // Redirect based on user role when logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'super_admin' || currentUser.role === 'admin') {
        if (currentPage === 'login' || currentPage === 'register' || currentPage === 'home') {
          setCurrentPage('admin-dashboard');
        }
      } else {
        if (currentPage === 'login' || currentPage === 'register' || currentPage === 'home') {
          setCurrentPage('user-dashboard');
        }
      }
    }
  }, [currentUser, currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'activities-public':
        return <PublicActivities />;
      case 'user-dashboard':
        return <UserDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

// Root App Component with Providers
function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <AppContent />
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default App;

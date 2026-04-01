import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { roleLabel } from '@/data/db';
import { Home, Calendar, Lock, UserPlus, LogOut, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setMobileMenuOpen(false);
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const getInitials = (user: typeof currentUser) => {
    if (!user) return '';
    return (user.prenom[0] + user.nom[0]).toUpperCase();
  };

  const navItems = !currentUser ? [
    { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Accueil' },
    { id: 'activities-public', icon: <Calendar className="w-5 h-5" />, label: 'Activités' },
    { id: 'login', icon: <Lock className="w-5 h-5" />, label: 'Connexion' },
  ] : [];

  return (
    <>
      <nav className="bg-white border-b-[3px] border-[#CC0000] px-4 md:px-6 h-[70px] flex items-center justify-between sticky top-0 z-40 shadow-[0_2px_20px_rgba(204,0,0,0.12)]">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer"
          onClick={() => handleNavigate('home')}
        >
          <div className="w-9 h-9 md:w-11 md:h-11 bg-[#CC0000] rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold font-serif">
            ✚
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="font-serif font-bold text-[#CC0000] text-sm md:text-base leading-tight">
              Croix-Rouge Malika
            </span>
            <span className="text-[0.6rem] md:text-[0.7rem] text-gray-500 uppercase tracking-wider">
              Communauté Locale · Sénégal
            </span>
          </div>
          <span className="font-serif font-bold text-[#CC0000] text-sm sm:hidden">
            CR Malika
          </span>
        </div>

        {/* Desktop Navigation */}
        {!currentUser ? (
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentPage === item.id ? 'bg-red-50 text-[#CC0000]' : 'hover:bg-red-50 hover:text-[#CC0000]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('register')}
              className="px-5 py-2 bg-[#CC0000] text-white rounded-lg text-sm font-medium hover:bg-[#990000] transition-colors flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              S'inscrire
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigate(currentUser.role === 'super_admin' || currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')}
            >
              <div className="w-9 h-9 bg-[#CC0000] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {getInitials(currentUser)}
              </div>
              <div>
                <div className="text-sm font-medium">{currentUser.prenom} {currentUser.nom}</div>
                <div className="text-xs text-gray-500">{roleLabel(currentUser.role)}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-[#CC0000] transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-[#CC0000] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-white z-30 animate-fade-in">
          <div className="p-4 space-y-2">
            {!currentUser ? (
              <>
                <button
                  onClick={() => handleNavigate('home')}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left ${
                    currentPage === 'home' ? 'bg-[#CC0000] text-white' : 'bg-gray-50 hover:bg-red-50'
                  }`}
                >
                  <Home className="w-6 h-6" />
                  <span className="text-lg font-medium">Accueil</span>
                </button>
                <button
                  onClick={() => handleNavigate('activities-public')}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left ${
                    currentPage === 'activities-public' ? 'bg-[#CC0000] text-white' : 'bg-gray-50 hover:bg-red-50'
                  }`}
                >
                  <Calendar className="w-6 h-6" />
                  <span className="text-lg font-medium">Activités</span>
                </button>
                <button
                  onClick={() => handleNavigate('login')}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left ${
                    currentPage === 'login' ? 'bg-[#CC0000] text-white' : 'bg-gray-50 hover:bg-red-50'
                  }`}
                >
                  <Lock className="w-6 h-6" />
                  <span className="text-lg font-medium">Connexion</span>
                </button>
                <button
                  onClick={() => handleNavigate('register')}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left bg-[#CC0000] text-white"
                >
                  <UserPlus className="w-6 h-6" />
                  <span className="text-lg font-medium">S'inscrire</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-[#CC0000] rounded-full flex items-center justify-center text-white text-lg font-semibold">
                    {getInitials(currentUser)}
                  </div>
                  <div>
                    <div className="font-medium text-lg">{currentUser.prenom} {currentUser.nom}</div>
                    <div className="text-sm text-gray-500">{roleLabel(currentUser.role)}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigate(currentUser.role === 'super_admin' || currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left bg-gray-50 hover:bg-red-50"
                >
                  <LayoutDashboardIcon className="w-6 h-6" />
                  <span className="text-lg font-medium">Mon Espace</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left bg-red-50 text-red-600"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="text-lg font-medium">Déconnexion</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Icon component for dashboard
function LayoutDashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

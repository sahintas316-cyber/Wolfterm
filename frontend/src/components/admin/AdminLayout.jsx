import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Grid3X3, 
  LogOut,
  Menu,
  X,
  Image,
  FileText,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Ürünler' },
    { path: '/admin/reviews', icon: MessageSquare, label: 'Yorumlar' },
    { path: '/admin/categories', icon: Grid3X3, label: 'Kategoriler' },
    { path: '/admin/hero-slides', icon: Image, label: 'Hero Slider' },
    { path: '/admin/catalogs', icon: FileText, label: 'Kataloglar' },
    { path: '/admin/settings', icon: Settings, label: 'Site Ayarları' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Çıkış yapıldı');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_17a22ec5-8e56-4b05-8432-58bb6f63aed4/artifacts/xojo9jlu_wolfterm%20logo.png" 
                alt="WolfTerm" 
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl">Admin Panel</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hoş geldin, {user?.username}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış
            </Button>
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out pt-16 lg:pt-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-red-50 text-red-600 font-semibold' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
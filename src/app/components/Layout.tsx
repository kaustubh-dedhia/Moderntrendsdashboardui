import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  PackagePlus,
  Store,
  Package,
  ShoppingCart,
  Search,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [isBackButtonActive, setIsBackButtonActive] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PackagePlus, label: 'Add Product', path: '/add-product' },
    { icon: Store, label: 'Your Brands', path: '/brands' },
    { icon: Package, label: 'Your Products', path: '/products' },
    { icon: ShoppingCart, label: 'Selling', path: '/selling' },
  ];

  // Check if current page is a main dashboard page
  const isMainPage = navItems.some(item => item.path === location.pathname);
  const shouldShowBackButton = !isMainPage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f9] via-[#ffffff] to-[#f9f6f9]/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#dea94d]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#215b2f]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-[#bab0aa]/20 z-50 shadow-sm">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-[#f9f6f9]/80 rounded-xl transition-all hover:scale-105"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#215b2f] via-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg shadow-[#215b2f]/30">
                <span className="text-white font-bold text-lg">MT</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-[#745b4e] to-[#215b2f] bg-clip-text text-transparent hidden sm:block">Modern Trends</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-[#f9f6f9]/80 rounded-xl transition-all hover:scale-105">
              <Search className="w-5 h-5 text-[#745b4e]" />
            </button>
            <button className="p-2.5 hover:bg-[#f9f6f9]/80 rounded-xl transition-all hover:scale-105 relative">
              <Bell className="w-5 h-5 text-[#745b4e]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-br from-[#dea94d] to-[#d89a3d] rounded-full animate-pulse shadow-lg shadow-[#dea94d]/50"></span>
            </button>
            <button 
              onClick={() => setProfileSidebarOpen(true)}
              className="flex items-center gap-3 pl-3 ml-1 border-l border-[#bab0aa]/30 hover:bg-[#f9f6f9]/50 rounded-xl transition-all duration-200 pr-2 py-1.5 cursor-pointer hover:scale-[1.02]"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#215b2f] via-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#745b4e]">{user?.name}</p>
                <p className="text-xs text-[#bab0aa] font-medium">{user?.role === 'pm' ? 'Product Manager' : 'Admin'}</p>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white/80 backdrop-blur-xl border-r border-[#bab0aa]/20 z-40 transition-transform duration-300 shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#215b2f] to-[#1a4825] text-white shadow-lg shadow-[#215b2f]/30 scale-[1.02]'
                      : 'text-[#745b4e] hover:bg-gradient-to-r hover:from-[#f9f6f9] hover:to-[#f9f6f9]/50 hover:text-[#215b2f] hover:scale-[1.01]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[#745b4e] hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 hover:text-red-600 transition-all mt-4 hover:scale-[1.01] font-semibold"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-2.5 sm:p-3 lg:p-4 animate-fadeIn">
          {/* Back Button */}
          {shouldShowBackButton && (
            <button
              onClick={() => navigate(-1)}
              onMouseDown={() => setIsBackButtonActive(true)}
              onMouseUp={() => setIsBackButtonActive(false)}
              onMouseLeave={() => setIsBackButtonActive(false)}
              className={`flex items-center gap-1.5 px-3 py-2 mb-0.5 rounded-lg border transition-all duration-200 hover:scale-[1.03] hover:shadow-md group w-fit ${
                isBackButtonActive 
                  ? 'bg-[#215b2f] border-[#215b2f] text-white shadow-sm' 
                  : 'bg-white/90 border-[#bab0aa]/30 text-[#745b4e] hover:border-[#215b2f] hover:bg-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:transform group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-semibold text-xs">Back</span>
            </button>
          )}
          <Outlet />
        </div>
      </main>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Profile Sidebar Overlay */}
      {profileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 animate-fadeIn"
          onClick={() => setProfileSidebarOpen(false)}
        />
      )}

      {/* Profile Sidebar */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white/95 backdrop-blur-xl border-l border-[#bab0aa]/20 z-50 shadow-2xl transition-transform duration-300 ${
          profileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Profile Header */}
          <div className="relative overflow-hidden bg-white p-4 pb-5 border-b border-[#bab0aa]/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f9f6f9] rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#f9f6f9]/50 rounded-full -ml-12 -mb-12" />
            
            <div className="relative flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-[#215b2f]">Profile</h2>
              <button
                onClick={() => setProfileSidebarOpen(false)}
                className="p-2 hover:bg-[#f9f6f9] rounded-xl transition-all"
              >
                <X className="w-5 h-5 text-[#745b4e]" />
              </button>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-xl mb-3 border-4 border-[#215b2f]/10">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#745b4e] mb-1">{user?.name}</h3>
              <p className="text-sm text-[#bab0aa] font-medium px-4 py-1.5 rounded-full bg-[#f9f6f9] border border-[#bab0aa]/20">
                {user?.role === 'pm' ? 'Product Manager' : 'Admin'}
              </p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Account Information */}
            <div className="bg-gradient-to-br from-white to-[#f9f6f9] rounded-2xl p-5 border border-[#bab0aa]/20 shadow-md">
              <h4 className="text-sm font-bold text-[#745b4e] mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                Account Information
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#bab0aa] uppercase tracking-wide">Name</label>
                  <p className="text-sm font-semibold text-[#745b4e] mt-1">{user?.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#bab0aa] uppercase tracking-wide">Role</label>
                  <p className="text-sm font-semibold text-[#745b4e] mt-1">
                    {user?.role === 'pm' ? 'Product Manager' : 'Admin'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#bab0aa] uppercase tracking-wide">Email</label>
                  <p className="text-sm font-semibold text-[#745b4e] mt-1">{user?.email || 'email@moderntends.com'}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#dea94d]/10 to-white rounded-2xl p-5 border border-[#dea94d]/20 shadow-md">
              <h4 className="text-sm font-bold text-[#745b4e] mb-4">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-[#bab0aa]/20">
                  <p className="text-2xl font-bold text-[#215b2f]">0</p>
                  <p className="text-xs text-[#bab0aa] font-medium mt-1">Products</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-[#bab0aa]/20">
                  <p className="text-2xl font-bold text-[#215b2f]">0</p>
                  <p className="text-xs text-[#bab0aa] font-medium mt-1">Brands</p>
                </div>
              </div>
            </div>

            {/* Settings Options */}
            <div className="bg-gradient-to-br from-white to-[#f9f6f9] rounded-2xl p-5 border border-[#bab0aa]/20 shadow-md">
              <h4 className="text-sm font-bold text-[#745b4e] mb-3">Settings</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#745b4e] hover:bg-[#f9f6f9] transition-all text-left font-medium hover:scale-[1.01]">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Edit Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#745b4e] hover:bg-[#f9f6f9] transition-all text-left font-medium hover:scale-[1.01]">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Notifications</span>
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t border-[#bab0aa]/20 bg-white/50 backdrop-blur-sm">
            <button
              onClick={() => {
                setProfileSidebarOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
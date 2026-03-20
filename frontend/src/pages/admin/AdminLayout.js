import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { LayoutDashboard, Package, FileText, ShoppingCart, Image, Settings, LogOut, Menu, X, Users, ChevronLeft, Palette } from 'lucide-react';

const NAV = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/content', icon: Palette, label: 'Contenu' },
  { to: '/admin/products', icon: Package, label: 'Produits' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Commandes' },
  { to: '/admin/pages', icon: FileText, label: 'Pages' },
  { to: '/admin/media', icon: Image, label: 'Médias' },
  { to: '/admin/users', icon: Users, label: 'Clients' },
  { to: '/admin/settings', icon: Settings, label: 'Paramètres' },
];

export default function AdminLayout() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin'); };

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">BLC</div>
          <div>
            <p className="text-white font-semibold text-sm">Body Look Care</p>
            <p className="text-gray-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-emerald-600/15 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}>
            <item.icon className="w-[18px] h-[18px]" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-800">
        <NavLink to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-gray-800/50 transition-colors mb-1">
          <ChevronLeft className="w-[18px] h-[18px]" /> Retour au site
        </NavLink>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-gray-800/50 transition-colors w-full" data-testid="admin-logout">
          <LogOut className="w-[18px] h-[18px]" /> Déconnexion
        </button>
        <div className="mt-2 px-3 py-2 text-xs text-gray-600">{admin?.email}</div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#0f1117] text-white" data-testid="admin-layout">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#1a1d27] border-r border-gray-800 flex-shrink-0">
        <SidebarContent />
      </aside>
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-[#1a1d27] z-10">
            <button onClick={() => setSidebarOpen(false)} className="absolute right-3 top-4 text-gray-400"><X className="w-5 h-5" /></button>
            <SidebarContent />
          </aside>
        </div>
      )}
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-[#1a1d27] border-b border-gray-800 flex items-center px-4 gap-3 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400"><Menu className="w-5 h-5" /></button>
          <span className="text-sm text-gray-400">Administration</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

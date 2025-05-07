import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bookmark, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Shield,
  Building2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center px-3 py-2 my-1 rounded-md transition-colors
        ${isActive 
          ? 'bg-blue-900 text-white' 
          : 'text-gray-300 hover:text-white hover:bg-gray-700'}
      `}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  console.log('Current User in Sidebar:', currentUser);
  
  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      to: '/',
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      show: true
    },
    {
      to: '/organizations',
      icon: <Building2 size={20} />,
      label: 'Organizations',
      show: true
    },
    {
      to: '/students',
      icon: <Users size={20} />,
      label: 'Students',
      show: true
    },
    {
      to: '/courses',
      icon: <BookOpen size={20} />,
      label: 'Courses',
      show: true
    },
    {
      to: '/competencies',
      icon: <Bookmark size={20} />,
      label: 'Competencies',
      show: true
    },
    {
      to: '/reports',
      icon: <FileText size={20} />,
      label: 'Reports',
      show: true
    },
    {
      to: '/insurance',
      icon: <Shield size={20} />,
      label: 'Insurance',
      show: true
    },
    {
      to: '/certifications',
      icon: <ShieldCheck size={20} />,
      label: 'Certifications',
      show: true
    },
    {
      to: '/settings',
      icon: <Settings size={20} />,
      label: 'Settings',
      show: true
    }
  ];
  
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col border-r border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-tight">Firearms Training</h1>
        <p className="text-sm text-gray-400 mt-1">Management System</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-3">
        {navItems
          .filter(item => item.show)
          .map((item, index) => (
            <SidebarItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.to)}
            />
          ))
        }
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden">
            {currentUser?.user_metadata?.avatar_url ? (
              <img 
                src={currentUser.user_metadata.avatar_url} 
                alt={currentUser?.user_metadata?.full_name || currentUser?.email}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white">
                {(currentUser?.user_metadata?.full_name || currentUser?.email)?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{currentUser?.user_metadata?.full_name || currentUser?.email}</p>
            <p className="text-xs text-gray-400 capitalize">{currentUser?.user_metadata?.role}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <LogOut size={18} className="mr-2" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
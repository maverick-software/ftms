import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // If not authenticated, render only the children (which should be a login page)
  if (!isAuthenticated) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
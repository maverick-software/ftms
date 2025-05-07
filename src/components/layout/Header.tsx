import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const location = useLocation();
  
  // Generate page title based on the current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    
    // Remove leading slash and capitalize first letter
    return path.substring(1).split('/')[0].charAt(0).toUpperCase() + 
           path.substring(1).split('/')[0].slice(1);
  };
  
  return (
    <header className="bg-gray-900 border-b border-gray-700 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 border border-gray-700 text-white h-9 pl-9 pr-4 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative">
            <button className="text-gray-300 hover:text-white">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>
          </div>
          
          <Button
            variant="primary"
            size="sm"
          >
            New Student
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
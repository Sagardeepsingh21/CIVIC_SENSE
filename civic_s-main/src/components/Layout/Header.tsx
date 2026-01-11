import React from 'react';
import { Menu, Bell, User, MapPin } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  currentView: string;
}

export default function Header({ onMenuClick, currentView }: HeaderProps) {
  const getViewTitle = (view: string) => {
    switch (view) {
      case 'dashboard': return 'Dashboard';
      case 'map': return 'Issue Map';
      case 'report': return 'Report Issue';
      case 'profile': return 'Profile';
      case 'admin': return 'Admin Dashboard';
      default: return 'CivicTrack';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CivicTrack</h1>
                <p className="text-sm text-gray-500 hidden sm:block">{getViewTitle(currentView)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Community Hero</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
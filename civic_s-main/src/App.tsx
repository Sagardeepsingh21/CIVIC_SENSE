import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import IssueMap from './components/Map/IssueMap';
import ReportForm from './components/Report/ReportForm';
import UserProfile from './components/Profile/UserProfile';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <IssueMap />;
      case 'report':
        return <ReportForm />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={() => setSidebarOpen(true)} 
        currentView={currentView}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        
        <main className="flex-1 lg:ml-0">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;
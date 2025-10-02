import React, { useState } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { Dashboard } from './components/Dashboard';
import { RequestsManagement } from './components/RequestsManagement';
import { ProgramConfiguration } from './components/ProgramConfiguration';
import { PriceConfiguration } from './components/PriceConfiguration';
import { UserManagement } from './components/UserManagement';
import { Settings } from './components/Settings';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const pendingRequests = 8; // This would come from real data

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'requests':
        return <RequestsManagement />;
      case 'programs':
        return <ProgramConfiguration />;
      case 'pricing':
        return <PriceConfiguration />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        pendingRequests={pendingRequests}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
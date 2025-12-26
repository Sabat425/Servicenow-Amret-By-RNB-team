import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TicketList from './components/TicketList';
import { MOCK_TICKETS, SIDEBAR_ITEMS } from './constants';

const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('r1');
  const [sidebarItems, setSidebarItems] = useState(SIDEBAR_ITEMS);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSection = (id: string) => {
    setSidebarItems(prev => prev.map(item => 
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} h-screen w-full`}>
      <div className="flex h-screen bg-gray-50 dark:bg-slate-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-amret-200 selection:text-amret-900 transition-colors duration-300">
        
        <Sidebar 
          items={sidebarItems} 
          setItems={setSidebarItems}
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          activeItem={activeSidebarItem}
          setActiveItem={setActiveSidebarItem}
          toggleSection={toggleSection}
        />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-amret-50 to-transparent dark:from-amret-950/30 -z-10 pointer-events-none opacity-60"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-amret-200/20 dark:bg-amret-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

          <main className="flex-1 overflow-y-auto custom-scrollbar relative">
             <div className="max-w-[1600px] mx-auto w-full h-full">
               <TicketList tickets={MOCK_TICKETS} />
             </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
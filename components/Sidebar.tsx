import React from 'react';
import { MenuItem } from '../types';
import { AMRET_LOGO_URL, Icon } from '../constants';
import { Reorder, AnimatePresence, motion } from 'framer-motion';

interface SidebarProps {
  items: MenuItem[];
  setItems: (items: MenuItem[]) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  activeItem: string;
  setActiveItem: (id: string) => void;
  toggleSection: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  setItems, 
  isCollapsed, 
  toggleSidebar, 
  activeItem, 
  setActiveItem, 
  toggleSection 
}) => {
  return (
    <div 
      className={`
        bg-amret-900 dark:bg-black text-white h-screen transition-all duration-300 ease-in-out flex flex-col border-r border-amret-800 dark:border-gray-800 shadow-2xl relative z-20
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-amret-800 dark:border-gray-800 bg-amret-950/50 dark:bg-black/50 backdrop-blur-sm">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 animate-fade-in">
             <img src={AMRET_LOGO_URL} alt="Amret" className="h-8 object-contain" />
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-amret-800 dark:hover:bg-gray-800 text-amret-300 transition-colors"
        >
          <Icon name="menu" />
        </button>
      </div>

      {/* Filter Input */}
      {!isCollapsed && (
        <div className="px-4 py-4 animate-fade-in">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amret-500">
               <Icon name="filter" className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Filter navigation" 
              className="w-full bg-amret-950 dark:bg-gray-900 text-sm text-gray-200 rounded-lg py-2 pl-10 pr-4 border border-amret-800 dark:border-gray-800 focus:outline-none focus:border-amret-600 focus:ring-1 focus:ring-amret-600 transition-all placeholder-amret-700"
            />
          </div>
        </div>
      )}

      {/* Menu Items with Drag & Drop */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar overflow-x-hidden">
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.map((section) => (
            <Reorder.Item key={section.id} value={section} className="mb-2">
                {!isCollapsed && (
                    <div 
                        className="px-4 py-2 text-xs font-semibold text-amret-500 uppercase tracking-wider flex items-center justify-between group cursor-grab active:cursor-grabbing hover:bg-amret-800/20 dark:hover:bg-gray-900/50 rounded mx-2 transition-colors"
                        onClick={() => toggleSection(section.id)}
                    >
                        <div className="flex items-center gap-2">
                             <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amret-600"><Icon name="drag" className="w-3 h-3"/></span>
                             <span className="group-hover:text-amret-300 transition-colors">{section.label}</span>
                        </div>
                        {section.subItems && (
                            <motion.span 
                                animate={{ rotate: section.isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="cursor-pointer"
                            >
                                <Icon name="chevronDown" className="w-3 h-3 text-amret-600 group-hover:text-amret-300 transition-colors" />
                            </motion.span>
                        )}
                    </div>
                )}
                
                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                    {section.isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            {section.subItems?.map((item) => {
                                const isActive = activeItem === item.id;
                                return (
                                <div 
                                    key={item.id}
                                    onClick={() => setActiveItem(item.id)}
                                    className={`
                                    group flex items-center px-4 py-3 cursor-pointer transition-all duration-200 relative overflow-hidden
                                    ${isActive ? 'bg-amret-800/50 dark:bg-gray-800/50' : 'hover:bg-amret-800/30 dark:hover:bg-gray-900'}
                                    `}
                                >
                                    {/* Active Indicator Line */}
                                    {isActive && (
                                    <motion.div layoutId="activeIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-amret-500" />
                                    )}

                                    <span className={`
                                    transition-colors duration-200
                                    ${isActive ? 'text-amret-300' : 'text-gray-400 group-hover:text-white'}
                                    `}>
                                        <Icon name={item.iconName} />
                                    </span>

                                    {!isCollapsed && (
                                    <span className={`ml-3 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                        {item.label}
                                    </span>
                                    )}

                                    {/* Badge */}
                                    {!isCollapsed && item.count && (
                                        <span className="ml-auto bg-amret-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-amret-600/20">
                                            {item.count}
                                        </span>
                                    )}
                                </div>
                                )
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Divider if not last */}
                {!isCollapsed && <div className="mx-4 my-2 border-b border-amret-800/50 dark:border-gray-800" />}
            </Reorder.Item>
            ))}
        </Reorder.Group>
      </div>

       {/* Footer User Profile (Compact) */}
       <div className="p-4 bg-amret-950/80 dark:bg-black border-t border-amret-800 dark:border-gray-800">
         <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amret-500 to-amret-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                IH
            </div>
            {!isCollapsed && (
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">Intern Host</p>
                    <p className="text-xs text-amret-400 truncate">System Admin</p>
                </div>
            )}
         </div>
       </div>
    </div>
  );
};

export default Sidebar;
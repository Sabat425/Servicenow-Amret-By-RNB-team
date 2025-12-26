import React from 'react';
import { Icon } from '../constants';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm transition-all duration-300">
      
      {/* Left: Breadcrumbs / Context */}
      <div className="flex items-center space-x-4 animate-slide-in-right">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
           <span className="bg-amret-100 dark:bg-amret-900/30 text-amret-700 dark:text-amret-400 p-1.5 rounded-md">
             <Icon name="list" className="w-4 h-4" />
           </span>
           <span>Requested Items</span>
        </h2>
        <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700 mx-2"></div>
        <button className="flex items-center space-x-1 text-xs font-medium bg-amret-50 dark:bg-slate-800 text-amret-700 dark:text-amret-300 px-3 py-1 rounded-full border border-amret-200 dark:border-slate-700 hover:bg-amret-100 dark:hover:bg-slate-700 transition-colors">
            <Icon name="star" className="w-3 h-3 fill-amret-600 text-amret-600" />
            <span>Default View</span>
        </button>
      </div>

      {/* Center: Global Search (Supercharged) */}
      <div className="flex-1 max-w-2xl mx-8 hidden md:block">
         <div className="relative group">
            <input 
                type="text" 
                placeholder="Search requests, incidents, or ask AI..." 
                className="w-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-amret-400 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner hover:shadow-md dark:placeholder-gray-500"
            />
            <div className="absolute left-4 top-2.5 text-gray-400 group-focus-within:text-amret-600 transition-colors">
                <Icon name="search" />
            </div>
            <div className="absolute right-2 top-1.5">
                 <button className="bg-white dark:bg-slate-700 p-1 rounded-full shadow-sm text-gray-400 hover:text-amret-600 hover:scale-110 transition-all">
                     <span className="sr-only">Voice Search</span>
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                 </button>
            </div>
         </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-amret-50 dark:hover:bg-slate-800 hover:text-amret-600 dark:hover:text-amret-400 rounded-full transition-all"
        >
          {isDarkMode ? <Icon name="sun" /> : <Icon name="moon" />}
        </button>

        <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-amret-50 dark:hover:bg-slate-800 hover:text-amret-600 dark:hover:text-amret-400 rounded-full transition-all relative">
             <Icon name="bell" />
             <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-amret-50 dark:hover:bg-slate-800 hover:text-amret-600 dark:hover:text-amret-400 rounded-full transition-all">
             <Icon name="settings" />
        </button>
        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>
        <button className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-amret-600 to-amret-500 text-white px-4 py-2 rounded-full shadow-lg shadow-amret-500/30 hover:shadow-amret-500/50 hover:scale-[1.02] active:scale-95 transition-all">
            <span className="font-semibold text-sm">Create New</span>
            <Icon name="chevronDown" className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Ticket } from '../types';
import { Icon, MOCK_MASTER_DATA } from '../constants';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface TicketListProps {
  tickets: Ticket[];
}

const COLORS = ['#589507', '#b7db25', '#396f04', '#0a2004'];

// Helper component for cells with long text
const ExpandableTextCell = ({ text }: { text?: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (!text) return <span className="text-gray-400">-</span>;

    return (
        <div 
            className="group relative cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className={`transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                <span className="whitespace-pre-line">{text}</span>
            </div>
            
            {!isExpanded && (
                <div className="text-[10px] text-amret-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                    Click to expand
                </div>
            )}
            
            {/* Visual indicator for expanded state */}
             {isExpanded && (
                <div className="text-[10px] text-gray-400 mt-2 border-t border-gray-100 pt-1">
                    Show less
                </div>
            )}
        </div>
    );
};

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'list' | 'analytics' | 'master'>('list');

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Critical': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'High': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'Moderate': return 'bg-amret-100 dark:bg-amret-900/30 text-amret-800 dark:text-amret-300 border-amret-200 dark:border-amret-800';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const getStateColor = (s: string) => {
      switch(s) {
          case 'Open': return 'text-amret-600 dark:text-amret-400 bg-amret-50 dark:bg-amret-900/20 ring-amret-500/20';
          case 'Work in Progress': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 ring-blue-500/20';
          case 'Closed Complete': return 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 ring-gray-500/20 decoration-slice';
          default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 ring-gray-500/20';
      }
  };

  // Chart Data preparation
  const statusData = [
    { name: 'Open', value: tickets.filter(t => t.state === 'Open').length },
    { name: 'WIP', value: tickets.filter(t => t.state === 'Work in Progress').length },
    { name: 'Closed', value: tickets.filter(t => t.state === 'Closed Complete').length },
    { name: 'Pending', value: tickets.filter(t => t.state === 'Pending').length },
  ];

  const renderMasterTable = () => (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 flex-1 flex flex-col overflow-hidden animate-fade-in h-full">
        {/* Table Toolbar */}
        <div className="p-2 border-b border-gray-200 dark:border-gray-800 flex items-center bg-gray-50 dark:bg-slate-800 space-x-2 shrink-0">
           <button className="text-gray-500 hover:text-amret-600"><Icon name="menu" className="w-4 h-4" /></button>
           <button className="text-gray-500 hover:text-amret-600"><Icon name="filter" className="w-4 h-4" /></button>
           <div className="flex items-center bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm h-8 px-2">
               <span className="text-xs text-gray-600 dark:text-gray-300 font-medium mr-2 whitespace-nowrap">category sub category data</span>
               <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-700 mx-1"></div>
               <select className="bg-transparent border-none text-xs font-bold text-gray-800 dark:text-gray-100 focus:ring-0 cursor-pointer">
                   <option>change</option>
                   <option>incident</option>
               </select>
           </div>
           <input type="text" placeholder="Search" className="h-8 border border-gray-300 dark:border-gray-700 rounded-md px-3 text-xs w-64 bg-white dark:bg-slate-900" />
           <div className="flex-1"></div>
           <button className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded shadow-sm flex items-center">
               Actions on selected rows... <Icon name="chevronDown" className="w-3 h-3 ml-2" />
           </button>
        </div>

        {/* Master Table Content - Critical Fix: flex-1 and overflow-auto here ensures scrollbar is attached to this div, not the window */}
        <div className="overflow-auto flex-1 relative custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[2000px]">
                <thead className="bg-gray-100 dark:bg-slate-800 sticky top-0 z-30 shadow-sm">
                    <tr>
                        {/* Sticky Checkbox Column */}
                        <th className="p-2 border-b border-gray-200 dark:border-gray-700 w-10 sticky left-0 z-40 bg-gray-100 dark:bg-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                            <input type="checkbox" className="rounded border-gray-400" />
                        </th>
                        
                        {/* Sticky Service Column */}
                         <th className="p-2 border-b border-gray-200 dark:border-gray-700 w-48 sticky left-10 z-40 bg-gray-100 dark:bg-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] font-semibold text-xs text-gray-700 dark:text-gray-200">
                             <div className="flex flex-col gap-1">
                                    <span>Service</span>
                                    <input type="text" placeholder="Search" className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs font-normal" />
                            </div>
                        </th>

                        {['Category', 'Sub Category', 'Steps', 'Expected Result', 'Remarks', 'Issue Type', 'Impact', 'Urgency', 'Department', 'Division', 'Inc_end'].map((header) => (
                            <th key={header} className="p-2 border-b border-gray-200 dark:border-gray-700 font-semibold text-xs text-gray-700 dark:text-gray-200 min-w-[150px]">
                                <div className="flex flex-col gap-1">
                                    <span>{header}</span>
                                    <input type="text" placeholder="Search" className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs font-normal" />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {MOCK_MASTER_DATA.map((row, i) => (
                        <tr key={row.id} className="hover:bg-amret-50 dark:hover:bg-slate-800/50 group text-xs text-gray-700 dark:text-gray-300 transition-colors">
                             {/* Sticky Checkbox Cell */}
                             <td className="p-2 text-center sticky left-0 z-20 bg-white dark:bg-slate-900 group-hover:bg-amret-50 dark:group-hover:bg-slate-800/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-b border-gray-100 dark:border-gray-800">
                                <input type="checkbox" className="rounded border-gray-300" />
                             </td>
                             
                             {/* Sticky Service Cell */}
                             <td className="p-2 text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer sticky left-10 z-20 bg-white dark:bg-slate-900 group-hover:bg-amret-50 dark:group-hover:bg-slate-800/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-b border-gray-100 dark:border-gray-800 align-top">
                                {row.service}
                             </td>

                             <td className="p-2 align-top">{row.category}</td>
                             <td className="p-2 align-top">{row.subCategory}</td>
                             
                             {/* Steps - Expandable Cell */}
                             <td className="p-2 min-w-[250px] align-top bg-orange-50/30 dark:bg-orange-900/10">
                                <ExpandableTextCell text={row.steps} />
                             </td>
                             
                             {/* Expected Result - Expandable Cell */}
                             <td className="p-2 min-w-[200px] align-top bg-blue-50/30 dark:bg-blue-900/10">
                                <ExpandableTextCell text={row.expectedResult} />
                             </td>

                             <td className="p-2 align-top">{row.remarks || '-'}</td>
                             <td className="p-2 align-top">{row.issueType}</td>
                             <td className="p-2 align-top">{row.impact}</td>
                             <td className="p-2 align-top">{row.urgency}</td>
                             <td className="p-2 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer align-top">{row.department}</td>
                             <td className="p-2 align-top">{row.division}</td>
                             <td className="p-2 align-top">{row.incEnd}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
                <span className="mr-2">1 to {MOCK_MASTER_DATA.length} of 16,725</span>
                <button className="hover:bg-gray-200 dark:hover:bg-slate-700 p-1 rounded"><Icon name="chevronRight" className="w-3 h-3 rotate-180" /></button>
                <button className="hover:bg-gray-200 dark:hover:bg-slate-700 p-1 rounded"><Icon name="chevronRight" className="w-3 h-3" /></button>
            </div>
            <div className="flex items-center text-gray-400">
                 <Icon name="activity" className="w-3 h-3 mr-1" /> <span>0.2s</span>
            </div>
        </div>
    </div>
  );

  return (
    <div className="p-6 h-full flex flex-col overflow-hidden">
        {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 animate-slide-up shrink-0">
        <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
             <button 
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'list' ? 'bg-amret-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
             >
                 List View
             </button>
             <button 
                onClick={() => setView('analytics')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'analytics' ? 'bg-amret-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
             >
                 Analytics
             </button>
             <button 
                onClick={() => setView('master')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'master' ? 'bg-amret-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
             >
                 SN Master Table
             </button>
        </div>

        {view !== 'master' && (
        <div className="flex items-center space-x-3">
             <div className="relative">
                 <select className="appearance-none bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 pl-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-amret-500 focus:ring-1 focus:ring-amret-500 text-sm shadow-sm">
                     <option>Number</option>
                     <option>Item</option>
                     <option>Priority</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                    <Icon name="chevronDown" className="w-3 h-3" />
                 </div>
             </div>
             <input type="text" placeholder="Quick filter..." className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-amret-500 focus:ring-1 focus:ring-amret-500 shadow-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600" />
             <button className="p-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-amret-600 hover:border-amret-600 transition-colors shadow-sm">
                 <Icon name="refresh" className="w-4 h-4" />
             </button>
        </div>
        )}
      </div>

      {view === 'master' ? renderMasterTable() : view === 'analytics' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in overflow-y-auto">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-80">
                  <h3 className="text-lg font-bold text-amret-900 dark:text-amret-100 mb-4">Requests by Status</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                    </PieChart>
                  </ResponsiveContainer>
              </div>
               <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-80">
                  <h3 className="text-lg font-bold text-amret-900 dark:text-amret-100 mb-4">Requests Volume</h3>
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={statusData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                        <XAxis dataKey="name" tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                        <Bar dataKey="value" fill="#589507" radius={[4, 4, 0, 0]} barSize={40} />
                     </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden flex-1 animate-fade-in flex flex-col">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider">
                    <th className="p-4 w-12 text-center">
                        <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-amret-600 focus:ring-amret-500 bg-white dark:bg-slate-800" />
                    </th>
                    <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors group">
                        <div className="flex items-center">Number <Icon name="chevronDown" className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50" /></div>
                    </th>
                    <th className="p-4">Item</th>
                    <th className="p-4">Opened</th>
                    <th className="p-4">Opened By</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">State</th>
                    <th className="p-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {tickets.map((ticket, index) => (
                <tr 
                    key={ticket.id} 
                    className={`
                        group hover:bg-amret-50/30 dark:hover:bg-amret-900/10 transition-all duration-200 cursor-pointer
                        ${selectedIds.has(ticket.id) ? 'bg-amret-50/80 dark:bg-amret-900/20' : ''}
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => toggleSelect(ticket.id)}
                >
                    <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input 
                            type="checkbox" 
                            checked={selectedIds.has(ticket.id)}
                            onChange={() => toggleSelect(ticket.id)}
                            className="rounded border-gray-300 dark:border-gray-600 text-amret-600 focus:ring-amret-500 cursor-pointer bg-white dark:bg-slate-800" 
                        />
                    </td>
                    <td className="p-4 font-medium text-amret-700 dark:text-amret-400 underline decoration-dotted underline-offset-2 group-hover:text-amret-900 dark:group-hover:text-amret-200">
                        {ticket.number}
                    </td>
                    <td className="p-4">
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900 dark:text-gray-100">{ticket.item}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{ticket.description}</span>
                        </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{ticket.opened}</td>
                    <td className="p-4">
                         <div className="flex items-center space-x-2">
                             <div className="w-6 h-6 rounded-full bg-amret-100 dark:bg-amret-900 text-amret-700 dark:text-amret-300 flex items-center justify-center text-xs font-bold">
                                 {ticket.openedBy.split('-')[1]?.substring(0,2).toUpperCase()}
                             </div>
                             <span className="text-sm text-amret-700 dark:text-amret-300 font-medium">{ticket.openedBy}</span>
                         </div>
                    </td>
                    <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                        </span>
                    </td>
                    <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStateColor(ticket.state)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${ticket.state === 'Open' ? 'bg-amret-500' : ticket.state === 'Work in Progress' ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'}`}></span>
                            {ticket.state}
                        </span>
                    </td>
                    <td className="p-4">
                        <button className="text-gray-400 hover:text-amret-600 dark:hover:text-amret-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icon name="list" className="w-4 h-4" />
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
                <div>
                    Showing <span className="font-bold text-gray-900 dark:text-gray-200">1</span> to <span className="font-bold text-gray-900 dark:text-gray-200">{tickets.length}</span> of <span className="font-bold text-gray-900 dark:text-gray-200">821</span>
                </div>
                <div className="flex space-x-2">
                     <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50">Previous</button>
                     <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded shadow-sm hover:border-amret-500 text-gray-900 dark:text-gray-200 font-medium">1</button>
                     <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-white dark:hover:bg-slate-800">2</button>
                     <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-white dark:hover:bg-slate-800">3</button>
                     <span className="px-2 py-1">...</span>
                     <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-white dark:hover:bg-slate-800">Next</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
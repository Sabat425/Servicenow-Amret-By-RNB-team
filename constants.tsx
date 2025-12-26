import React from 'react';
import { Ticket, MenuItem, MasterData } from './types';

// Amret Logo URL provided by user
export const AMRET_LOGO_URL = "https://service.amret.com.kh/999eee76dba8c910dc8bab1cd39619d2.iix";

// Icon Component Wrapper for pure SVG usage
export const Icon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactElement> = {
    search: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
    filter: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    ),
    star: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    home: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    list: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    ),
    bell: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
    chevronDown: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    ),
    chevronRight: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    ),
    lock: (
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    activity: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    user: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    fileText: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    menu: (
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    ),
     refresh: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
    ),
    moon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ),
    sun: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ),
    drag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="9" cy="12" r="1"></circle>
        <circle cx="9" cy="5" r="1"></circle>
        <circle cx="9" cy="19" r="1"></circle>
        <circle cx="15" cy="12" r="1"></circle>
        <circle cx="15" cy="5" r="1"></circle>
        <circle cx="15" cy="19" r="1"></circle>
      </svg>
    )
  };

  return icons[name] || icons.activity; // Fallback
};

export const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    number: 'RITM0100158',
    item: 'Update on AML Status',
    opened: '05-03-2024 16:42:53',
    openedBy: 'GD-Kuntha Tek',
    priority: 'High',
    state: 'Open',
    description: 'Request for immediate update on AML status for new corporate account.'
  },
  {
    id: '2',
    number: 'RITM0100169',
    item: 'VPN Access Request',
    opened: '05-03-2024 17:51:16',
    openedBy: 'GD-Sokha Chan',
    priority: 'Moderate',
    state: 'Work in Progress',
    description: 'Remote access required for audit team members.'
  },
  {
    id: '3',
    number: 'RITM0100258',
    item: 'Software Installation',
    opened: '06-03-2024 11:39:09',
    openedBy: 'IT-Dara Heng',
    priority: 'Low',
    state: 'Pending',
    description: 'Adobe Creative Cloud license allocation.'
  },
  {
    id: '4',
    number: 'RITM0100286',
    item: 'Hardware Replacement',
    opened: '06-03-2024 15:47:16',
    openedBy: 'HR-Vanna Ouk',
    priority: 'Critical',
    state: 'Open',
    description: 'Laptop screen flickering, needs urgent replacement for presentation.'
  },
  {
    id: '5',
    number: 'RITM0100312',
    item: 'New User Onboarding',
    opened: '07-03-2024 09:15:00',
    openedBy: 'HR-Vanna Ouk',
    priority: 'Moderate',
    state: 'Closed Complete',
    description: 'Create AD account and email for new Marketing Manager.'
  },
  {
    id: '6',
    number: 'RITM0100345',
    item: 'Database Access',
    opened: '07-03-2024 10:30:22',
    openedBy: 'Dev-Bopha Lim',
    priority: 'High',
    state: 'Work in Progress',
    description: 'Read-only access to PROD DB for troubleshooting.'
  },
  {
    id: '7',
    number: 'RITM0100401',
    item: 'Network Connectivity',
    opened: '08-03-2024 08:45:11',
    openedBy: 'Ops-Sambath Keo',
    priority: 'Critical',
    state: 'Open',
    description: 'Branch #405 experiencing intermittent connectivity.'
  },
  {
    id: '8',
    number: 'RITM0100455',
    item: 'Update on AML Status',
    opened: '08-03-2024 14:20:05',
    openedBy: 'GD-Kuntha Tek',
    priority: 'Moderate',
    state: 'Open',
    description: 'Routine check for existing high-risk profile.'
  }
];

export const MOCK_MASTER_DATA: MasterData[] = [
  {
    id: '1',
    service: 'Printing Tool',
    category: 'Individual Credit',
    subCategory: '3 Wheels',
    issueType: 'ESB',
    impact: '2 - Medium',
    urgency: '2 - Medium',
    department: 'Operations',
    division: 'Operations',
    incEnd: 'NO'
  },
  {
    id: '2',
    service: 'EPM IT Admin Tasks',
    category: '02. Clear Empty Blocks',
    subCategory: '2.1 Clear Empty Blocks REOPEX',
    issueType: 'Recurring Fixed Issue',
    impact: '2 - Medium',
    urgency: '3 - Low',
    department: 'Strategic Planning',
    division: 'Finance',
    incEnd: 'NO'
  },
  {
    id: '3',
    service: 'EPM IT Admin Tasks',
    category: '02. Clear Empty Blocks',
    subCategory: '2.2 Clear Empty Blocks CAPEX',
    issueType: 'Formula Issue',
    impact: '2 - Medium',
    urgency: '3 - Low',
    department: 'Strategic Planning',
    division: 'Finance',
    incEnd: 'NO'
  },
  {
    id: '4',
    service: 'EPM IT Admin Tasks',
    category: '02. Clear Empty Blocks',
    subCategory: '2.2 Clear Empty Blocks CAPEX',
    issueType: 'Review/ Report Issue',
    impact: '2 - Medium',
    urgency: '3 - Low',
    department: 'Strategic Planning',
    division: 'Finance',
    incEnd: 'NO'
  },
  {
    id: '5',
    service: 'EPM IT Admin Tasks',
    category: '02. Clear Empty Blocks',
    subCategory: '2.1 Clear Empty Blocks MANPOWER',
    issueType: 'Integration Issue',
    impact: '2 - Medium',
    urgency: '3 - Low',
    department: 'Strategic Planning',
    division: 'Finance',
    incEnd: 'NO'
  },
  {
    id: '6',
    service: 'EPM IT Admin Tasks',
    category: '02. Clear Empty Blocks',
    subCategory: '2.1 Clear Empty Blocks MANPOWER',
    issueType: 'Change Request',
    impact: '2 - Medium',
    urgency: '3 - Low',
    department: 'Strategic Planning',
    division: 'Finance',
    incEnd: 'NO'
  },
  {
    id: '7',
    service: 'EPM IT Admin Tasks',
    category: '03. Clear Zero Projection',
    subCategory: '3.1 Clear Zero Projection - REOPEX',
    issueType: 'Performance Issue',
    impact: '2 - Medium',
    urgency: '3 - Low',
    department: 'Strategic Planning',
    division: 'Finance',
    incEnd: 'NO'
  }
];

export const SIDEBAR_ITEMS: MenuItem[] = [
  {
    id: 'fav',
    label: 'Favorites',
    iconName: 'star',
    isOpen: true,
    subItems: [
        { id: 'f1', label: 'Password Reset', iconName: 'lock' },
        { id: 'f2', label: 'Incidents Closed Today', iconName: 'activity' },
        { id: 'f3', label: 'Amret Staff Resign', iconName: 'user' },
    ]
  },
  {
    id: 'req',
    label: 'Requests',
    iconName: 'fileText',
    isOpen: true,
    subItems: [
        { id: 'r1', label: 'All Open Items', iconName: 'list', count: 12 },
        { id: 'r2', label: 'Assigned to Me', iconName: 'user', count: 4 },
        { id: 'r3', label: 'SD - Incident', iconName: 'activity' },
    ]
  },
   {
    id: 'ws',
    label: 'Workspaces',
    iconName: 'activity',
    isOpen: false,
    subItems: [
        { id: 'w1', label: 'Agent Workspace', iconName: 'list' },
        { id: 'w2', label: 'Operations', iconName: 'activity' },
    ]
  }
];
export interface Ticket {
  id: string;
  number: string;
  item: string;
  opened: string;
  openedBy: string;
  priority: 'Low' | 'Moderate' | 'High' | 'Critical';
  state: 'Open' | 'Work in Progress' | 'Closed Complete' | 'Pending';
  description: string;
}

export interface MenuItem {
  id: string;
  label: string;
  iconName: string;
  count?: number;
  subItems?: MenuItem[];
  isOpen?: boolean;
}

export interface MasterData {
  id: string;
  service: string;
  category: string;
  subCategory: string;
  issueType: string;
  impact: string;
  urgency: string;
  department: string;
  division: string;
  incEnd: string;
}

export type ViewMode = 'dashboard' | 'list' | 'detail';

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
}
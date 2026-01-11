export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  badges: Badge[];
  reportsCount: number;
  supportGiven: number;
  joinedDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedDate: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  priority: 'low' | 'medium' | 'high';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  reportedBy: User;
  reportedDate: string;
  lastUpdated: string;
  supportCount: number;
  hasUserSupported: boolean;
  assignedTo?: string;
  estimatedResolution?: string;
  timeline: TimelineEvent[];
  comments: Comment[];
}

export interface TimelineEvent {
  id: string;
  type: 'reported' | 'acknowledged' | 'in-progress' | 'resolved' | 'comment';
  title: string;
  description: string;
  date: string;
  user?: string;
  images?: string[];
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  date: string;
  likes: number;
  hasUserLiked: boolean;
}

export type IssueCategory = 
  | 'roads' 
  | 'water' 
  | 'electricity' 
  | 'garbage' 
  | 'streetlights' 
  | 'parks' 
  | 'traffic' 
  | 'drainage' 
  | 'other';

export type IssueStatus = 'reported' | 'acknowledged' | 'in-progress' | 'resolved';

export const CATEGORY_CONFIG = {
  roads: { label: 'Roads & Infrastructure', color: '#DC2626', icon: 'Construction' },
  water: { label: 'Water Supply', color: '#0EA5E9', icon: 'Droplets' },
  electricity: { label: 'Electricity', color: '#F59E0B', icon: 'Zap' },
  garbage: { label: 'Garbage & Sanitation', color: '#059669', icon: 'Trash2' },
  streetlights: { label: 'Street Lights', color: '#7C3AED', icon: 'Lightbulb' },
  parks: { label: 'Parks & Recreation', color: '#16A34A', icon: 'Trees' },
  traffic: { label: 'Traffic & Parking', color: '#EA580C', icon: 'Car' },
  drainage: { label: 'Drainage & Sewage', color: '#0891B2', icon: 'Waves' },
  other: { label: 'Other Issues', color: '#6B7280', icon: 'AlertCircle' }
};

export const STATUS_CONFIG = {
  reported: { label: 'Reported', color: '#DC2626', bg: '#FEE2E2' },
  acknowledged: { label: 'Acknowledged', color: '#F59E0B', bg: '#FEF3C7' },
  'in-progress': { label: 'In Progress', color: '#0EA5E9', bg: '#DBEAFE' },
  resolved: { label: 'Resolved', color: '#059669', bg: '#D1FAE5' }
};
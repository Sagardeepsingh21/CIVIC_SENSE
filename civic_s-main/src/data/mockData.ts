import { User, Issue, Badge } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  badges: [
    {
      id: '1',
      name: 'Community Hero',
      description: 'Reported 10+ issues',
      icon: 'Award',
      color: '#F59E0B',
      earnedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Supportive Citizen',
      description: 'Supported 25+ reports',
      icon: 'Heart',
      color: '#DC2626',
      earnedDate: '2024-02-01'
    }
  ],
  reportsCount: 12,
  supportGiven: 28,
  joinedDate: '2023-11-15'
};

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on Oak Street',
    description: 'Deep pothole causing damage to vehicles. Water collects during rain making it dangerous for motorcycles.',
    category: 'roads',
    status: 'in-progress',
    priority: 'high',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Oak Street, Downtown'
    },
    images: ['https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=400'],
    reportedBy: mockUser,
    reportedDate: '2024-01-20T10:30:00Z',
    lastUpdated: '2024-01-22T14:15:00Z',
    supportCount: 8,
    hasUserSupported: true,
    assignedTo: 'Public Works Department',
    estimatedResolution: '2024-01-30',
    timeline: [
      {
        id: '1',
        type: 'reported',
        title: 'Issue Reported',
        description: 'Report submitted by Sarah Johnson',
        date: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        type: 'acknowledged',
        title: 'Report Acknowledged',
        description: 'Issue has been reviewed and accepted',
        date: '2024-01-21T09:15:00Z'
      },
      {
        id: '3',
        type: 'in-progress',
        title: 'Work Started',
        description: 'Repair crew assigned and work has begun',
        date: '2024-01-22T14:15:00Z',
        user: 'Public Works Department'
      }
    ],
    comments: [
      {
        id: '1',
        text: 'This has been a problem for months! Thank you for reporting it.',
        author: {
          id: '2',
          name: 'Mike Chen',
          email: 'mike@email.com',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          badges: [],
          reportsCount: 3,
          supportGiven: 15,
          joinedDate: '2024-01-01'
        },
        date: '2024-01-20T15:45:00Z',
        likes: 4,
        hasUserLiked: false
      }
    ]
  },
  {
    id: '2',
    title: 'Overflowing garbage bin at Central Park',
    description: 'Garbage bin near the playground is constantly overflowing, attracting pests and creating unsanitary conditions.',
    category: 'garbage',
    status: 'acknowledged',
    priority: 'medium',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: 'Central Park, Near Playground'
    },
    images: ['https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400'],
    reportedBy: {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@email.com',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      badges: [],
      reportsCount: 5,
      supportGiven: 12,
      joinedDate: '2023-12-10'
    },
    reportedDate: '2024-01-22T08:20:00Z',
    lastUpdated: '2024-01-22T16:30:00Z',
    supportCount: 15,
    hasUserSupported: false,
    assignedTo: 'Parks & Recreation',
    timeline: [
      {
        id: '1',
        type: 'reported',
        title: 'Issue Reported',
        description: 'Report submitted by Emily Rodriguez',
        date: '2024-01-22T08:20:00Z'
      },
      {
        id: '2',
        type: 'acknowledged',
        title: 'Report Acknowledged',
        description: 'Issue has been reviewed and scheduled for action',
        date: '2024-01-22T16:30:00Z'
      }
    ],
    comments: []
  },
  {
    id: '3',
    title: 'Broken street light on Maple Avenue',
    description: 'Street light has been out for 2 weeks, creating safety concerns for pedestrians during evening hours.',
    category: 'streetlights',
    status: 'resolved',
    priority: 'medium',
    location: {
      lat: 40.7282,
      lng: -74.0776,
      address: '456 Maple Avenue, Residential District'
    },
    images: [],
    reportedBy: mockUser,
    reportedDate: '2024-01-15T19:45:00Z',
    lastUpdated: '2024-01-18T11:20:00Z',
    supportCount: 6,
    hasUserSupported: false,
    assignedTo: 'Electric Department',
    timeline: [
      {
        id: '1',
        type: 'reported',
        title: 'Issue Reported',
        description: 'Report submitted by Sarah Johnson',
        date: '2024-01-15T19:45:00Z'
      },
      {
        id: '2',
        type: 'acknowledged',
        title: 'Report Acknowledged',
        description: 'Issue has been reviewed and accepted',
        date: '2024-01-16T10:15:00Z'
      },
      {
        id: '3',
        type: 'in-progress',
        title: 'Work Started',
        description: 'Electrician dispatched to replace bulb',
        date: '2024-01-17T14:30:00Z'
      },
      {
        id: '4',
        type: 'resolved',
        title: 'Issue Resolved',
        description: 'Street light repaired and functioning normally',
        date: '2024-01-18T11:20:00Z',
        images: ['https://images.pexels.com/photos/5255233/pexels-photo-5255233.jpeg?auto=compress&cs=tinysrgb&w=400']
      }
    ],
    comments: []
  }
];
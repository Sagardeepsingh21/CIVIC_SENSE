import React from 'react';
import { 
  Award, 
  MapPin, 
  Calendar, 
  Heart, 
  MessageCircle,
  TrendingUp,
  Trophy,
  Star
} from 'lucide-react';
import { mockUser, mockIssues } from '../../data/mockData';
import IssueCard from '../Issues/IssueCard';

export default function UserProfile() {
  const userIssues = mockIssues.filter(issue => issue.reportedBy.id === mockUser.id);
  
  const stats = {
    totalReports: userIssues.length,
    resolvedReports: userIssues.filter(i => i.status === 'resolved').length,
    supportGiven: mockUser.supportGiven,
    totalSupport: userIssues.reduce((sum, issue) => sum + issue.supportCount, 0)
  };

  const achievements = [
    {
      id: '1',
      title: 'First Reporter',
      description: 'Submitted your first issue report',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      completed: true
    },
    {
      id: '2',
      title: 'Community Hero',
      description: 'Report 10+ civic issues',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      completed: userIssues.length >= 10
    },
    {
      id: '3',
      title: 'Problem Solver',
      description: 'Get 5+ issues resolved',
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      completed: stats.resolvedReports >= 5
    },
    {
      id: '4',
      title: 'Supportive Citizen',
      description: 'Support 25+ community reports',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      completed: stats.supportGiven >= 25
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{mockUser.name}</h1>
              <p className="text-gray-600 text-lg">{mockUser.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Joined {new Date(mockUser.joinedDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
          <p className="text-sm text-gray-600">Issues Reported</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.resolvedReports}</p>
          <p className="text-sm text-gray-600">Issues Resolved</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.supportGiven}</p>
          <p className="text-sm text-gray-600">Support Given</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalSupport}</p>
          <p className="text-sm text-gray-600">Support Received</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Achievements */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={achievement.id}
                    className={`
                      p-4 rounded-lg border transition-all duration-200
                      ${achievement.completed 
                        ? `${achievement.bgColor} ${achievement.borderColor}` 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${achievement.completed ? achievement.bgColor : 'bg-gray-100'}
                      `}>
                        <Icon className={`
                          h-5 w-5 
                          ${achievement.completed ? achievement.color : 'text-gray-400'}
                        `} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`
                          font-medium 
                          ${achievement.completed ? 'text-gray-900' : 'text-gray-500'}
                        `}>
                          {achievement.title}
                        </h3>
                        <p className={`
                          text-sm 
                          ${achievement.completed ? 'text-gray-600' : 'text-gray-400'}
                        `}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.completed && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Trophy className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Badges</h2>
            <div className="space-y-3">
              {mockUser.badges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <p className="text-xs text-gray-500">
                      Earned {new Date(badge.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Your Recent Reports</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            
            {userIssues.length > 0 ? (
              <div className="space-y-6">
                {userIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</h3>
                <p className="text-gray-600 mb-4">Start making a difference in your community!</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Report Your First Issue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  MapPin,
  Users,
  Award,
  Calendar,
  Zap,
  Target,
  Activity,
  Flame
} from 'lucide-react';
import { mockIssues, mockUser } from '../../data/mockData';
import { Issue } from '../../types';
import IssueCard from '../Issues/IssueCard';

export default function Dashboard() {
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    resolved: 0,
    inProgress: 0,
    reported: 0
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streak, setStreak] = useState(7);
  const [impactScore, setImpactScore] = useState(0);

  const stats = {
    total: mockIssues.length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length,
    inProgress: mockIssues.filter(i => i.status === 'in-progress').length,
    reported: mockIssues.filter(i => i.status === 'reported').length
  };

  // Animate stats on load
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        callback(current);
        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    };

    animateValue(0, stats.total, 1500, (value) => 
      setAnimatedStats(prev => ({ ...prev, total: value }))
    );
    animateValue(0, stats.resolved, 1800, (value) => 
      setAnimatedStats(prev => ({ ...prev, resolved: value }))
    );
    animateValue(0, stats.inProgress, 1200, (value) => 
      setAnimatedStats(prev => ({ ...prev, inProgress: value }))
    );
    animateValue(0, stats.reported, 1000, (value) => 
      setAnimatedStats(prev => ({ ...prev, reported: value }))
    );

    // Animate impact score
    animateValue(0, 2847, 2000, setImpactScore);
  }, []);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const recentIssues = mockIssues.slice(0, 3);

  const StatCard = ({ title, value, icon: Icon, color, bgColor, trend, pulse }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    bgColor: string;
    trend?: string;
    pulse?: boolean;
  }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 ${pulse ? 'animate-pulse' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2 tabular-nums">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center transform hover:rotate-12 transition-transform duration-300`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full animate-ping"></div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}!</h1>
              <p className="text-blue-100 text-lg">
                🔥 {streak} day streak! You've made a positive impact with {mockUser.reportsCount} reports and {mockUser.supportGiven} support votes.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-medium">Impact Score: {impactScore.toLocaleString()}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-medium">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-4 relative z-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 animate-bounce">
                  <Award className="h-8 w-8 text-yellow-300" />
                </div>
                <p className="text-sm text-blue-100">Community Hero</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                  <Flame className="h-8 w-8 text-orange-300 animate-pulse" />
                </div>
                <p className="text-sm text-blue-100">{streak} Day Streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Issues"
          value={animatedStats.total}
          icon={MapPin}
          color="text-blue-600"
          bgColor="bg-blue-50"
          trend="+12% this week"
        />
        <StatCard
          title="In Progress"
          value={animatedStats.inProgress}
          icon={Clock}
          color="text-orange-600"
          bgColor="bg-orange-50"
          trend="+15% today"
          pulse={true}
        />
        <StatCard
          title="Resolved"
          value={animatedStats.resolved}
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-green-50"
          trend="+8% resolved"
        />
        <StatCard
          title="Impact Score"
          value={Math.floor(impactScore / 100)}
          icon={Zap}
          color="text-purple-600"
          bgColor="bg-purple-50"
          trend="🚀 Rising fast"
        />
      </div>

      {/* Live Activity Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="h-5 w-5 text-green-500 mr-2 animate-pulse" />
            Live Activity Feed
          </h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
        </div>
        <div className="space-y-3 max-h-32 overflow-y-auto">
          <div className="flex items-center space-x-3 text-sm animate-fadeIn">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-gray-600">John D. just resolved a pothole issue on Main St</span>
            <span className="text-gray-400">2s ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm animate-fadeIn">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <span className="text-gray-600">New water leak reported on Oak Avenue</span>
            <span className="text-gray-400">15s ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm animate-fadeIn">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
            <span className="text-gray-600">Street light repair in progress - Downtown</span>
            <span className="text-gray-400">1m ago</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg">
              Report New Issue
            </button>
            <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-medium transform hover:scale-105">
              View Issue Map
            </button>
            <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-medium transform hover:scale-105">
              Check My Reports
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Badges</h3>
          <div className="space-y-3">
            {mockUser.badges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:from-yellow-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center animate-pulse">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{badge.name}</p>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Street light issue resolved</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Pothole report acknowledged</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New issue reported</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Issues in Your Area</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recentIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
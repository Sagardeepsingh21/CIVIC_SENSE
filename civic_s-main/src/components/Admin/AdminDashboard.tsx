import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  Download,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { mockIssues } from '../../data/mockData';
import { CATEGORY_CONFIG, STATUS_CONFIG } from '../../types';

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'issues' | 'users' | 'reports'>('overview');

  const stats = {
    totalIssues: mockIssues.length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length,
    inProgress: mockIssues.filter(i => i.status === 'in-progress').length,
    reported: mockIssues.filter(i => i.status === 'reported').length,
    acknowledged: mockIssues.filter(i => i.status === 'acknowledged').length
  };

  const categoryStats = Object.keys(CATEGORY_CONFIG).map(category => ({
    category,
    count: mockIssues.filter(i => i.category === category).length,
    label: CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG].label
  }));

  const TabButton = ({ id, label, isActive, onClick }: {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-medium transition-colors
        ${isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }
      `}
    >
      {label}
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, color, bgColor, change }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    bgColor: string;
    change?: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change} from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={stats.totalIssues}
          icon={AlertTriangle}
          color="text-blue-600"
          bgColor="bg-blue-50"
          change="+12%"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-green-50"
          change="+8%"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          color="text-orange-600"
          bgColor="bg-orange-50"
          change="+15%"
        />
        <StatCard
          title="Active Users"
          value={24}
          icon={Users}
          color="text-purple-600"
          bgColor="bg-purple-50"
          change="+5%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues by Category</h3>
          <div className="space-y-3">
            {categoryStats.map((stat) => (
              <div key={stat.category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(stat.count / stats.totalIssues) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{stat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <div className="space-y-4">
            {Object.entries(STATUS_CONFIG).map(([status, config]) => {
              const count = stats[status as keyof typeof stats] || 0;
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{config.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {mockIssues.slice(0, 5).map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img 
                  src={issue.reportedBy.avatar} 
                  alt={issue.reportedBy.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{issue.title}</p>
                  <p className="text-sm text-gray-600">
                    Reported by {issue.reportedBy.name} • {new Date(issue.reportedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  color: STATUS_CONFIG[issue.status].color,
                  backgroundColor: STATUS_CONFIG[issue.status].bg
                }}
              >
                {STATUS_CONFIG[issue.status].label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const IssuesTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Categories</option>
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Statuses</option>
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Issues</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{issue.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{issue.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {CATEGORY_CONFIG[issue.category].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        color: STATUS_CONFIG[issue.status].color,
                        backgroundColor: STATUS_CONFIG[issue.status].bg
                      }}
                    >
                      {STATUS_CONFIG[issue.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                      issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                      issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={issue.reportedBy.avatar} 
                        alt={issue.reportedBy.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-900">{issue.reportedBy.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(issue.reportedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage civic issues and monitor community engagement</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg w-fit">
          <TabButton
            id="overview"
            label="Overview"
            isActive={selectedTab === 'overview'}
            onClick={() => setSelectedTab('overview')}
          />
          <TabButton
            id="issues"
            label="Issues"
            isActive={selectedTab === 'issues'}
            onClick={() => setSelectedTab('issues')}
          />
          <TabButton
            id="users"
            label="Users"
            isActive={selectedTab === 'users'}
            onClick={() => setSelectedTab('users')}
          />
          <TabButton
            id="reports"
            label="Reports"
            isActive={selectedTab === 'reports'}
            onClick={() => setSelectedTab('reports')}
          />
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && <OverviewTab />}
      {selectedTab === 'issues' && <IssuesTab />}
      {selectedTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-600">User management features coming soon</p>
        </div>
      )}
      {selectedTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics & Reports</h3>
          <p className="text-gray-600">Advanced reporting features coming soon</p>
        </div>
      )}
    </div>
  );
}
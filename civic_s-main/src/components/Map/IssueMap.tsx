import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Filter, 
  Search,
  Layers,
  Locate,
  Zap,
  Activity,
  Wifi
} from 'lucide-react';
import { mockIssues } from '../../data/mockData';
import { CATEGORY_CONFIG, STATUS_CONFIG, IssueCategory, IssueStatus } from '../../types';
import IssueCard from '../Issues/IssueCard';

export default function IssueMap() {
  const [selectedIssue, setSelectedIssue] = useState(mockIssues[0]);
  const [filterCategory, setFilterCategory] = useState<IssueCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<IssueStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [pulsingPins, setPulsingPins] = useState<string[]>([]);
  const [heatmapMode, setHeatmapMode] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        const randomIssue = mockIssues[Math.floor(Math.random() * mockIssues.length)];
        setPulsingPins(prev => [...prev, randomIssue.id]);
        setTimeout(() => {
          setPulsingPins(prev => prev.filter(id => id !== randomIssue.id));
        }, 3000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLiveMode]);
  const filteredIssues = mockIssues.filter(issue => {
    const matchesCategory = filterCategory === 'all' || issue.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case 'reported': return '#DC2626';
      case 'acknowledged': return '#F59E0B';
      case 'in-progress': return '#0EA5E9';
      case 'resolved': return '#059669';
      default: return '#6B7280';
    }
  };

  const MapPinComponent = ({ issue, isSelected }: { issue: any, isSelected: boolean }) => (
    <div 
      className={`
        absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200
        ${isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-105'} 
        ${pulsingPins.includes(issue.id) ? 'animate-bounce' : ''}
      `}
      style={{
        left: `${((issue.location.lng + 74.0060) / 0.1) * 100}%`,
        top: `${((40.7589 - issue.location.lat) / 0.1) * 100}%`
      }}
      onClick={() => setSelectedIssue(issue)}
    >
      <div 
        className={`
          w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center
          ${isSelected ? 'ring-4 ring-blue-200' : ''}
          ${pulsingPins.includes(issue.id) ? 'ring-4 ring-yellow-300 animate-pulse' : ''}
        `}
        style={{ backgroundColor: getStatusColor(issue.status) }}
      >
        <MapPin className={`h-4 w-4 text-white ${pulsingPins.includes(issue.id) ? 'animate-spin' : ''}`} />
        {pulsingPins.includes(issue.id) && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        )}
      </div>
      {isSelected && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-48 border">
          <h4 className="font-medium text-gray-900 text-sm">{issue.title}</h4>
          <p className="text-xs text-gray-500 mt-1">{issue.location.address}</p>
          <span 
            className="inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium"
            style={{
              color: STATUS_CONFIG[issue.status].color,
              backgroundColor: STATUS_CONFIG[issue.status].bg
            }}
          >
            {STATUS_CONFIG[issue.status].label}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Issue Map</h1>
        <p className="text-gray-600">View and explore civic issues in your area</p>
      </div>

      {/* Live Status Bar */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-4 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 animate-pulse" />
              <span className="font-medium">Live Map Mode</span>
            </div>
            <span className="bg-white/20 px-2 py-1 rounded-full text-sm">Real-time updates</span>
          </div>
          <button 
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isLiveMode 
                ? 'bg-white/20 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isLiveMode ? 'Live ON' : 'Live OFF'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as IssueCategory | 'all')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as IssueStatus | 'all')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Locate className="h-5 w-5" />
            <span>My Location</span>
          </button>
          
          <button 
            onClick={() => setHeatmapMode(!heatmapMode)}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              heatmapMode 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Zap className="h-5 w-5" />
            <span>Heatmap</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className={`h-[600px] relative transition-all duration-500 ${
              heatmapMode 
                ? 'bg-gradient-to-br from-red-900 via-orange-500 to-yellow-300' 
                : 'bg-gradient-to-br from-green-50 to-blue-50'
            }`}>
              {/* Simulated Map Background */}
              <div className={`absolute inset-0 ${heatmapMode ? 'opacity-30' : 'opacity-100'}`}>
                <div className="w-full h-full bg-gray-100 opacity-20"></div>
                {/* Street lines simulation */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300"></div>
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-200"></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-200"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-200"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-200"></div>
              </div>

              {/* Heatmap overlay */}
              {heatmapMode && (
                <div className="absolute inset-0 opacity-40">
                  {filteredIssues.map((issue, index) => (
                    <div
                      key={`heat-${issue.id}`}
                      className="absolute w-20 h-20 bg-gradient-radial from-red-500 to-transparent rounded-full animate-pulse"
                      style={{
                        left: `${((issue.location.lng + 74.0060) / 0.1) * 100}%`,
                        top: `${((40.7589 - issue.location.lat) / 0.1) * 100}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Map pins */}
              {filteredIssues.map(issue => (
                <MapPinComponent 
                  key={issue.id} 
                  issue={issue} 
                  isSelected={selectedIssue?.id === issue.id}
                />
              ))}

              {/* Map controls */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200">
                <button className="p-3 hover:bg-gray-50 border-b border-gray-200 transition-colors">
                  <Layers className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-3 hover:bg-gray-50 transition-colors">
                  <Locate className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-3">Legend</h4>
                <div className="space-y-2">
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                    <div key={status} className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full animate-pulse"
                        style={{ backgroundColor: config.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{config.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Issue Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedIssue ? 'Issue Details' : 'Select an Issue'}
            </h3>
            {selectedIssue ? (
              <IssueCard issue={selectedIssue} />
            ) : (
              <p className="text-gray-500 text-center py-8">
                Click on a pin to view issue details
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Area Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Issues</span>
                <span className="font-semibold text-gray-900">{filteredIssues.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Resolved</span>
                <span className="font-semibold text-green-600">
                  {filteredIssues.filter(i => i.status === 'resolved').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">In Progress</span>
                <span className="font-semibold text-blue-600">
                  {filteredIssues.filter(i => i.status === 'in-progress').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reported</span>
                <span className="font-semibold text-red-600">
                  {filteredIssues.filter(i => i.status === 'reported').length}
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 text-green-500 mr-2 animate-pulse" />
              Live Updates
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <span>Issue resolved on Main St</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                <span>New report: Water leak</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                <span>Work started on Oak Ave</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
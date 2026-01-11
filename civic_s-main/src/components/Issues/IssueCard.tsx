// import React, { useState } from 'react';
// import { 
//   MapPin, 
//   Clock, 
//   Users, 
//   MessageCircle,
//   Heart,
//   Calendar,
//   TrendingUp,
//   Zap
// } from 'lucide-react';
// import { Issue, CATEGORY_CONFIG, STATUS_CONFIG } from '../../types';

// interface IssueCardProps {
//   issue: Issue;
//   compact?: boolean;
//   onClick?: () => void;
// }

// export default function IssueCard({ issue, compact = false, onClick }: IssueCardProps) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [supportCount, setSupportCount] = useState(issue.supportCount);
//   const [hasSupported, setHasSupported] = useState(issue.hasUserSupported);
  
//   const categoryConfig = CATEGORY_CONFIG[issue.category];
//   const statusConfig = STATUS_CONFIG[issue.status];
  
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'text-red-600 bg-red-50 border-red-200';
//       case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
//       case 'low': return 'text-green-600 bg-green-50 border-green-200';
//       default: return 'text-gray-600 bg-gray-50 border-gray-200';
//     }
//   };

//   const handleSupport = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (hasSupported) {
//       setSupportCount(prev => prev - 1);
//       setHasSupported(false);
//     } else {
//       setSupportCount(prev => prev + 1);
//       setHasSupported(true);
//     }
//   };
//   return (
//     <div 
//       className={`
//         bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group
//         ${compact ? 'p-4' : 'p-6'}
//       `}
//       onClick={onClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Header */}
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex-1">
//           <div className="flex items-center space-x-2 mb-2">
//             <span 
//               className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border animate-pulse"
//               style={{ 
//                 color: categoryConfig.color, 
//                 backgroundColor: categoryConfig.color + '10',
//                 borderColor: categoryConfig.color + '30'
//               }}
//             >
//               {categoryConfig.label}
//             </span>
//             <span 
//               className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize transition-all duration-300 ${
//                 isHovered ? 'scale-110' : ''
//               }`}
//               style={{
//                 color: statusConfig.color,
//                 backgroundColor: statusConfig.bg
//               }}
//             >
//               {statusConfig.label}
//             </span>
//             {issue.status === 'in-progress' && (
//               <div className="flex items-center space-x-1">
//                 <TrendingUp className="h-3 w-3 text-blue-500 animate-bounce" />
//                 <span className="text-xs text-blue-600 font-medium">Active</span>
//               </div>
//             )}
//           </div>
//           <h3 className={`font-semibold text-gray-900 line-clamp-2 ${compact ? 'text-sm' : 'text-lg'}`}>
//             {issue.title}
//           </h3>
//         </div>
//         <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border uppercase transition-all duration-300 ${getPriorityColor(issue.priority)} ${
//           isHovered ? 'scale-110 shadow-md' : ''
//         }`}>
//           {issue.priority}
//         </span>
//       </div>

//       {/* Image */}
//       {issue.images.length > 0 && !compact && (
//         <div className="mb-4">
//           <img 
//             src={issue.images[0]} 
//             alt={issue.title}
//             className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//       )}

//       {/* Description */}
//       <p className={`text-gray-600 mb-4 ${compact ? 'text-sm line-clamp-2' : 'line-clamp-3'}`}>
//         {issue.description}
//       </p>

//       {/* Location */}
//       <div className="flex items-center space-x-2 mb-4 text-gray-500">
//         <MapPin className="h-4 w-4 group-hover:text-blue-500 transition-colors" />
//         <span className={`${compact ? 'text-xs' : 'text-sm'} truncate`}>
//           {issue.location.address}
//         </span>
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={handleSupport}
//             className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-all duration-300 group/heart"
//           >
//             <Heart className={`h-4 w-4 transition-all duration-300 ${
//               hasSupported 
//                 ? 'text-red-500 fill-current scale-110' 
//                 : 'group-hover/heart:scale-110'
//             }`} />
//             <span className="text-sm font-medium tabular-nums">{supportCount}</span>
//           </button>
//           </div>
//           <div className="flex items-center space-x-1 text-gray-500">
//             <MessageCircle className="h-4 w-4 group-hover:text-blue-500 transition-colors" />
//             <span className="text-sm font-medium">{issue.comments.length}</span>
//           </div>
//           {issue.status === 'resolved' && (
//             <div className="flex items-center space-x-1 text-green-500">
//               <Zap className="h-4 w-4 animate-pulse" />
//               <span className="text-xs font-medium">Resolved!</span>
//             </div>
//           )}
//         </div>
        
//         <div className="flex items-center space-x-2">
//           <img 
//             src={issue.reportedBy.avatar} 
//             alt={issue.reportedBy.name}
//             className="w-6 h-6 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//           <div className="text-right">
//             <p className="text-xs text-gray-500">
//               {formatDate(issue.reportedDate)}
//             </p>
//           </div>
//         </div>
//       </div>
      
//       // {/* Hover overlay effect */}
//       // {isHovered && (
//       //   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
//       // )}
//     // Hover overlay effect
// {isHovered && (
//   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
// )}

//     </div>
//   );
// }

import React, { useState } from 'react';
import {
  MapPin,
  MessageCircle,
  Heart,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Issue, CATEGORY_CONFIG, STATUS_CONFIG } from '../../types';

interface IssueCardProps {
  issue: Issue;
  compact?: boolean;
  onClick?: () => void;
}

export default function IssueCard({ issue, compact = false, onClick }: IssueCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [supportCount, setSupportCount] = useState(issue.supportCount);
  const [hasSupported, setHasSupported] = useState(issue.hasUserSupported);

  const categoryConfig = CATEGORY_CONFIG[issue.category];
  const statusConfig = STATUS_CONFIG[issue.status];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleSupport = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasSupported) {
      setSupportCount(prev => prev - 1);
      setHasSupported(false);
    } else {
      setSupportCount(prev => prev + 1);
      setHasSupported(true);
    }
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden
        hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group
        ${compact ? 'p-4' : 'p-6'}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none z-0" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border animate-pulse"
                style={{
                  color: categoryConfig.color,
                  backgroundColor: categoryConfig.color + '10',
                  borderColor: categoryConfig.color + '30'
                }}
              >
                {categoryConfig.label}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
                style={{
                  color: statusConfig.color,
                  backgroundColor: statusConfig.bg
                }}
              >
                {statusConfig.label}
              </span>
              {issue.status === 'in-progress' && (
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-blue-500 animate-bounce" />
                  <span className="text-xs text-blue-600 font-medium">Active</span>
                </div>
              )}
              {issue.status === 'resolved' && (
                <div className="flex items-center space-x-1 text-green-500">
                  <Zap className="h-3 w-3 animate-pulse" />
                  <span className="text-xs font-medium">Resolved!</span>
                </div>
              )}
            </div>
            <h3 className={`font-semibold text-gray-900 line-clamp-2 ${compact ? 'text-sm' : 'text-lg'}`}>
              {issue.title}
            </h3>
          </div>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border uppercase transition-all duration-300 ${getPriorityColor(issue.priority)} ${isHovered ? 'scale-110 shadow-md' : ''}`}>
            {issue.priority}
          </span>
        </div>

        {/* Image */}
        {issue.images.length > 0 && !compact && (
          <div className="mb-4">
            <img
              src={issue.images[0]}
              alt={issue.title}
              className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Description */}
        <p className={`text-gray-600 mb-4 ${compact ? 'text-sm line-clamp-2' : 'line-clamp-3'}`}>
          {issue.description}
        </p>

        {/* Location */}
        <div className="flex items-center space-x-2 mb-4 text-gray-500">
          <MapPin className="h-4 w-4 group-hover:text-blue-500 transition-colors" />
          <span className={`${compact ? 'text-xs' : 'text-sm'} truncate`}>
            {issue.location.address}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSupport}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-all duration-300 group/heart"
            >
              <Heart className={`h-4 w-4 transition-all duration-300 ${hasSupported ? 'text-red-500 fill-current scale-110' : 'group-hover/heart:scale-110'}`} />
              <span className="text-sm font-medium tabular-nums">{supportCount}</span>
            </button>
            <div className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="h-4 w-4 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm font-medium">{issue.comments.length}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={issue.reportedBy.avatar}
              alt={issue.reportedBy.name}
              className="w-6 h-6 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="text-right">
              <p className="text-xs text-gray-500">
                {formatDate(issue.reportedDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


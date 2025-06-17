import React from 'react';
import { ConflictZone } from '../types';
import { MapPin, AlertCircle, TrendingUp, TrendingDown, Flame, Satellite } from 'lucide-react';

interface WorldMapProps {
  conflicts: ConflictZone[];
  selectedConflict: ConflictZone | null;
  onConflictSelect: (conflict: ConflictZone) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ conflicts, selectedConflict, onConflictSelect }) => {
  const getThreatColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-500 bg-red-500';
      case 'HIGH': return 'text-orange-500 bg-orange-500';
      case 'MEDIUM': return 'text-yellow-500 bg-yellow-500';
      case 'LOW': return 'text-green-500 bg-green-500';
      default: return 'text-gray-500 bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ESCALATING': return <TrendingUp className="h-3 w-3" />;
      case 'DE_ESCALATING': return <TrendingDown className="h-3 w-3" />;
      case 'ACTIVE': return <Flame className="h-3 w-3" />;
      default: return <AlertCircle className="h-3 w-3" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Satellite className="h-6 w-6 mr-2 text-blue-400" />
          Global Conflict Monitor
        </h2>
        <div className="text-sm text-gray-400">
          {conflicts.length} active zones • Live satellite feed
        </div>
      </div>
      
      {/* World Map Container */}
      <div className="relative bg-slate-900 rounded-lg overflow-hidden border-2 border-gray-600 shadow-2xl">
        <div className="w-full h-[600px] relative bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
          
          {/* World Map - Detailed SVG */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ocean background */}
            <rect width="1000" height="500" fill="#0f172a" />
            
            {/* Continents - More detailed shapes */}
            {/* North America */}
            <path
              d="M50 100 L180 80 L220 120 L200 180 L150 200 L100 190 L80 150 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1"
            />
            
            {/* South America */}
            <path
              d="M120 250 L180 240 L200 300 L190 380 L160 400 L140 380 L130 320 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1"
            />
            
            {/* Europe */}
            <path
              d="M400 120 L480 110 L520 140 L500 180 L460 170 L420 160 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1"
            />
            
            {/* Africa */}
            <path
              d="M420 200 L500 190 L520 250 L510 350 L480 380 L450 370 L430 320 L440 260 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1"
            />
            
            {/* Asia */}
            <path
              d="M520 80 L750 70 L800 120 L820 180 L780 200 L720 190 L680 160 L650 140 L600 130 L550 110 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1"
            />
            
            {/* Australia */}
            <path
              d="M700 350 L780 340 L800 370 L780 390 L720 380 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1"
            />
            
            {/* Grid lines for coordinates */}
            {Array.from({ length: 19 }, (_, i) => (
              <line
                key={`vertical-${i}`}
                x1={i * 50 + 50}
                y1="0"
                x2={i * 50 + 50}
                y2="500"
                stroke="#1e293b"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <line
                key={`horizontal-${i}`}
                x1="0"
                y1={i * 50 + 50}
                x2="1000"
                y2={i * 50 + 50}
                stroke="#1e293b"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
          </svg>

          {/* Conflict Markers */}
          {conflicts.map((conflict) => {
            const x = ((conflict.coordinates.lng + 180) / 360) * 100;
            const y = ((90 - conflict.coordinates.lat) / 180) * 100;
            
            return (
              <div
                key={conflict.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                onClick={() => onConflictSelect(conflict)}
              >
                <div className={`relative ${selectedConflict?.id === conflict.id ? 'scale-125' : 'scale-100'} transition-all duration-300`}>
                  {/* Pulse rings for active conflicts */}
                  {conflict.status === 'ACTIVE' && (
                    <>
                      <div className={`absolute inset-0 ${getThreatColor(conflict.threatLevel).split(' ')[1]} opacity-20 rounded-full animate-ping scale-150`}></div>
                      <div className={`absolute inset-0 ${getThreatColor(conflict.threatLevel).split(' ')[1]} opacity-10 rounded-full animate-pulse scale-200`}></div>
                    </>
                  )}
                  
                  {/* Critical threat additional ring */}
                  {conflict.threatLevel === 'CRITICAL' && (
                    <div className={`absolute inset-0 ${getThreatColor(conflict.threatLevel).split(' ')[1]} opacity-30 rounded-full animate-ping scale-125`}></div>
                  )}
                  
                  {/* Main marker */}
                  <div className={`w-8 h-8 ${getThreatColor(conflict.threatLevel).split(' ')[1]} rounded-full border-2 border-white shadow-lg relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className={`absolute -top-1 -right-1 ${getThreatColor(conflict.threatLevel).split(' ')[0]} bg-gray-900 rounded-full p-1 border border-white`}>
                    {getStatusIcon(conflict.status)}
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
                  <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl border border-gray-600 text-sm whitespace-nowrap max-w-xs">
                    <div className="font-bold text-base mb-1">{conflict.name}</div>
                    <div className="text-gray-300 text-sm mb-2">{conflict.country}</div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${getThreatColor(conflict.threatLevel).split(' ')[0]} bg-opacity-20`}>
                        {conflict.threatLevel}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{conflict.status.replace('_', ' ')}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Total casualties: {(conflict.casualties.military + conflict.casualties.civilian).toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-400 mt-1">
                      Last updated: {new Date(conflict.lastUpdated).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-95 rounded-lg p-4 border border-gray-600 backdrop-blur-sm">
          <h3 className="text-white text-sm font-bold mb-3 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-400" />
            Threat Assessment
          </h3>
          <div className="space-y-2">
            {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((level) => (
              <div key={level} className="flex items-center space-x-3">
                <div className={`w-4 h-4 ${getThreatColor(level).split(' ')[1]} rounded-full border border-white`}></div>
                <span className="text-gray-300 text-xs font-medium">{level}</span>
                <span className="text-gray-500 text-xs">
                  ({conflicts.filter(c => c.threatLevel === level).length})
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-700">
            <h4 className="text-white text-xs font-medium mb-2">Status</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Flame className="h-3 w-3 text-red-400" />
                <span className="text-gray-400 text-xs">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-3 w-3 text-orange-400" />
                <span className="text-gray-400 text-xs">Escalating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live status */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-gray-900 bg-opacity-95 rounded-lg px-3 py-2 border border-green-500">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs font-medium">LIVE SATELLITE FEED</span>
        </div>
      </div>
    </div>
  );
};
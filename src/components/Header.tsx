import React from 'react';
import { Satellite, AlertTriangle, Shield } from 'lucide-react';

interface HeaderProps {
  activeAlerts: number;
  totalConflicts: number;
}

export const Header: React.FC<HeaderProps> = ({ activeAlerts, totalConflicts }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Satellite className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">Global Conflict Monitor</h1>
              <p className="text-sm text-gray-400">Real-time satellite intelligence system</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="text-right">
              <p className="text-sm font-medium text-white">{activeAlerts}</p>
              <p className="text-xs text-gray-400">Active Alerts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-yellow-400" />
            <div className="text-right">
              <p className="text-sm font-medium text-white">{totalConflicts}</p>
              <p className="text-xs text-gray-400">Monitored Zones</p>
            </div>
          </div>
          
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" title="System Online"></div>
        </div>
      </div>
    </header>
  );
};
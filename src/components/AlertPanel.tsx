import React from 'react';
import { Alert } from '../types';
import { AlertTriangle, Satellite, TrendingUp, Info, CheckCircle, Clock } from 'lucide-react';

interface AlertPanelProps {
  alerts: Alert[];
  onAlertAcknowledge: (alertId: string) => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onAlertAcknowledge }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'NEW_CONFLICT': return <AlertTriangle className="h-4 w-4" />;
      case 'ESCALATION': return <TrendingUp className="h-4 w-4" />;
      case 'SATELLITE_ANOMALY': return <Satellite className="h-4 w-4" />;
      case 'INTELLIGENCE_UPDATE': return <Info className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-900 border-red-500 text-red-100';
      case 'HIGH': return 'bg-orange-900 border-orange-500 text-orange-100';
      case 'MEDIUM': return 'bg-yellow-900 border-yellow-500 text-yellow-100';
      case 'LOW': return 'bg-blue-900 border-blue-500 text-blue-100';
      default: return 'bg-gray-900 border-gray-500 text-gray-100';
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Active Alerts</h2>
        <div className="text-sm text-gray-400">
          {alerts.filter(a => !a.acknowledged).length} unacknowledged
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${getPriorityColor(alert.priority)} ${
                alert.acknowledged ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium opacity-75">
                        {alert.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs opacity-60">•</span>
                      <span className="text-xs font-medium">
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-2 text-xs opacity-75">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                {!alert.acknowledged && (
                  <button
                    onClick={() => onAlertAcknowledge(alert.id)}
                    className="ml-3 px-2 py-1 text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-colors"
                  >
                    ACK
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
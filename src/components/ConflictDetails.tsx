import React from 'react';
import { ConflictZone } from '../types';
import { 
  MapPin, Clock, Users, AlertTriangle, 
  TrendingUp, TrendingDown, Eye, Camera,
  CheckCircle, XCircle
} from 'lucide-react';

interface ConflictDetailsProps {
  conflict: ConflictZone | null;
  onClose: () => void;
}

export const ConflictDetails: React.FC<ConflictDetailsProps> = ({ conflict, onClose }) => {
  if (!conflict) return null;

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-500 bg-red-500';
      case 'HIGH': return 'text-orange-500 bg-orange-500';
      case 'MEDIUM': return 'text-yellow-500 bg-yellow-500';
      case 'LOW': return 'text-green-500 bg-green-500';
      default: return 'text-gray-500 bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ESCALATING': return 'text-red-400 bg-red-900';
      case 'DE_ESCALATING': return 'text-green-400 bg-green-900';
      case 'ACTIVE': return 'text-yellow-400 bg-yellow-900';
      case 'RESOLVED': return 'text-blue-400 bg-blue-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">{conflict.name}</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{conflict.country}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Updated: {formatDate(conflict.lastUpdated)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <XCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Status and Threat Level */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 ${getThreatColor(conflict.threatLevel).split(' ')[1]} rounded-full`}></div>
            <span className="text-sm font-medium text-gray-300">Threat Level</span>
          </div>
          <p className={`text-lg font-bold ${getThreatColor(conflict.threatLevel).split(' ')[0]}`}>
            {conflict.threatLevel}
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            {conflict.status === 'ESCALATING' && <TrendingUp className="h-4 w-4 text-red-400" />}
            {conflict.status === 'DE_ESCALATING' && <TrendingDown className="h-4 w-4 text-green-400" />}
            {conflict.status === 'ACTIVE' && <AlertTriangle className="h-4 w-4 text-yellow-400" />}
            <span className="text-sm font-medium text-gray-300">Status</span>
          </div>
          <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${getStatusColor(conflict.status)}`}>
            {conflict.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-white font-medium mb-2">Situation Overview</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{conflict.description}</p>
      </div>

      {/* Casualties */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-white font-medium mb-3">Casualty Report</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{conflict.casualties.military.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Military</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{conflict.casualties.civilian.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Civilian</div>
          </div>
        </div>
      </div>

      {/* Intelligence Data */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-white font-medium mb-3">Intelligence Assessment</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(conflict.intelligence).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              {value ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-500" />
              )}
              <span className={`text-sm ${value ? 'text-green-400' : 'text-gray-500'}`}>
                {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Satellite Images */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Camera className="h-5 w-5 text-blue-400" />
          <h3 className="text-white font-medium">Latest Satellite Imagery</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {conflict.satelliteImages.map((image, index) => (
            <div key={index} className="relative group cursor-pointer">
              <img
                src={image}
                alt={`Satellite view ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-700 group-hover:border-blue-400 transition-colors"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { FilterState } from '../types';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const threatLevels = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const conflictTypes = ['ARMED_CONFLICT', 'TERRITORIAL_DISPUTE', 'CIVIL_UNREST', 'TERRORIST_ACTIVITY'];
  const statuses = ['ACTIVE', 'ESCALATING', 'DE_ESCALATING', 'RESOLVED'];

  const handleThreatLevelChange = (level: string) => {
    const newLevels = filters.threatLevel.includes(level)
      ? filters.threatLevel.filter(l => l !== level)
      : [...filters.threatLevel, level];
    
    onFiltersChange({ ...filters, threatLevel: newLevels });
  };

  const handleConflictTypeChange = (type: string) => {
    const newTypes = filters.conflictType.includes(type)
      ? filters.conflictType.filter(t => t !== type)
      : [...filters.conflictType, type];
    
    onFiltersChange({ ...filters, conflictType: newTypes });
  };

  const handleStatusChange = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    onFiltersChange({ ...filters, status: newStatuses });
  };

  const hasActiveFilters = 
    filters.threatLevel.length > 0 || 
    filters.conflictType.length > 0 || 
    filters.status.length > 0;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Threat Level */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Threat Level</h3>
          <div className="space-y-1">
            {threatLevels.map((level) => (
              <label key={level} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.threatLevel.includes(level)}
                  onChange={() => handleThreatLevelChange(level)}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                />
                <span className="text-sm text-gray-300">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conflict Type */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Conflict Type</h3>
          <div className="space-y-1">
            {conflictTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.conflictType.includes(type)}
                  onChange={() => handleConflictTypeChange(type)}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                />
                <span className="text-sm text-gray-300">
                  {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Status</h3>
          <div className="space-y-1">
            {statuses.map((status) => (
              <label key={status} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() => handleStatusChange(status)}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                />
                <span className="text-sm text-gray-300">
                  {status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
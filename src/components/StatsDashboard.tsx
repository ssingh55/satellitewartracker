import React from 'react';
import { ConflictZone } from '../types';
import { BarChart3, TrendingUp, Users, MapPin } from 'lucide-react';

interface StatsDashboardProps {
  conflicts: ConflictZone[];
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ conflicts }) => {
  const totalCasualties = conflicts.reduce(
    (acc, conflict) => ({
      military: acc.military + conflict.casualties.military,
      civilian: acc.civilian + conflict.casualties.civilian,
    }),
    { military: 0, civilian: 0 }
  );

  const threatLevelCounts = conflicts.reduce((acc, conflict) => {
    acc[conflict.threatLevel] = (acc[conflict.threatLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const conflictTypeCounts = conflicts.reduce((acc, conflict) => {
    acc[conflict.conflictType] = (acc[conflict.conflictType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const activeConflicts = conflicts.filter(c => c.status === 'ACTIVE').length;
  const escalatingConflicts = conflicts.filter(c => c.status === 'ESCALATING').length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Total Zones</span>
          </div>
          <div className="text-2xl font-bold text-white">{conflicts.length}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-gray-300">Active</span>
          </div>
          <div className="text-2xl font-bold text-red-400">{activeConflicts}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            <span className="text-sm font-medium text-gray-300">Escalating</span>
          </div>
          <div className="text-2xl font-bold text-orange-400">{escalatingConflicts}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Total Casualties</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {(totalCasualties.military + totalCasualties.civilian).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Threat Level Distribution */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Threat Level Distribution</h3>
        </div>
        <div className="space-y-3">
          {Object.entries(threatLevelCounts).map(([level, count]) => {
            const percentage = (count / conflicts.length) * 100;
            const getColor = (level: string) => {
              switch (level) {
                case 'CRITICAL': return 'bg-red-500';
                case 'HIGH': return 'bg-orange-500';
                case 'MEDIUM': return 'bg-yellow-500';
                case 'LOW': return 'bg-green-500';
                default: return 'bg-gray-500';
              }
            };

            return (
              <div key={level} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{level}</span>
                  <span className="text-gray-400">{count} zones</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`${getColor(level)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Casualty Breakdown */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Casualty Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">
              {totalCasualties.military.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Military Personnel</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-1">
              {totalCasualties.civilian.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Civilian Population</div>
          </div>
        </div>
      </div>
    </div>
  );
};
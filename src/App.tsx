import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WorldMap } from './components/WorldMap';
import { ConflictDetails } from './components/ConflictDetails';
import { AlertPanel } from './components/AlertPanel';
import { FilterPanel } from './components/FilterPanel';
import { StatsDashboard } from './components/StatsDashboard';
import { mockConflictZones, mockAlerts } from './data/mockData';
import { ConflictZone, Alert, FilterState } from './types';

function App() {
  const [conflicts, setConflicts] = useState<ConflictZone[]>(mockConflictZones);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedConflict, setSelectedConflict] = useState<ConflictZone | null>(null);
  const [activeView, setActiveView] = useState<'map' | 'stats'>('map');
  const [filters, setFilters] = useState<FilterState>({
    threatLevel: [],
    conflictType: [],
    status: [],
    dateRange: { start: null, end: null }
  });

  // Filter conflicts based on active filters
  const filteredConflicts = conflicts.filter(conflict => {
    if (filters.threatLevel.length > 0 && !filters.threatLevel.includes(conflict.threatLevel)) {
      return false;
    }
    if (filters.conflictType.length > 0 && !filters.conflictType.includes(conflict.conflictType)) {
      return false;
    }
    if (filters.status.length > 0 && !filters.status.includes(conflict.status)) {
      return false;
    }
    return true;
  });

  const handleAlertAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const clearFilters = () => {
    setFilters({
      threatLevel: [],
      conflictType: [],
      status: [],
      dateRange: { start: null, end: null }
    });
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged).length;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random updates to conflict data
      setConflicts(prev => prev.map(conflict => ({
        ...conflict,
        lastUpdated: Math.random() > 0.9 ? new Date().toISOString() : conflict.lastUpdated
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header activeAlerts={activeAlerts} totalConflicts={conflicts.length} />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* View Toggle */}
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveView('map')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'map' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Map View
              </button>
              <button
                onClick={() => setActiveView('stats')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'stats' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Analytics
              </button>
            </div>

            {/* Filters */}
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />

            {/* Alerts */}
            <AlertPanel
              alerts={alerts}
              onAlertAcknowledge={handleAlertAcknowledge}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {activeView === 'map' ? (
            <div className="h-full space-y-6">
              <WorldMap
                conflicts={filteredConflicts}
                selectedConflict={selectedConflict}
                onConflictSelect={setSelectedConflict}
              />
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              <StatsDashboard conflicts={filteredConflicts} />
            </div>
          )}
        </div>

        {/* Right Sidebar - Conflict Details */}
        {selectedConflict && (
          <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
            <ConflictDetails
              conflict={selectedConflict}
              onClose={() => setSelectedConflict(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
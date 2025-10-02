import React, { useState } from 'react';
import { FilterOptions } from '../types/review';
import { Filter, Calendar } from 'lucide-react';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  listings: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  listings,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      listing: '',
      rating: '',
      channel: '',
      dateRange: { start: null, end: null },
      type: '',
    });
  };

  const hasActiveFilters = 
    filters.listing !== '' || 
    filters.rating !== '' || 
    filters.channel !== '' || 
    filters.type !== '' ||
    filters.dateRange.start !== null ||
    filters.dateRange.end !== null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property
          </label>
          <select
            value={filters.listing}
            onChange={(e) => updateFilter('listing', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Properties</option>
            {listings.map(listing => (
              <option key={listing} value={listing}>{listing}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => updateFilter('rating', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Rating</option>
            <option value="9">9+ Stars</option>
            <option value="8">8+ Stars</option>
            <option value="7">7+ Stars</option>
            <option value="6">6+ Stars</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel
          </label>
          <select
            value={filters.channel}
            onChange={(e) => updateFilter('channel', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Channels</option>
            <option value="hostaway">Hostaway</option>
            <option value="google">Google</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="guest-to-host">Guest to Host</option>
            <option value="host-to-guest">Host to Guest</option>
          </select>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">
              {filters.dateRange.start || filters.dateRange.end 
                ? `${filters.dateRange.start?.toLocaleDateString() || 'Start'} - ${filters.dateRange.end?.toLocaleDateString() || 'End'}`
                : 'Any Date'
              }
            </span>
            <Calendar className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {showDatePicker && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                onChange={(e) => updateFilter('dateRange', {
                  ...filters.dateRange,
                  start: e.target.value ? new Date(e.target.value) : null
                })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                onChange={(e) => updateFilter('dateRange', {
                  ...filters.dateRange,
                  end: e.target.value ? new Date(e.target.value) : null
                })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

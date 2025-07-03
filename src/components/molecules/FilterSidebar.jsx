import { useState } from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const [activeFilters, setActiveFilters] = useState({
    types: [],
    trainers: [],
    difficulty: [],
    time: [],
    equipment: []
  });

  const filterOptions = {
    types: ['Yoga', 'HIIT', 'Strength', 'Cardio', 'Pilates', 'Boxing', 'Dance', 'Cycling'],
    trainers: ['Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Lisa Thompson'],
    difficulty: ['Beginner', 'Intermediate', 'Advanced'],
    time: ['Early Morning (6-9 AM)', 'Morning (9-12 PM)', 'Afternoon (12-5 PM)', 'Evening (5-8 PM)'],
    equipment: ['No Equipment', 'Dumbbells', 'Resistance Bands', 'Yoga Mat', 'Kettlebells']
  };

  const handleFilterToggle = (category, value) => {
    const newFilters = { ...activeFilters };
    const categoryFilters = newFilters[category];
    
    if (categoryFilters.includes(value)) {
      newFilters[category] = categoryFilters.filter(item => item !== value);
    } else {
      newFilters[category] = [...categoryFilters, value];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    setActiveFilters({
      types: [],
      trainers: [],
      difficulty: [],
      time: [],
      equipment: []
    });
    onClearFilters();
  };

  const getTotalActiveFilters = () => {
    return Object.values(activeFilters).reduce((total, filters) => total + filters.length, 0);
  };

  return (
    <Card className="filter-sidebar">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {getTotalActiveFilters() > 0 && (
          <Button
            variant="ghost"
            size="small"
            onClick={handleClearAll}
            icon="X"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category}>
            <h4 className="font-medium text-gray-900 mb-3 capitalize flex items-center gap-2">
              <ApperIcon 
                name={
                  category === 'types' ? 'Activity' :
                  category === 'trainers' ? 'User' :
                  category === 'difficulty' ? 'TrendingUp' :
                  category === 'time' ? 'Clock' :
                  'Package'
                } 
                size={16} 
              />
              {category}
            </h4>
            <div className="space-y-2">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters[category].includes(option)}
                    onChange={() => handleFilterToggle(category, option)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {getTotalActiveFilters() > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([category, filters]) =>
              filters.map((filter) => (
                <Badge
                  key={`${category}-${filter}`}
                  variant="primary"
                  size="small"
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => handleFilterToggle(category, filter)}
                >
                  {filter}
                  <ApperIcon name="X" size={12} className="ml-1" />
                </Badge>
              ))
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FilterSidebar;
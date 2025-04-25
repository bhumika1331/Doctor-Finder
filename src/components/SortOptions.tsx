
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SortOptionsProps {
  currentSort?: 'fees' | 'experience';
  onSortChange: (sort?: 'fees' | 'experience') => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-md shadow-sm p-4 mb-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="filter-header-sort"
      >
        <h3 className="font-medium">Sort by</h3>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {isOpen && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="sort-fees"
              data-testid="sort-fees"
              name="sort-option"
              checked={currentSort === 'fees'}
              onChange={() => onSortChange('fees')}
              className="h-4 w-4 text-doctor-blue focus:ring-doctor-blue"
            />
            <label htmlFor="sort-fees" className="ml-2 text-sm">
              Price: Low-High
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="sort-experience"
              data-testid="sort-experience"
              name="sort-option"
              checked={currentSort === 'experience'}
              onChange={() => onSortChange('experience')}
              className="h-4 w-4 text-doctor-blue focus:ring-doctor-blue"
            />
            <label htmlFor="sort-experience" className="ml-2 text-sm">
              Experience: Most Experience first
            </label>
          </div>
          {currentSort && (
            <div className="flex items-center">
              <input
                type="radio"
                id="sort-none"
                name="sort-option"
                checked={!currentSort}
                onChange={() => onSortChange(undefined)}
                className="h-4 w-4 text-doctor-blue focus:ring-doctor-blue"
              />
              <label htmlFor="sort-none" className="ml-2 text-sm">
                None
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SortOptions;

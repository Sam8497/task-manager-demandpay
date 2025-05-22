import React from 'react';
import type { TaskFilter as FilterType } from '../types/Task';
import { ListFilter } from 'lucide-react';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
  taskCounts
}) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex items-center bg-gray-50 rounded-lg p-1.5 mb-5">
      <div className="pr-2 pl-1.5 text-gray-500">
        <ListFilter size={16} />
      </div>
      <div className="flex flex-1 text-sm">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`flex-1 px-3 py-1.5 rounded-md transition-colors ${
              currentFilter === filter.value
                ? 'bg-white text-indigo-700 shadow-sm font-medium'
                : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
            }`}
          >
            {filter.label}
            <span className="ml-1.5 text-xs font-normal rounded-full bg-gray-100 px-1.5 py-0.5">
              {taskCounts[filter.value]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
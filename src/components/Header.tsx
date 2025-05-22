import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';

interface HeaderProps {
  onAddTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 mb-6 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <CheckSquare className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
        </div>
        
        <button
          onClick={onAddTask}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          New Task
        </button>
      </div>
    </header>
  );
};

export default Header;
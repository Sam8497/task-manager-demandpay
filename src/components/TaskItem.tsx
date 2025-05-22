import React, { useState } from 'react';
import type { Task, Priority } from '../types/Task';
import { Check, Trash, Edit, Calendar, Flag } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-red-100 text-red-800'
  };

  const priorityIcons = {
    low: <Flag size={14} className="text-green-600" />,
    medium: <Flag size={14} className="text-amber-600" />,
    high: <Flag size={14} className="text-red-600" />
  };

  return (
    <div 
      className={`group mb-3 p-4 rounded-lg transition-all duration-200 ${
        task.completed 
          ? 'bg-gray-50 border border-gray-200' 
          : 'bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 transition-colors duration-200 ${
            task.completed 
              ? 'bg-indigo-500 border-indigo-500' 
              : 'border-gray-300 hover:border-indigo-500'
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <Check size={14} className="text-white" />}
        </button>
        
        <div className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-1.5">
            <h3 
              className={`text-base font-medium ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            
            <span className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${priorityColors[task.priority]}`}>
              {priorityIcons[task.priority]}
              <span>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
            </span>
          </div>
          
          {task.description && (
            <p className={`text-sm mb-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {task.dueDate && (
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Due: {formatDate(task.dueDate)}</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              Created: {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
        
        <div className={`flex space-x-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
            aria-label="Edit task"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
            aria-label="Delete task"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
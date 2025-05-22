import React, { useState, useEffect } from 'react';
import type { Task, Priority } from '../types/Task';
import { X, Calendar, Flag } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialTask?: Task;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialTask,
  isEditing = false
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  // Initialize form with task data if editing
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setCompleted(initialTask.completed);
      
      if (initialTask.dueDate) {
        // Format date to YYYY-MM-DD for the input
        const formattedDate = new Date(initialTask.dueDate)
          .toISOString()
          .split('T')[0];
        setDueDate(formattedDate);
      }
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      completed,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
    
    // Reset form if not editing
    if (!isEditing) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setCompleted(false);
    }
  };

  const priorityOptions: { value: Priority; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800 border-red-200' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6 animate-slideIn shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h2>
        <button
          onClick={onCancel}
          className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          aria-label="Close form"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add details about this task (optional)"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="flex space-x-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={`flex items-center px-3 py-1.5 rounded-md border text-sm ${
                    priority === option.value
                      ? `${option.color} border-2`
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Flag size={14} className="mr-1.5" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        {isEditing && (
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Mark as completed</span>
            </label>
          </div>
        )}
        
        <div className="flex justify-end space-x-3 mt-5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
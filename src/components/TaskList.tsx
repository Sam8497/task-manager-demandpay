import React from 'react';
import type { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { ListChecks } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit
}) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <ListChecks size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">No tasks found</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          There are no tasks to display. Create a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 animate-fadeIn">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
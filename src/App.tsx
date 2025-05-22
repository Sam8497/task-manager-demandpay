import React, { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { useTasks } from './hooks/useTasks';
import type { Task } from './types/Task';

// Add custom animations to Tailwind
import './index.css';

function App() {
  const { 
    tasks, 
    filter, 
    setFilter, 
    addTask, 
    updateTask, 
    toggleTaskCompletion, 
    deleteTask 
  } = useTasks();
  
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleSubmitForm = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask({
        ...editingTask,
        ...taskData
      });
      setEditingTask(null);
    } else {
      addTask(taskData);
    }
    setShowForm(false);
  };

  // Count tasks for each filter category
  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Header onAddTask={handleAddTask} />
        
        <main className="px-4 pb-10">
          {showForm && (
            <TaskForm
              onSubmit={handleSubmitForm}
              onCancel={handleCancelForm}
              initialTask={editingTask || undefined}
              isEditing={!!editingTask}
            />
          )}
          
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
          
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
            onEdit={handleEditTask}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
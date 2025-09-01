import { useState } from 'react'

// Component 10: Task List (Interactive list with add/remove)
function TaskList({ 
  tasks, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask 
}: { 
  tasks: Array<{ id: number; text: string; completed: boolean; priority: 'high' | 'medium' | 'low' }>; 
  onAddTask: (text: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{
      border: '2px solid #007bff',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f8f9fa',
      maxWidth: '400px'
    }}>
      <h3 style={{ color: '#007bff', marginTop: '0' }}>
        📝 Task Manager ({tasks.length} tasks)
      </h3>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button type="submit" style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Add
          </button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          <p>📋 No tasks yet!</p>
          <p>Add your first task above.</p>
        </div>
      ) : (
        <div>
          {tasks.map(task => (
            <div key={task.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              margin: '8px 0',
              backgroundColor: task.completed ? '#e8f5e8' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '6px',
              opacity: task.completed ? 0.7 : 1
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{
                flex: 1,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#666' : '#333'
              }}>
                {task.text}
              </span>
              <span style={{
                backgroundColor: getPriorityColor(task.priority),
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                marginRight: '10px'
              }}>
                {task.priority}
              </span>
              <button
                onClick={() => onDeleteTask(task.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;

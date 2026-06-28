import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  // Format Date
  const date = new Date(task.createdAt).toLocaleDateString();

  // Status Badge Class
  const statusClass = task.status === 'To Do' ? 'badge-todo' 
                    : task.status === 'In Progress' ? 'badge-in-progress' 
                    : 'badge-done';

  // Priority Badge Class
  const priorityClass = task.priority === 'Low' ? 'badge-low' 
                      : task.priority === 'Medium' ? 'badge-medium' 
                      : 'badge-high';

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', margin: 0 }}>
          {task.title}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => onEdit(task)}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', flex: 1, whiteSpace: 'pre-wrap', margin: 0 }}>
        {task.description}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className={`badge ${statusClass}`}>{task.status}</span>
          <span className={`badge ${priorityClass}`}>{task.priority}</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          {date}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;

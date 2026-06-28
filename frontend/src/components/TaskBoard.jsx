import React from 'react';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks, onEditTask, onDeleteTask }) => {
  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    }}>
      {statuses.map(status => (
        <div key={status} className="glass" style={{
          padding: '1.5rem',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minHeight: '400px'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--surface-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {status}
            <span style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.875rem'
            }}>
              {tasks.filter(t => t.status === status).length}
            </span>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            {tasks.filter(t => t.status === status).map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={onEditTask} 
                onDelete={onDeleteTask} 
              />
            ))}
            {tasks.filter(t => t.status === status).length === 0 && (
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                border: '1px dashed var(--surface-border)',
                borderRadius: '12px',
                padding: '2rem'
              }}>
                No tasks here
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;

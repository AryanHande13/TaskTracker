import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import api from './api';
import TaskBoard from './components/TaskBoard';
import TaskModal from './components/TaskModal';
import Button from './components/ui/Button';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?sortBy=${sortBy}${statusFilter !== 'All' ? `&status=${statusFilter}` : ''}`);
      setTasks(res.data.data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, sortBy]);

  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Error saving task', err);
      alert('Error saving task, please check your input.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task', err);
      }
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Client-side search filtering
  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0, background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TaskFlow
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Organize your work aesthetics</p>
        </div>
        <Button onClick={openCreateModal} variant="gradient" style={{ gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
          <Plus size={18} />
          New Task
        </Button>
      </header>

      <div className="glass" style={{ padding: '1rem', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '250px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '0 1rem', border: '1px solid var(--surface-border)' }}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Filter size={18} color="var(--text-secondary)" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid var(--surface-border)', outline: 'none' }}
          >
            <option value="All">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid var(--surface-border)', outline: 'none' }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <TaskBoard 
        tasks={filteredTasks} 
        onEditTask={openEditModal} 
        onDeleteTask={handleDelete}
      />

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingTask}
        onSubmit={handleCreateOrUpdate}
      />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../authContext';
import axios from 'axios';
import { TASK_API } from '../api/task.api';

export default function TaskDialog({ open, onClose, onTaskAdded, value }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Done');
  const { token } = useAuth();

  useEffect(() => {
    if (value) {
      setTitle(value.title || '');
      setStatus(value.status || 'To Do');
    }
  }, [value]);

  const onSubmit = async () => {
    if (!title) {
      toast.error('Fields can not be empty');
      return;
    }

      onAddTask();
  };

  const onAddTask = async () => {
    try {
      console.log(title,status)
      const res = await axios.post(`${TASK_API}/task`,
        { title, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setStatus('');
      onClose();
      if (onTaskAdded) onTaskAdded();
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error(error?.response?.data.message || error.message);
    }
  };

  

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl relative">
        <h2 className="text-xl font-bold mb-4">
          {value ? 'Update Task' : 'Add a New Task'}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter task details below.
        </p>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Done">Done</option>
          <option value="In Progress">In Progress</option>
          <option value="To Do">To Do</option>
        </select>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {value ? 'Update' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
}

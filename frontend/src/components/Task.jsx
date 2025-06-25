import React, { useState } from 'react'
import TaskDialog from './TaskDialog'
import axios from 'axios';
import { useAuth } from '../authContext';
import toast from 'react-hot-toast';

export default function Task(props) {
  const [openTask, setOpenTask] = useState(false);
  const { token } = useAuth();

  const [task, setTask] = useState({
    id: props.value.id, 
    title: props.value.title,
    status: props.value.status,
  });

  const formatDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const createdAt = props.value.createdAt ? new Date(props.value.createdAt) : null;

  return (
    <div className='p-2 bg-white border rounded-xl h-[5rem]'>
      <div className='w-full h-auto'>
        <div className='flex flex-col'>
          <p className='w-[80%] mx-auto text-x'>
            {createdAt ? formatDate.format(createdAt) : "No Date"} -{" "}
            <span className='font-bold'>{props.value.status}</span>
          </p>
        </div>
      </div>

      <div className=' w-[80%] mx-auto flex gap-3'>
        <h1 className='text-x'>Title - </h1>
        <span className='font-semibold'>{props.value.title}</span>
      </div>

      <TaskDialog
        open={openTask}
        onClose={() => setOpenTask(false)}
        value={task}
        onTaskAdded={props.onTaskUpdated}
      />
    </div>
  );
}

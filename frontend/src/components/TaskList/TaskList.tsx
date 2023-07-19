import AddTask from '../AddTask/AddTask';
import React, { useState, useEffect, useContext } from 'react';
import TaskProvider from '../../store/task-context';
import Task from '../Task/Task';
import { TaskListProps, TaskContextType } from '../../store/types';
import useMediaQuery from '@mui/material/useMediaQuery';

const TaskList = () => {
  const [task, setTask] = useState<TaskListProps[]>([]);
  const taskCtx: TaskContextType = useContext(TaskProvider);
  const matches = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('http://127.0.0.1:8000/', {
          method: 'GET',
        });
        const res = await data.json();
        taskCtx.tasks = [...res.data.todos];
        setTask([...res.data.todos].reverse());
        res.data.todos.forEach((e: TaskListProps) => taskCtx.addTask(e));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setTask([...taskCtx.tasks].reverse());
  }, [taskCtx.tasks]);

  return (
    <>
      {task && task.map((task: TaskListProps) => <Task key={task._id} _id={task._id} title={task.title} description={task.description} />)}
      {matches && <AddTask />}
    </>
  );
};

export default TaskList;

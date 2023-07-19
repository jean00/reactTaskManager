import React, { useReducer, useEffect } from 'react';
import TaskContext from './task-context';

const defaultTasksState = {
  items: [],
  originalItems: [],
};

const taskReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTasks = state.items.concat(action.item);
    return {
      items: updatedTasks,
      originalItems: state.items,
    };
  }

  if (action.type === 'REMOVE') {
    let updatedItems = state.items.filter((item) => item._id !== action.id);
    return {
      items: updatedItems,
      originalItems: state.items,
    };
  }

  if (action.type === 'MODIFY') {
    const index = state.items.findIndex((item) => item._id === action.id);
    let modifiedItem = { ...action.item, _id: action.id };
    const updatedItems = [...state.items];
    updatedItems[index] = modifiedItem;

    return {
      items: updatedItems,
      originalItems: state.items,
    };
  }

  /*   if (action.type === 'FILTER') {
    const updatedItems = action.item;
    return {
      items: updatedItems,
      originalItems: state.items,
    };
  } */

  return defaultTasksState;
};

const TaskProvider = (props) => {
  const [taskState, dispatchTaskAction] = useReducer(taskReducer, defaultTasksState);

  /*   useEffect(() => {
    dispatchTaskAction({
      type: 'FILTER',
      item: taskState.originalItems,
    });
  }, [taskState.originalItems]); */

  const addTaskHandler = (task) => {
    dispatchTaskAction({
      type: 'ADD',
      item: task,
    });
  };
  const removeTaskHandler = (id) => {
    dispatchTaskAction({
      type: 'REMOVE',
      id: id,
    });
  };
  const modifyTaskHandler = (task, id) => {
    dispatchTaskAction({
      type: 'MODIFY',
      item: task,
      id: id,
    });
  };
  const filterTasksHandler = (tasks) => {
    dispatchTaskAction({
      type: 'FILTER',
      item: tasks,
    });
  };

  const taskContext = {
    tasks: taskState.items,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    modifyTask: modifyTaskHandler,
    filterTask: filterTasksHandler,
  };

  return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>;
};

export default TaskProvider;

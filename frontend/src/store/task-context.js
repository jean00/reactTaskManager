import React from 'react';

const taskContext = React.createContext({
  tasks: [],
  originalTasks: [],
  addTask: (task) => {},
  removeTask: (id) => {},
  modifyTask: (task, id) => {},
  filterTask: (tasks) => {},
});

export default taskContext;

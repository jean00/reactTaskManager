export type TaskListProps = {
  _id: string;
  title: string;
  description: string;
};

export type TaskContextType = {
  tasks: TaskListProps[];
  originalTasks: TaskListProps[];
  addTask: (task: TaskListProps) => void;
  removeTask: (id: string) => void;
  modifyTask: (task: TaskListProps, id: string) => void;
  filterTask: (tasks: TaskListProps[]) => void;
};

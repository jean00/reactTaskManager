import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import TaskProvider from '../../store/task-context';
import { TaskListProps } from '../../store/types';

type props = {
  id: string;
  open: boolean;
  onClose: () => void;
};

type setTask = {
  title: string;
  description: string;
};

const TaskModify = ({ id, open, onClose }: props) => {
  const [task, setTask] = useState<setTask>({ title: '', description: '' });
  const [error, setError] = useState<boolean>(false);
  const taskCtx = useContext(TaskProvider);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask((prevState: setTask) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask((prevState: setTask) => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    if (task.title === '' && task.description === '') {
      setError(true);
      return;
    }

    if (task.title === '') {
      let title: TaskListProps = taskCtx.tasks.filter((task: TaskListProps) => task._id === id)[0];
      task.title = title.title;
    }
    if (task.description === '') {
      let description: TaskListProps = taskCtx.tasks.filter((task: TaskListProps) => task._id === id)[0];
      task.description = description.description;
    }

    try {
      await fetch(`http://127.0.0.1:8000/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      event.preventDefault();
      taskCtx.modifyTask(task, id);
      setError(false);
      setTask({ title: '', description: '' });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = (): void => {
    setError(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 50,
        },
      }}
    >
      <DialogTitle>Modify task</DialogTitle>
      <DialogContent>
        <TextField
          error={error}
          helperText={error ? 'Title is empty' : ''}
          sx={{ marginTop: 2, width: '100%' }}
          id="standard-basic"
          label="Task Title"
          variant="outlined"
          onChange={handleTitleChange}
        />
        <TextField
          error={error}
          helperText={error ? 'Description is empty' : ''}
          sx={{ marginTop: 2, width: '100%' }}
          rows={7}
          multiline
          id="outlined-basic"
          label="Task Description"
          variant="outlined"
          onChange={handleDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModify;

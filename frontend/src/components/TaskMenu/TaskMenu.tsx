import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import TaskProvider from '../../store/task-context';

type TaskProps = {
  open: boolean;
  onClose: Function;
};

type TaskObj = {
  title: string;
  description: string;
};

const TaskMenu: React.FunctionComponent<TaskProps> = ({ open, onClose }) => {
  const [task, setTask] = useState<TaskObj>({ title: '', description: '' });
  const [error, setError] = useState<boolean>(false);
  const taskCtx = useContext(TaskProvider);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (task.title.trim().length === 0 || task.description.trim().length === 0) {
      setError(true);
      return;
    }

    try {
      const data = await fetch('http://127.0.0.1:8000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const res = await data.json();
      setTask((prevState) => {
        const updatedTask = {
          _id: res.data.todo._id,
          ...prevState,
        };
        taskCtx.addTask(updatedTask);
        return updatedTask;
      });
    } catch (err) {
      console.log(err);
    }
    setTask({ title: '', description: '' });
    setError(false);
    onClose();
  };

  const handleClose = () => {
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
      <DialogTitle>Add Text</DialogTitle>
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

export default TaskMenu;

import React, { useState } from 'react';
import { Card, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskMenu from '../TaskMenu/TaskMenu';

const AddTask = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <Card
      sx={{
        minWidth: 275,
        marginTop: 13,
        marginLeft: 5,
        width: 300,
        height: 300,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        sx={{
          borderRadius: '70%',
          height: 70,
          width: 60,
          boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.19)',
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Button>

      <TaskMenu open={open} onClose={handleClose} />
    </Card>
  );
};

export default AddTask;

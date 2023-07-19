import React, { useState, useContext } from 'react';
import { Card, Button, CardContent, Typography, CardActions } from '@mui/material';
import TaskProvider from '../../store/task-context';
import ModifyMenu from '../TaskMenu/ModifyMenu';
import { TaskListProps, TaskContextType } from '../../store/types';

const Task = (props: TaskListProps) => {
  console.log(props);
  const { _id, title, description } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false);
  const handleModify = (): void => setModify(true);
  const handleModifyClose = (): void => setModify(false);
  const handleOpen = (): void => setOpen(true);
  const taskCtx: TaskContextType = useContext(TaskProvider);

  const typeStyle = (
    height: {
      0: number;
      1: number | string;
    },
    width: number | null,
    wrapType: string,
    margin: number | null,
    overflowType: string,
    textOvFType: string,
    displayType: string,
    webKitRows: number,
    webKitOrient: string
  ) => ({
    minHeight: height[0],
    maxWidth: width ? width : 275,
    maxHeight: height[1],
    wordBreak: wrapType,
    marginBottom: margin ? margin : 2,
    overflowY: overflowType,
    textOverflow: textOvFType,
    display: displayType,
    WebkitLineClamp: webKitRows,
    WebkitBoxOrient: webKitOrient,
  });

  const handleRemoveTask = async (): Promise<void> => {
    try {
      await fetch(`http://127.0.0.1:8000/delete/${_id}`, {
        method: 'DELETE',
      });
      taskCtx.removeTask(_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          marginTop: 13,
          marginLeft: 5,
          width: 300,
          height: 300,
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            boxShadow: ' 0 0 11px rgba(33,33,33,.2)',
          },
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <CardContent onClick={handleOpen}>
          <Typography variant="h5" component="div" sx={typeStyle([70, 'auto'], 275, 'break-word', null, 'hidden', 'ellipsis', '-webkit-box', 2, 'vertical')}>
            {title}
          </Typography>

          <Typography
            component={description.includes('\n') ? 'ul' : 'div'}
            sx={typeStyle([115, 120], null, 'break-word', null, 'hidden', 'ellipsis', '-webkit-box', 5, 'vertical')}
          >
            {description.includes('\n') ? description.split('\n').map((task, index) => <li key={index}>{task}</li>) : description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '8px',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Button onClick={handleRemoveTask} sx={{ backgroundColor: '#f44336', color: '#fff', marginLeft: '8px', marginRight: '8px' }}>
            Delete
          </Button>
          <Button onClick={handleModify} type="submit" sx={{ backgroundColor: '#0063cc', color: '#fff', marginLeft: '8px', marginRight: '8px' }}>
            Modify
          </Button>
        </CardActions>
      </Card>
      <ModifyMenu id={_id} open={modify} onClose={handleModifyClose} />
    </>
  );
};

export default Task;

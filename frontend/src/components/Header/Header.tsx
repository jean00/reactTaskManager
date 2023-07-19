import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import TaskMenu from '../TaskMenu/TaskMenu';

const Header: React.FC = () => {
  const matches = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  console.log(matches);
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ marginRight: 5 }}>
            Task Tracker
          </Typography>
          {/* Mobile navigation */}
          <Button
            sx={{
              borderRadius: '10%',
              height: 30,
              width: 10,
              display: matches ? 'visible' : 'none',
              position: 'fixed',
              right: 20,
              marginTop: 0.5,
              color: 'white',
            }}
            onClick={handleOpen}
          >
            <AddIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <TaskMenu open={open} onClose={handleClose} />
    </>
  );
};

export default Header;

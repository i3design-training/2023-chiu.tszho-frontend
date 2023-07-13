import {
  Avatar,
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  ToggleButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleProfileClick = () => {
    const name = localStorage.getItem('name');
    navigate(`/users/${name}`);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const navigate = useNavigate();
  const handleTaskClick = () => {
    navigate('/tasks');
  };
  const handleCategoryClick = () => {
    navigate('/categories');
  };
  const handleTagClick = () => {
    // navigate('/Tag');
  };
  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={'20px'}>
        <Typography>TODO-APP</Typography>
        <ToggleButton value="task" onClick={handleTaskClick}>
          Task一覧
        </ToggleButton>
        <ToggleButton value="category" onClick={handleCategoryClick}>
          Categoryから
        </ToggleButton>
        <ToggleButton value="tag" onClick={handleTagClick}>
          Tagから
        </ToggleButton>
        <Box
          component={'button'}
          display={'flex'}
          marginLeft={'auto'}
          alignItems={'center'}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Typography>name</Typography>
          <Avatar></Avatar>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      </Box>

      <Box>{children}</Box>
    </>
  );
}

export default TaskLayout;

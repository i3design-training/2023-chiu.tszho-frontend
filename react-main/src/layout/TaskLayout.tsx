import { Avatar, Box, ToggleButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TaskLayout({ children }: { children: React.ReactNode }) {
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
        <Box display={'flex'} marginLeft={'auto'} alignItems={'center'}>
          <Typography>name</Typography>
          <Avatar></Avatar>
        </Box>
      </Box>
      <Box>{children}</Box>
    </>
  );
}

export default TaskLayout;

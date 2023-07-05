import { useState } from 'react';
import TaskLayout from '../../../layout/TaskLayout';
import { Box, Grid, Typography } from '@mui/material';
import styles from './TaskDetail.module.css';

function TaskDetail() {
  const [taskData, setTaskData] = useState<taskInterface>({
    id: 1,
    name: 'Task 1',
    description: 'Description 1',
    deadline: '2023-07-05',
    category: 'Category 1',
    status: 'In Progress',
    tagName: ['tag1', 'tag2'],
    subTaskName: ['task4', 'task5'],
  });
  return (
    <TaskLayout>
      <Box
        padding={'20px 20% 20px 20%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Typography className={styles.title} variant="h2">
          Task詳細
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography>Name:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography border={1}>{taskData.name}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>description:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography border={1}>{taskData.description}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>Category:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography border={1}>{taskData.category}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>status:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography border={1}>{taskData.status}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>deadline:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography border={1}>{taskData.deadline}</Typography>
          </Grid>
        </Grid>
      </Box>
    </TaskLayout>
  );
}

export default TaskDetail;

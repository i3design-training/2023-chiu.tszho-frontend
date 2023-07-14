import { useEffect, useState } from 'react';
import TaskLayout from '../../../layout/TaskLayout';
import { Box, Grid, Typography } from '@mui/material';
import styles from './TaskDetail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TaskDetail() {
  const { task_id } = useParams();
  const token = localStorage.getItem('token');
  const [taskData, setTaskData] = useState<taskInterface>({
    id: task_id,
    title: 'loading',
    description: 'loading',
    due_date: null,
    category_id: '',
    category_name: 'loading',
    status_id: '',
    status_name: 'loading',
    priority_id: null,
    tagID: [],
    subTaskID: [],
  });
  const getTask = async () => {
    await axios
      .get(`http://localhost:8000/api/task/${task_id}`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        setTaskData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTask();
  }, []);
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
            <Typography>Title:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography border={1}>{taskData.title}</Typography>
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
            <Typography border={1}>{taskData.category_name}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>status:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography border={1}>{taskData.status_name}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>due_date:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography border={1}>{taskData.due_date}</Typography>
          </Grid>
        </Grid>
      </Box>
    </TaskLayout>
  );
}

export default TaskDetail;

import SearchBar from '@mkyy/mui-search-bar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import TaskLayout from '../../../layout/TaskLayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskList() {
  const token = localStorage.getItem('token');
  const [haveTask, setHaveTask] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<taskInterface[]>([]);
  const navigate = useNavigate();
  function handleDetailClick(task_id: string) {
    navigate('/tasks/' + task_id);
  }

  function handleEditClick(task_id: string) {
    navigate(`/tasks/${task_id}/edit`);
  }
  function handleNewTaskClick() {
    navigate(`/tasks/create`);
  }

  useEffect(() => {
    getTask();
  }, []);
  const getTask = () => {
    axios
      .get('http://localhost:8000/api/tasks', {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        setTaskList(response.data);
        setHaveTask(true);
      })
      .catch((error) => {
        alert(error.response.data);
        navigate('/login');
      });
  };

  return (
    <TaskLayout>
      <>
        <SearchBar></SearchBar>
        <Button onClick={handleNewTaskClick}>新しいタスク？</Button>
        {haveTask ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>カテゴリ</TableCell>
                    <TableCell>task名</TableCell>
                    <TableCell>期限</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>Subtask</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>編集</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taskList.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.category_name}</TableCell>
                      <TableCell>
                        <Typography fontSize={24}>{task.title}</Typography>
                        <Typography>{task.description}</Typography>
                      </TableCell>
                      <TableCell>{task.due_date}</TableCell>
                      <TableCell>{task.status_name}</TableCell>
                      <TableCell>
                        {task.subTaskID &&
                          task.subTaskID.map((subTask, index) => (
                            <Typography key={index}>{subTask},</Typography>
                          ))}
                      </TableCell>
                      <TableCell>
                        <Box display={'flex'} flexDirection={'column'}>
                          <Button
                            onClick={() =>
                              task.id !== undefined &&
                              handleDetailClick(task.id)
                            }
                          >
                            詳細
                          </Button>
                          <Button
                            onClick={() =>
                              task.id !== undefined && handleEditClick(task.id)
                            }
                          >
                            edit
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Box display={'flex'} justifyContent={'space-evenly'}>
              <Typography variant="h3">Taskがまだないですよ</Typography>
            </Box>
          </>
        )}
      </>
    </TaskLayout>
  );
}

export default TaskList;

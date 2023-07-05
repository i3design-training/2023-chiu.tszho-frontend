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
import { useState } from 'react';
import TaskLayout from '../../../layout/TaskLayout';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const [taskList, setTaskList] = useState<taskInterface[]>([
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      deadline: '2023-07-05',
      category: 'Category 1',
      status: 'In Progress',
      tagName: ['tag1', 'tag2'],
      subTaskName: ['task4', 'task5'],
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      deadline: '2023-07-10',
      category: 'Category 2',
      status: 'Done',
      tagName: ['tag1', 'tag2'],
      subTaskName: ['task4', 'task5'],
    },
  ]);
  const navigate = useNavigate();
  function handleDetailClick(task_id: number) {
    navigate('/tasks/' + task_id);
  }

  function handleEditClick(task_id: number) {
    navigate(`/tasks/${task_id}/edit`);
  }
  function handleNewTaskClick() {
    navigate(`/tasks/create`);
  }

  return (
    <TaskLayout>
      <>
        <SearchBar></SearchBar>
        <Button onClick={handleNewTaskClick}>新しいタスク？</Button>
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
                  <TableCell>{task.category}</TableCell>
                  <TableCell>
                    <Typography fontSize={24}>{task.name}</Typography>
                    <Typography>{task.description}</Typography>
                  </TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    {task.subTaskName &&
                      task.subTaskName.map((subTask, index) => (
                        <Typography key={index}>{subTask},</Typography>
                      ))}
                  </TableCell>
                  <TableCell>
                    <Box display={'flex'} flexDirection={'column'}>
                      <Button
                        onClick={() =>
                          task.id !== undefined && handleDetailClick(task.id)
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
    </TaskLayout>
  );
}

export default TaskList;

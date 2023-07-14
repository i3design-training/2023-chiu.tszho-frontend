import {
  Box,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TaskLayout from '../../../layout/TaskLayout';
import styles from './TaskCreate.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskCreate() {
  const token = localStorage.getItem('token');
  const [taskData, setTaskData] = useState<taskInterface>({
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
  //formControl用のsubmit
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // フォームの送信処理などを実行する
    postTask();
  };
  //send task data to server
  const postTask = () => {
    const jsonData = JSON.stringify(taskData);
    axios
      .post('http://localhost:8000/api/task', jsonData, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        navigate(`/tasks/`);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  //Category関係
  const [categoriesList, setCategoriesList] = useState<categoriesInterface[]>([
    { name: 'loading' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
    const { name, value } = event.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getCategories = () => {
    axios
      .get(`http://localhost:8000/api/categories`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        setCategoriesList(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
        navigate('/login');
      });
  };

  // Date関係
  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
    setTaskData((prevState) => ({
      ...prevState,
      due_date: formattedDate,
    }));
  };

  //status関係
  const [statusList, setStatusList] = useState<taskStatusInterface[]>([
    { name: 'loading' },
  ]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
    const { name, value } = event.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getTaskStatus = () => {
    axios
      .get(`http://localhost:8000/api/taskStatus`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        setStatusList(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
        navigate('/login');
      });
  };

  useEffect(() => {
    getCategories();
    getTaskStatus();
  }, []);

  return (
    <TaskLayout>
      <>
        <Box
          padding={'20px 20% 20px 20%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={'30px'}
        >
          <Typography className={styles.title} variant="h2">
            Task作成
          </Typography>
          <FormControl sx={{ width: '70%', gap: '30px' }} component="form">
            <TextField
              label="Task名"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              required
            ></TextField>
            <TextField
              label="Task内容"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              required
            ></TextField>
          </FormControl>
          <FormControl sx={{ width: '70%', gap: '30px' }} component="fieldset">
            <InputLabel required id="demo-simple-select-label">
              Category
            </InputLabel>
            <Select
              label="Category"
              name="category_id"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categoriesList.map((category) => (
                <MenuItem key={category.name} value={category.id}>
                  {category.name}
                  {/* TODO::ADD new category */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: '70%', gap: '30px' }} component="form">
            <InputLabel required id="demo-simple-select-label">
              Status
            </InputLabel>
            <Select
              label="status"
              value={selectedStatus}
              name="status_id"
              onChange={handleStatusChange}
            >
              {statusList.map((status) => (
                <MenuItem key={status.name} value={status.id}>
                  {status.name}
                  {/* TODO::ADD new status */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '70%', gap: '30px' }} component="form">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={handleDateChange} />
            </LocalizationProvider>
          </FormControl>
          <FormControl
            sx={{ width: '70%', gap: '30px' }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Button type="submit">作成する</Button>
          </FormControl>
        </Box>
      </>
    </TaskLayout>
  );
}

export default TaskCreate;

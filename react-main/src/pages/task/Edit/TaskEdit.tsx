import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import TaskLayout from '../../../layout/TaskLayout';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './TaskEdit.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function TaskEdit() {
  const { task_id } = useParams();
  const token = localStorage.getItem('token');

  //task関係
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
  const setSelectedCategoryAndStatus = async () => {
    setSelectedStatus(taskData.status_id ?? '');
    setSelectedCategory(taskData.category_id ?? '');
    // setSelectedDate(dayjs('2018-08-07'));
    console.log(selectedDate);
  };

  const sendTask = () => {
    axios
      .put(`http://localhost:8000/api/task/${task_id}`, taskData, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //status関係
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [statusList, setStatusList] = useState<taskStatusInterface[]>([
    { name: 'loading' },
  ]);
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

  //Category関係
  const [categoriesList, setCategoriesList] = useState<categoriesInterface[]>([
    { name: 'loading' },
  ]);

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
        console.log(error);
      });
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
    const { name, value } = event.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //date関係
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
    setTaskData((prevState) => ({
      ...prevState,
      due_date: formattedDate,
    }));
  };

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
    console.log(taskData);
    sendTask();
    navigate(`/tasks/${taskData.id}/`);
  };

  useEffect(() => {
    getCategories();
    getTaskStatus();
    getTask();
  }, []);
  useEffect(() => {
    setSelectedCategoryAndStatus();
  }, [taskData]);

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
            Task編集
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
                </MenuItem>
              ))}
              {/* TODO::ADD new category */}
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
              <DatePicker
                // defaultValue={dayjs(selectedDate)}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl
            sx={{ width: '70%', gap: '30px' }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Button type="submit">変更完了</Button>
          </FormControl>
        </Box>
      </>
    </TaskLayout>
  );
}

export default TaskEdit;

import {
  Box,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TaskLayout from '../../../layout/TaskLayout';
import styles from './TaskCreate.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function TaskCreate() {
  const [taskData, setTaskData] = useState<taskInterface>({
    name: '',
    description: '',
    deadline: '',
    category: '',
    status: 'TODO',
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
    console.log('ユーザー名:', taskData.name);
    console.log('パスワード:', taskData.description);
    console.log(taskData);
    navigate(`/tasks/`);
  };

  //Category関係
  const [categoriesList, setCategoriesList] = useState<string[]>([
    'Categories1',
    'Categories2',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  // Date関係
  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
    setTaskData((prevState) => ({
      ...prevState,
      deadline: formattedDate,
    }));
  };

  //status関係
  const [selectedStatus, setSelectedStatus] = useState('');
  const handleStatusChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
              name="name"
              value={taskData.name}
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
            <Select
              label="Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categoriesList.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
              {/* <MenuItem value="add">
            <Button onClick={handleAdding}>新しいカテゴリ追加</Button>
          </MenuItem> */}
            </Select>
            {/* TODO::ADD new category */}
            {/* {addingCategory ? (
          <>
            <TextField></TextField>
            <Button>追加</Button>
          </>
        ) : (
          <></>
        )} */}
          </FormControl>
          <FormControl sx={{ width: '70%', gap: '30px' }} component="form">
            <Select
              label="status"
              value={selectedStatus}
              name="status"
              onChange={handleStatusChange}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
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

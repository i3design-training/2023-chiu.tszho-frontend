import { ChangeEvent, FormEvent, useState } from 'react';
import TaskLayout from '../../../layout/TaskLayout';
import {
  Box,
  Button,
  FormControl,
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
import { useNavigate } from 'react-router-dom';

function TaskEdit() {
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

  //status関係
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Category関係
  const [categoriesList, setCategoriesList] = useState<string[]>([
    'Categories1',
    'Categories2',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const handleAdding = () => {
    // if (selectedCategory.trim() !== '') {
    //   setCategoriesList((prevCategories) => [
    //     ...prevCategories,
    //     selectedCategory,
    //   ]);
    //   setSelectedCategory('');
    // }
    setAddingCategory(true);
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
    setTaskData((prevState) => ({
      ...prevState,
      deadline: formattedDate,
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
    console.log('ユーザー名:', taskData.name);
    console.log('パスワード:', taskData.description);
    console.log(taskData);
    navigate(`/tasks/${taskData.id}/`);
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
          <FormControl
            sx={{ width: '70%', gap: '30px' }}
            component="form"
            onSubmit={handleSubmit}
          >
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
            <Button type="submit">変更完了</Button>
          </FormControl>
        </Box>
      </>
    </TaskLayout>
  );
}

export default TaskEdit;

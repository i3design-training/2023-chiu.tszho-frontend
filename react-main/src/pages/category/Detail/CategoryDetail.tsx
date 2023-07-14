import { Typography } from '@material-ui/core';
import TaskLayout from '../../../layout/TaskLayout';
import styles from './CategoryDetail.module.css';
import { Box, Button, Input, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CategoryDetail() {
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState<categoriesInterface>({
    name: '',
  });
  const handleCategoryNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory({ name: event?.target.value });
  };

  const getCategories = () => {
    axios
      .get(`http://localhost:8000/api/categories`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        setCategory(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  const handleSubmit = () => {};
  return (
    <TaskLayout>
      <Typography className={styles.title} variant="h2">
        Category作成
      </Typography>
      <Box
        padding={'20px 20% 20px 20%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={'30px'}
      >
        <TextField
          label="カテゴリ名"
          name="categoryName"
          value={category.name}
          onChange={handleCategoryNameChange}
          required
        />
        <Button onClick={handleSubmit}>作成</Button>
      </Box>
    </TaskLayout>
  );
}

export default CategoryDetail;

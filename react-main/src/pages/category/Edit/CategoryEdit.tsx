import { Typography, Box, TextField, Button } from '@mui/material';
import TaskLayout from '../../../layout/TaskLayout';
import styles from './CategoryEdit.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryEdit() {
  const { category_id } = useParams();
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState<categoriesInterface>({
    name: 'loading',
  });
  const handleCategoryNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory({ name: event?.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    updateCategory();
  };
  const getCategory = () => {
    axios
      .get(`http://localhost:8000/api/categories/${category_id}`, {
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

  const updateCategory = () => {
    axios
      .put(`http://localhost:8000/api/categories/${category_id}`, category, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        navigate(`/categories/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <TaskLayout>
      <Typography className={styles.title} variant="h2">
        Category編集
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

export default CategoryEdit;

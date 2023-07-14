import { Box, Button, Typography } from '@mui/material';
import TaskLayout from '../../../layout/TaskLayout';
import { useEffect, useState } from 'react';
import styles from './CategoryList.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CategoryList() {
  const token = localStorage.getItem('token');
  const [categoriesList, setCategoriesList] = useState<categoriesInterface[]>([
    { id: '', name: 'loading' },
  ]);
  const navigate = useNavigate();
  const handleAddCategory = () => {
    navigate(`/categories/create`);
  };
  const handleEditCategory = (category_id: string) => {
    navigate(`/categories/${category_id}/edit`);
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <TaskLayout>
      <Typography className={styles.title} variant="h2">
        Category一覧
      </Typography>
      <Box
        padding={'20px 20% 20px 20%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={'30px'}
      >
        <Button onClick={handleAddCategory}>新しいcategoryを追加？</Button>
        {categoriesList.map((category, index) => (
          <Box key={index}>
            <Button>{category.name}</Button>
            <Button onClick={() => handleEditCategory(category.id ?? '')}>
              編集
            </Button>
          </Box>
        ))}
      </Box>
    </TaskLayout>
  );
}

export default CategoryList;

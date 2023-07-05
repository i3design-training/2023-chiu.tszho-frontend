import { Box, Button, Typography } from '@mui/material';
import TaskLayout from '../../../layout/TaskLayout';
import { useState } from 'react';
import styles from './CategoryList.module.css';
import { useNavigate } from 'react-router-dom';

function CategoryList() {
  const [categoriesList, setCategoriesList] = useState<string[]>([
    'Categories1',
    'Categories2',
  ]);
  const navigate = useNavigate();
  const handleAddCategory = () => {
    navigate(`/categories/create`);
  };
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
          <Box>
            <Button key={index}>{category}</Button>
            <Button>編集</Button>
          </Box>
        ))}
      </Box>
    </TaskLayout>
  );
}

export default CategoryList;

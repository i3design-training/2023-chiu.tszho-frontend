import { Typography } from '@material-ui/core';
import TaskLayout from '../../../layout/TaskLayout';
import styles from './CategoryCreate.module.css';
import { Box, Button, Input, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryCreate() {
  const [categoryName, setCategoryName] = useState('');
  const handleCategoryNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event?.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log(categoryName);
    navigate(`/categories/`);
  };
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
          value={categoryName}
          onChange={handleCategoryNameChange}
          required
        />
        <Button onClick={handleSubmit}>作成</Button>
      </Box>
    </TaskLayout>
  );
}

export default CategoryCreate;

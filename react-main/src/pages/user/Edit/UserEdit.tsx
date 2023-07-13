import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Avatar,
} from '@mui/material';
import styles from './UserEdit.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserEdit() {
  const token = localStorage.getItem('token');
  useEffect(() => {
    getUserDate();
  }, []);

  const getUserDate = () => {
    axios
      .get(`http://localhost:8000/api/users`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
        navigate('/login');
      });
  };

  const [formData, setFormData] = useState<userInterface>({
    id: '',
    name: '',
    email: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // フォームの送信処理などを実行する
    sendUserData();

    navigate('/users/edit');
  };

  const sendUserData = () => {
    axios
      .put(`http://localhost:8000/api/users/${formData.id}`, formData, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <Box
      padding={'20px 20% 20px 20%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Typography className={styles.title} variant="h2">
        User編集
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'space-evenly'}
        flexWrap={'wrap'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={'30px'}
        marginBottom={'30px'}
      >
        <Avatar sizes="10px" sx={{ width: 80, height: 80 }} />
        <Button variant="contained" color="primary">
          写真をupload
        </Button>
      </Box>
      <FormControl
        sx={{ width: '70%', gap: '30px' }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="ユーザー名"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          編集完了
        </Button>
      </FormControl>
    </Box>
  );
}

export default UserEdit;

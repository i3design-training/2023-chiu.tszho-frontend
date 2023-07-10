import {
  FormControl,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from '@mui/material';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import styles from './Register.module.css';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const [showPrepassword, setShowPrepassword] = useState(false);
  const handleClickShowPrepassword = () => setShowPrepassword((show) => !show);
  const handleMouseDownPrepassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const sendUserData = async () => {
    const jsonData = JSON.stringify(formData);
    console.log(jsonData);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/users',
        jsonData,
      );
      alert('OMG');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState<userInterface>({
    name: '',
    email: '',
    password: '',
    email_verified: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    sendUserData();
    // フォームの送信処理などを実行する
  };
  const submit = () => {
    sendUserData();
  };

  return (
    <Box
      padding={'20px 20% 20px 20%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'30px'}
    >
      <Typography className={styles.title} variant="h2">
        新規登録
      </Typography>
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
        <TextField
          label="パスワード"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="パスワード再確認"
          type={showPrepassword ? 'text' : 'password'}
          name="password再確認"
          onChange={handleInputChange}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPrepassword}
                  onMouseDown={handleMouseDownPrepassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Button onClick={submit} variant="contained" color="primary">
        新規登録
      </Button>
    </Box>
  );
}

export default Register;

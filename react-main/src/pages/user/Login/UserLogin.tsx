import {
  FormControl,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from '@mui/material';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './UserLogin.module.css';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginFormState {
  email: string;
  password: string;
}

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const sendUserData = async () => {
    const jsonData = JSON.stringify(formData);
    console.log(jsonData);

    try {
      const response = await axios.post(
        'http://localhost:8000/login',
        jsonData,
      );

      // トークンをローカルストレージに保存する
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      navigate('/tasks');
    } catch (error) {
      console.log(error);
      alert('login失敗');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendUserData();
  };

  return (
    <Box
      padding={'20px 20% 20px 20%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Typography className={styles.title} variant="h2">
        Login
      </Typography>
      <FormControl
        sx={{ width: '70%', gap: '30px' }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          // TextFieldの幅を100%に設定
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
          sx={{ width: '100%' }} // TextFieldの幅を100%に設定
        />
        <Button type="submit" variant="contained" color="primary">
          ログイン
        </Button>
      </FormControl>
    </Box>
  );
}

export default UserLogin;

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

interface LoginFormState {
  username: string;
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
    username: '',
    password: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // フォームの送信処理などを実行する
    console.log('ユーザー名:', formData.username);
    console.log('パスワード:', formData.password);
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
        Login
      </Typography>
      <FormControl
        sx={{ width: '70%' }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="ユーザー名"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          // TextFieldの幅を100%に設定
        />
      </FormControl>
      <FormControl sx={{ width: '70%' }}>
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
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        ログイン
      </Button>
    </Box>
  );
}

export default UserLogin;

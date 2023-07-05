import {
  Box,
  Typography,
  Grid,
  Input,
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
  TextField,
} from '@mui/material';
import styles from './UserEdit.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { VisibilityOff, Visibility } from '@material-ui/icons';

interface EditFormState {
  username: string;
  // profile_picture: string;
  email: string;
  password: string;
}

function UserEdit() {
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

  const [formData, setFormData] = useState<EditFormState>({
    username: '',
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
    >
      <Typography className={styles.title} variant="h2">
        User編集
      </Typography>
      <FormControl
        sx={{ width: '70%', gap: '30px' }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="ユーザー名"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.username}
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
        <Button type="submit" variant="contained" color="primary">
          ログイン
        </Button>
      </FormControl>
    </Box>
  );
}

export default UserEdit;

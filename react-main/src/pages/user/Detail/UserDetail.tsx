import { VisibilityOff, Visibility } from '@material-ui/icons';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Input,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import styles from './UserDetail.module.css';

function UserDetail() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <Box padding={'20px 20% 20px 20%'} textAlign={'center'}>
      <Typography className={styles.title} variant="h2">
        User詳細
      </Typography>
      <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
        <Avatar sizes="10px" sx={{ width: 80, height: 80 }} />
        <Button>Upload</Button>
        <Grid sx={{ lineHeight: '80px' }} container>
          <Grid textAlign={'left'} item xs={4}>
            email:asd
          </Grid>
          <Grid item xs={8}>
            <Input />
          </Grid>
          <Grid textAlign={'left'} item xs={4}>
            username:
          </Grid>
          <Grid item xs={8}>
            <Input />
          </Grid>
          <Grid textAlign={'left'} item xs={4}>
            password:
          </Grid>
          <Grid item xs={8}>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
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
              }
            />
          </Grid>

          <Grid textAlign={'left'} item xs={4}>
            password再確認:
          </Grid>
          <Grid item xs={8}>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
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
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default UserDetail;

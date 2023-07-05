import { VisibilityOff, Visibility } from '@material-ui/icons';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import styles from './UserDetail.module.css';
import { useNavigate } from 'react-router-dom';

function UserDetail() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/users/edit');
  };
  return (
    <Box
      display={'flex'}
      padding={'20px 20% 20px 20%'}
      textAlign={'center'}
      flexDirection={'column'}
      gap={'30px'}
    >
      <Typography className={styles.title} variant="h2">
        User詳細
      </Typography>
      <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
        <Avatar sizes="10px" sx={{ width: 80, height: 80 }} />
      </Box>

      <Grid sx={{ lineHeight: '80px' }} container alignItems={'center'}>
        <Grid textAlign={'left'} item xs={4}>
          email:
        </Grid>
        <Grid item xs={8}>
          <Typography>youremail@xxxxx.com</Typography>
        </Grid>
        <Grid textAlign={'left'} item xs={4}>
          username:
        </Grid>
        <Grid item xs={8}>
          <Typography>your username</Typography>
        </Grid>
        <Grid textAlign={'left'} item xs={4}>
          password:
        </Grid>
        <Grid item xs={8}>
          <OutlinedInput
            disabled
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
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        編集
      </Button>
    </Box>
  );
}

export default UserDetail;

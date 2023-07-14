import { Box, Typography, Avatar, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './UserDetail.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserDetail() {
  const [userProfile, setUserProfile] = useState<userInterface>({
    id: 'loading',
    name: 'loading',
    email: 'loading',
    password: 'loading',
  });

  const navigate = useNavigate();
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/users/edit');
  };

  useEffect(() => {
    getUserDate();
  }, []);

  const getUserDate = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:8000/api/users`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
        navigate('/login');
      });
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
          <Typography>{userProfile.email}</Typography>
        </Grid>
        <Grid textAlign={'left'} item xs={4}>
          username:
        </Grid>
        <Grid item xs={8}>
          <Typography>{userProfile.name}</Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        編集
      </Button>
    </Box>
  );
}

export default UserDetail;

import { Box, Grid, Input, Typography } from '@mui/material';
import styles from './Register.module.css';
function Register() {
  return (
    <>
      <Box padding={'20px 20% 20px 20%'} textAlign={'center'}>
        <Typography className={styles.title} variant="h2">
          新規登録
        </Typography>
        <Box>
          <Grid sx={{ lineHeight: '80px' }} container>
            <Grid textAlign={'left'} item xs={4}>
              username:
            </Grid>
            <Grid item xs={8}>
              <Input />
            </Grid>
            <Grid textAlign={'left'} item xs={4}>
              email:
            </Grid>
            <Grid item xs={8}>
              <Input />
            </Grid>
            <Grid textAlign={'left'} item xs={4}>
              password:
            </Grid>
            <Grid item xs={8}>
              <Input />
            </Grid>
            <Grid textAlign={'left'} item xs={4}>
              password再確認:
            </Grid>
            <Grid item xs={8}>
              <Input />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Register;

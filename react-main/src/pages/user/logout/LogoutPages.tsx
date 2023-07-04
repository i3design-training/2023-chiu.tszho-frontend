import { Box, Typography, Grid, Input } from '@mui/material';
import styles from './Logout.module.css';

function LogoutPages() {
  return (
    <Box padding={'20px 20% 20px 20%'} textAlign={'center'}>
      <Typography className={styles.title} variant="h2">
        Logout
      </Typography>
      <Box>
        <Typography>Logout成功なのです。</Typography>
        <Typography>またサービのご利用をお持ちします</Typography>
      </Box>
    </Box>
  );
}

export default LogoutPages;

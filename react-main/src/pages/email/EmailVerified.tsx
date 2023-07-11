import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EmailVerified() {
  const { token } = useParams();
  useEffect(() => {
    emailVerified();
  }, []);
  const emailVerified = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/emailVerifiy/' + token,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box>メール認証成功です、おめでとうございます</Box>
    </>
  );
}

export default EmailVerified;

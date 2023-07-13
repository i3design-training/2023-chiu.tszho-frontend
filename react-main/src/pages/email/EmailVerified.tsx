import { Link } from '@mui/material';
import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EmailVerified() {
  const { token } = useParams();
  useEffect(() => {
    emailVerified();
  }, []);

  type date = {
    token: string;
  };
  const [data, setData] = useState<date>({ token: '' });
  console.log(data);
  const emailVerified = async () => {
    console.log(token);
    try {
      const response = await axios.post(
        'http://localhost:8000/emailVerifiy/' + token,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box>メール認証成功です、おめでとうございます</Box>
      <Link>http://localhost:8000/login/</Link>
    </>
  );
}

export default EmailVerified;

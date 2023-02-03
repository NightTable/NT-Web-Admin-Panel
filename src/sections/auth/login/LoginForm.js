import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack sx={{ paddingTop: 4 }} spacing={3}>
        <TextField
          className={styles.textField}
          name="email"
          label="Email address"
          InputProps={{
            classes: {
              //    notchedOutline: classes.notchedOutline
            },
          }}
        />

        <TextField
          sx={{ borderColor: '#E4D0B5', borderWidth: 1 }}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack sx={{ paddingTop: 4 }}></Stack>
      <LoadingButton
        fullWidth
        size="large"
        color="info"
        type="submit"
        variant="outlined"
        loadingPosition={'center'}
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}

const styles = {
  root: {
    // - The TextField-root
    border: 'solid 3px #0ff', // - For demonstration: set the TextField-root border
    padding: '3px', // - Make the border more distinguishable

    // (Note: space or no space after `&` matters. See SASS "parent selector".)
    '& .MuiOutlinedInput-root': {
      // - The Input-root, inside the TextField-root
      '& fieldset': {
        // - The <fieldset> inside the Input-root
        borderColor: 'pink', // - Set the Input border
      },
      '&:hover fieldset': {
        borderColor: 'yellow', // - Set the Input border when parent has :hover
      },
      '&.Mui-focused fieldset': {
        // - Set the Input border when parent is focused
        borderColor: 'green',
      },
    },
  },
};

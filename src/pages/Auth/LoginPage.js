import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/logo';
// sections
import  LoginForm from '../../components/Auth/LoginForm';

// ----------------------------------------------------------------------
export const getGreetingMsg = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr >= 0 && curHr < 6) {
    return 'Good Morning!';
  } else if (curHr >= 6 && curHr < 12) {
    return 'Good Morning!';
  } else if (curHr >= 12 && curHr < 17) {
    return 'Good Afternoon! ';
  } else {
    return 'Good Evening!';
  }
};
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: 'black',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');



  return (
    <>
      <Helmet>
        <title> Login | Night Table Admin's Dashboard </title>
      </Helmet>

      <StyledRoot style={{ backgroundColor: 'black' }}>
        {mdUp && (
          <StyledSection>
            <img style={{ height: 300 }} src="/assets/logo/logo.png" alt="login" />
          </StyledSection>
        )}

        <Container sx={{ backgroundColor: 'black' }} maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" sx={{ color: '#E4D0B5' }}>
              {getGreetingMsg()} Admin
            </Typography>

            <Typography sx={{ color: '#E4D0B5' }} variant="h3" gutterBottom>
              Sign in to Night Table
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import palette from 'src/theme/palette';
import { getGreetingMsg } from 'src/utils/Utils';
import useResponsive from '../../hooks/useResponsive';
// COMPONENT
import LoginForm from '../../features/Auth/LoginForm';
// IMAGE
import logoImg from '../../assets/logo-bg.png';
// THEME
// UTILS
// CSS
import { StyledRoot, StyledContent, StyledSection } from './css/css';

// Main function
export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  return (
    <>
      <Helmet>
        <title> Login | Night Table Admin's Dashboard </title>
      </Helmet>

      <StyledRoot style={{ backgroundColor: palette.common.black }}>
        {mdUp && (
          <StyledSection>
            <img style={{ height: 300 }} src={logoImg} alt='login' />
          </StyledSection>
        )}
        <Container sx={{ backgroundColor: palette.common.black }} maxWidth='sm'>
          <StyledContent>
            <Typography variant='h4' sx={{ color: palette.primary.gold }}>
              {getGreetingMsg()} Admin
            </Typography>

            <Typography
              sx={{ color: palette.primary.gold }}
              variant='h3'
              gutterBottom
            >
              Sign in to Night Table
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './features/scroll-to-top';
// import {Offline, Online} from 'react-detect-offline';

// ----------------------------------------------------------------------

export default function App () {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Router />
    </ThemeProvider>
  );
}

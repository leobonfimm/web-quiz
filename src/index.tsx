import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import App from './App';
import theme from './styles/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

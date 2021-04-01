import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/modules/dashboard-360/components/GlobalStyles';
import 'src/modules/dashboard-360/mixins/chartjs';
import theme from 'src/modules/dashboard-360/theme';
import { Provider } from 'react-redux';
import rootStore from './redux/store';
import MainLoader from './components/MainLoader';
import Main from './Main';
// import Axios from 'axios';

// Axios.defaults.baseURL = '/ui';
// Axios.defaults.withCredentials = true;


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <React.Suspense fallback={<MainLoader />}>
            <div className={classes.root}>
              <GlobalStyles />
              <Main classes={classes} />
            </div>
          </React.Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
export default App;

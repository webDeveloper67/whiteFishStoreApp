import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { purple, deepPurple } from '@material-ui/core/colors';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxToastr from 'react-redux-toastr';

// LAYOUT
import Landing from './landing/LandingPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8561c5',
      main: '#673ab7',
      dark: '#482880',
      contrastText: '#fff'
    },
    secondary: {
      light: '#dd33fa',
      main: '#d500f9',
      dark: '#9500ae',
      contrastText: '#fff'
    },
    openTitle: purple['400'],
    protectedTitle: deepPurple['400'],
    type: 'light'
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" component={Landing} />
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
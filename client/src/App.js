import React, { useEffect } from 'react';
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
import { loadUser } from './redux/actions/auth';

// LAYOUT
import Landing from './landing/LandingPage';
import Menu from './layout/Menu';

// Shop component
import Shops from './Features/Shops/Shops';
import Shop from './Features/Shop/Shop';
import MyShops from './Features/OwnShops/MyShops';
import NewShop from './Features/OwnShops/NewShop';
import EditShop from './Features/OwnShops/EditShop';

// AUTH
import Register from './auth/Register';
import SignIn from './auth/SignIn';

// Utils
import _ from 'lodash';
import setAuthToken from './utils/auth-helper';
import PrivateRoute from './utils/PrivateRoute';

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

let cookieValue = document.cookie.replace(
  /(?:(?:^|.*;\s*)jwt=\s*\s*([^;]*).*$)|^.*$/,
  '$1'
);
_.startsWith('jwt=', cookieValue);
_.split(cookieValue, '; ', 2);
if (cookieValue) {
  setAuthToken(cookieValue);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Menu />
          <Route exact path="/" component={Landing} />
          <ReduxToastr
            timeOut={4000}
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
          />
          <Switch>
            <Route exact path="/signup" component={Register} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/shops/all" component={Shops} />
            <Route exact path="/shops/:shopId" component={Shop} />
            <PrivateRoute exact path="/seller/shops" component={MyShops} />
            <PrivateRoute exact path="/seller/shop/new" component={NewShop} />
            <PrivateRoute
              exact
              path="/seller/shop/edit/:shopId"
              component={EditShop}
            />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;

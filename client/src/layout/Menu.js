import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logout } from './../redux/actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  styledLink: {
    textDecoration: 'none'
  }
}));

const Menu = ({ history, logout, auth }) => {
  const classes = useStyles();

  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ffeb3b' };
    else return { color: '#ffffff' };
  };

  const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path)) return { color: '#ffeb3b' };
    else return { color: '#ffffff' };
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" variant="h6" color="inherit">
          FREESHOP
        </Typography>
        <div>
          <Link to="/" className={classes.styledLink}>
            <Button style={isActive(history, '/')}>Home</Button>
          </Link>
          <Link to="/shops/all" className={classes.styledLink}>
            <Button style={isActive(history, '/shops/all')}>All Shops</Button>
          </Link>
          <Link to="/cart" className={classes.styledLink}>
            <Button style={isActive(history, '/cart')}>
              Cart
              <Badge color="secondary" style={{ marginLeft: '7px' }}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Badge>
            </Button>
          </Link>
        </div>
        <div
          style={{
            position: 'absolute',
            right: '10px'
          }}
        >
          <span style={{ float: 'right' }}>
            {!auth.isAuthenticated &&
              <span>
                <Link to="/signup" className={classes.styledLink}>
                  <Button style={isActive(history, '/signup')}>Sign up</Button>
                </Link>
                <Link to="/signin" className={classes.styledLink}>
                  <Button style={isActive(history, '/signin')}>Sign In</Button>
                </Link>
              </span>}
            {auth.isAuthenticated &&
              <span>
                {auth.user &&
                  auth.user.seller &&
                  <Link to="/seller/shops" className={classes.styledLink}>
                    <Button style={isPartActive(history, '/seller/')}>
                      My Shops
                    </Button>
                  </Link>}
                {auth.user &&
                  <Fragment>
                    <Link
                      to={'/user/' + auth.user._id}
                      className={classes.styledLink}
                    >
                      <Button
                        style={isActive(history, '/user/' + auth.user._id)}
                      >
                        My Profile
                      </Button>
                    </Link>
                    <Button color="inherit" onClick={() => logout(history)}>
                      Sign out
                    </Button>
                  </Fragment>}
              </span>}
          </span>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapState = state => ({
  auth: state.auth
});

export default compose(withRouter, connect(mapState, { logout }))(Menu);

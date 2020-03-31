import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(theme => ({
  styledLink: {
    textDecoration: 'none'
  }
}));

const Menu = ({ history }) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ffeb3b' };
    else return { color: '#ffffff' };
  };

  const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path)) return { color: '#ffeb3b' };
    else return { color: '#ffffff' };
  };
  const classes = useStyles();

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
                <FontAwesomeIcon icon="shopping-basket" />
              </Badge>
            </Button>
          </Link>
        </div>
        <div style={{ position: 'absolute', right: '10px' }}>
          <span style={{ float: 'right' }}>
            <span>
              <Link to="/signup" className={classes.styledLink}>
                <Button style={isActive(history, '/signup')}>Sign up</Button>
              </Link>
              <Link to="/signin" className={classes.styledLink}>
                <Button style={isActive(history, '/signin')}>Sign In</Button>
              </Link>
            </span>
          </span>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Menu);

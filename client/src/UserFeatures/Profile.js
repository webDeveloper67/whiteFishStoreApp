import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import MyOrders from './../order/MyOrders';
import { connect } from 'react-redux';
import { getUser, deleteMe } from './../redux/actions/user';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserEdit,
  faUserSlash
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle
  }
}));

const Profile = ({ getUser, authUser, match, deleteMe, history }) => {
  const classes = useStyles();

  const loadCurrUser = useCallback(
    () => {
      getUser(match.params.userId);
    },
    [getUser, match.params.userId]
  );

  useEffect(
    () => {
      loadCurrUser();
    },
    [loadCurrUser]
  );

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FontAwesomeIcon icon={faUser} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={authUser !== null && authUser.name}
            secondary={authUser !== null && authUser.email}
          />{' '}
          {authUser &&
            authUser !== null &&
            <ListItemSecondaryAction>
              <Link to={`/user/edit/${authUser._id}`}>
                <IconButton aria-label="Edit" color="primary">
                  <FontAwesomeIcon icon={faUserEdit} />
                </IconButton>
              </Link>
              <IconButton onClick={() => deleteMe(history)}>
                <FontAwesomeIcon userid={authUser._id} icon={faUserSlash} />
              </IconButton>
            </ListItemSecondaryAction>}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={`Joined: ${new Date(
              authUser !== null && authUser.created
            ).toDateString()}`}
          />
        </ListItem>
      </List>
      {/* <MyOrders /> */}
      <h6>Order Component</h6>
    </Paper>
  );
};

const mapState = state => ({
  authUser: state.user.authUser
});

export default connect(mapState, { getUser, deleteMe })(Profile);

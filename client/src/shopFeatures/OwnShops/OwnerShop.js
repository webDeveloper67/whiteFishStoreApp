import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { getShop, deleteShop } from './../../redux/actions/shop';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  styledLink: {
    textDecoration: 'none'
  }
}));

const OwnerShop = ({ ownShop, auth, getShop, match, deleteShop }) => {
  const classes = useStyles();

  const loadShop = useCallback(
    () => {
      getShop(ownShop._id);
    },
    [getShop, ownShop._id]
  );

  return (
    <List dense>
      <span>
        <ListItem button>
          <ListItemAvatar>
            <Avatar
              src={
                ownShop.shopImg
                  ? `/api/v1/shops/logo/${ownShop._id}?${new Date().getTime()}`
                  : `/api/v1/shops/defaultphoto`
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={ownShop.name}
            secondary={ownShop.description}
          />
          {auth.user._id === ownShop.owner[0]._id &&
            <ListItemSecondaryAction>
              <Link
                to={`/seller/orders/${ownShop.name}/${ownShop._id}`}
                className={classes.styledLink}
              >
                <Button aria-label="Orders" color="primary">
                  View Orders
                </Button>
              </Link>
              <Link to={`/seller/shop/edit/${ownShop._id}`} onClick={loadShop}>
                <IconButton aria-label="Edit" color="primary">
                  <FontAwesomeIcon icon={faEdit} />
                </IconButton>
              </Link>
              <IconButton
                aria-label="Delete"
                color="secondary"
                onClick={e => deleteShop(ownShop._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </IconButton>
            </ListItemSecondaryAction>}
        </ListItem>
        <Divider />
      </span>
    </List>
  );
};

export default connect(null, { getShop, deleteShop })(OwnerShop);

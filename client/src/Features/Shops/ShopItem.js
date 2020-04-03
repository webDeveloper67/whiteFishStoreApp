import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  },
  styledLink: {
    textDecoration: 'none'
  }
}));

const ShopItem = ({ shop }) => {
  const classes = useStyles();

  const logoUrl = shop._id
    ? `/api/v1/shops/logo/${shop._id}?${new Date().getTime()}`
    : '/api/v1/shops/defaultphoto';
  return (
    <Fragment>
      <div>
        <Link
          to={`/shops/${shop._id}`}
          className={classes.styledLink}
          key={shop._id}
        >
          <Divider />
          <ListItem button>
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={logoUrl} />
            </ListItemAvatar>
            <div className={classes.details}>
              <Typography
                type="headline"
                component="h2"
                color="primary"
                className={classes.shopTitle}
              >
                {shop.name}
              </Typography>
              <Typography
                type="subheading"
                component="h4"
                className={classes.subheading}
              >
                {shop.description}
              </Typography>
            </div>
          </ListItem>
          <Divider />
        </Link>
      </div>
    </Fragment>
  );
};

export default ShopItem;

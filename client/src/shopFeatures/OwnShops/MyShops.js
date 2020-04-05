import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { listShopByOwner } from './../../redux/actions/shop';
import { connect } from 'react-redux';
import OwnerShop from './OwnerShop';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  addButton: {
    float: 'right'
  },
  leftIcon: {
    marginRight: '8px'
  },
  styledLink: {
    textDecoration: 'none'
  }
}));

const MyShops = ({ listShopByOwner, auth, shop: { ownerShops, loading } }) => {
  const classes = useStyles();

  useEffect(
    () => {
      listShopByOwner(auth.user._id);
    },
    [listShopByOwner, auth]
  );
  return (
    <div>
      <Paper className={classes.root}>
        <Typography type="title" className={classes.title}>
          Your Shops
          <span className={classes.addButton}>
            <Link to="/seller/shop/new" className={classes.styledLink}>
              <Button color="primary" variant="contained">
                <FontAwesomeIcon
                  icon={faCartPlus}
                  style={{ marginRight: '10px' }}
                />{' '}
                New Shop
              </Button>
            </Link>
          </span>
        </Typography>
        {/* OWNER */}
        {ownerShops &&
          ownerShops.map(ownShop =>
            <OwnerShop ownShop={ownShop} key={ownShop._id} auth={auth} />
          )}
      </Paper>
    </div>
  );
};

const mapState = state => ({
  auth: state.auth,
  shop: state.shop
});

export default connect(mapState, { listShopByOwner })(MyShops);

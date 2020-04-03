import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import { listShops } from '../../redux/actions/shop';
import ShopItem from './ShopItem';
import Spinner from '../../layout/Spinner';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em'
  }
}));

const Shops = props => {
  const classes = useStyles();

  const { listShops, shop: { shops, loading } } = props;

  useEffect(
    () => {
      listShops();
    },
    [listShops]
  );

  return loading
    ? <Spinner />
    : <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            All Shops
          </Typography>
          <List dense>
            {shops &&
              shops.map(shop => <ShopItem shop={shop} key={shop._id} />)}
          </List>
        </Paper>
      </div>;
};

const mapState = state => ({
  shop: state.shop
});

export default connect(mapState, { listShops })(Shops);

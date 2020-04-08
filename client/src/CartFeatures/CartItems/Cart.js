import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CartItems from './CartItems';
import Checkout from '../Payment/Checkout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  }
}));

const Cart = () => {
  const classes = useStyles();

  const [check, setCheck] = useState({
    checkout: false
  });

  const { checkout } = check;

  const setCheckout = val => {
    setCheck({ checkout: val });
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={6} sm={6}>
          <CartItems checkout={checkout} setCheckout={setCheckout} />
        </Grid>
        {checkout &&
          <Grid item xs={6} sm={6}>
            <Checkout />
          </Grid>}
      </Grid>
    </div>
  );
};

export default Cart;

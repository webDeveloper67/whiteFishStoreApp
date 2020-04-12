import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CartItems from './CartItems';
import Checkout from './Checkout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  }
}));

const Cart = () => {
  const classes = useStyles();

  const [isToggled, setToggled] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const toggleTrueFalse = () => setToggled(!isToggled);

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={6} sm={6}>
          <CartItems isToggled={isToggled} toggleTrueFalse={setToggled} />
        </Grid>
        {isToggled &&
          <Grid item xs={6} sm={6}>
            <Checkout />
          </Grid>}
      </Grid>
    </div>
  );
};

export default Cart;

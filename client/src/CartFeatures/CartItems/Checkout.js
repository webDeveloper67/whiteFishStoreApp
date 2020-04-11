import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createOrder } from '../../redux/actions/order';
import { deleteAllCartItem } from '../../redux/actions/cart';
// import PlaceOrder from './PlaceOrder';

const useStyles = makeStyles(theme => ({
  card: {
    margin: '24px 0px',
    padding: '16px 40px 90px 40px',
    backgroundColor: '#80808017'
  },
  title: {
    margin: '24px 16px 8px 0px',
    color: theme.palette.openTitle
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: '20px'
  },
  addressField: {
    marginTop: '4px',
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: '45%'
  },
  streetField: {
    marginTop: '4px',
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: '93%'
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: '90%'
  }
}));

const Checkout = ({
  user,
  cartItems,
  order,
  createOrder,
  deleteAllCartItem
}) => {
  const classes = useStyles();

  const [checkoutDetails, setCheckoutDetails] = useState({
    customer_name: '',
    customer_email: ''
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  });
  useEffect(() => {
    if (user && user !== null && cartItems && cartItems !== []) {
      checkoutDetails.customer_name = user.name;
      checkoutDetails.customer_email = user.email;
      checkoutDetails.products = cartItems;
      setCheckoutDetails({ ...checkoutDetails });
    }
  }, []);

  const handleCustomerChange = name => event => {
    checkoutDetails[name] = event.target.value || undefined;
    setCheckoutDetails({ ...checkoutDetails });
  };

  const handleAddressChange = name => event => {
    deliveryAddress[name] = event.target.value || undefined;
    setDeliveryAddress({ ...deliveryAddress });
  };

  const placeOrder = e => {
    console.log(e, `🚨`);
    createOrder(user._id, deliveryAddress, checkoutDetails);
  };

  if (order && order !== {}) {
    if (order._id) {
      deleteAllCartItem();
      return <Redirect to={`/order/${order._id}`} />;
    }
  }

  return (
    <form autoComplete="off" onSubmit={e => placeOrder(e)}>
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Checkout
        </Typography>
        <CardContent>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={checkoutDetails.customer_name}
            onChange={handleCustomerChange('customer_name')}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={checkoutDetails.customer_email}
            onChange={handleCustomerChange('customer_email')}
            margin="normal"
          />
          <br />
          <Typography
            type="subheading"
            component="h3"
            className={classes.subheading}
          >
            Delivery Address
          </Typography>
          <TextField
            id="street"
            label="Street Address"
            className={classes.streetField}
            value={deliveryAddress.street}
            onChange={handleAddressChange('street')}
            margin="normal"
          />
          <br />
          <TextField
            id="city"
            label="City"
            className={classes.addressField}
            value={deliveryAddress.city}
            onChange={handleAddressChange('city')}
            margin="normal"
          />
          <TextField
            id="state"
            label="State"
            className={classes.addressField}
            value={deliveryAddress.state}
            onChange={handleAddressChange('state')}
            margin="normal"
          />
          <br />
          <TextField
            id="zipcode"
            label="Zip Code"
            className={classes.addressField}
            value={deliveryAddress.zipcode}
            onChange={handleAddressChange('zipcode')}
            margin="normal"
          />
          <TextField
            id="country"
            label="Country"
            className={classes.addressField}
            value={deliveryAddress.country}
            onChange={handleAddressChange('country')}
            margin="normal"
          />
          <br />
        </CardContent>
        <CardActions>
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={e => placeOrder(e)}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

const mapState = state => ({
  user: state.auth.user,
  cartItems: state.cart.cart,
  order: state.order.order
});

//<div>
//<PlaceOrder
//checkoutDetails={checkoutDetails}
//deliveryAddress={deliveryAddress}
///>
//</div>

export default connect(mapState, { createOrder, deleteAllCartItem })(Checkout);

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import PlaceOrder from './PlaceOrder';

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

const Checkout = ({ user, cartItems }) => {
  const classes = useStyles();

  const [checkoutDetails, setCheckoutDetails] = useState({
    customer_name: '',
    customer_email: '',
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: ''
    }
  });

  useEffect(() => {
    if (user && user !== null && cartItems) {
      checkoutDetails.products = cartItems;
      checkoutDetails.customer_name = user.name;
      checkoutDetails.customer_email = user.email;
      setCheckoutDetails({ ...checkoutDetails });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(checkoutDetails, 'checkout Details');

  const handleCustomerChange = name => event => {
    checkoutDetails[name] = event.target.value || undefined;
    setCheckoutDetails({ ...checkoutDetails });
  };

  const handleAddressChange = name => event => {
    const addVal = (checkoutDetails.deliveryAddress[name] =
      event.target.value || undefined);
    setCheckoutDetails({ ...checkoutDetails, addVal });
  };

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Checkout
      </Typography>
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
        value={checkoutDetails.deliveryAddress.street}
        onChange={handleAddressChange('street')}
        margin="normal"
      />
      <br />
      <TextField
        id="city"
        label="City"
        className={classes.addressField}
        value={checkoutDetails.deliveryAddress.city}
        onChange={handleAddressChange('city')}
        margin="normal"
      />
      <TextField
        id="state"
        label="State"
        className={classes.addressField}
        value={checkoutDetails.deliveryAddress.state}
        onChange={handleAddressChange('state')}
        margin="normal"
      />
      <br />
      <TextField
        id="zipcode"
        label="Zip Code"
        className={classes.addressField}
        value={checkoutDetails.deliveryAddress.zipcode}
        onChange={handleAddressChange('zipcode')}
        margin="normal"
      />
      <TextField
        id="country"
        label="Country"
        className={classes.addressField}
        value={checkoutDetails.deliveryAddress.country}
        onChange={handleAddressChange('country')}
        margin="normal"
      />
      <br />
      <div>
        <PlaceOrder checkoutDetails={checkoutDetails} />
      </div>
    </Card>
  );
};

const mapState = state => ({
  user: state.auth.user,
  cartItems: state.cart.cart
});

export default connect(mapState)(Checkout);

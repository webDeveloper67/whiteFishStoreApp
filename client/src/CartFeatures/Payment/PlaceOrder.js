import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createOrder } from './../../redux/actions/order';
import { deleteAllCartItem } from './../../redux/actions/cart';

const useStyles = makeStyles(theme => ({
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: '20px'
  },
  checkout: {
    float: 'right',
    margin: '20px 30px'
  },
  error: {
    display: 'inline',
    padding: '0px 10px'
  },
  errorIcon: {
    verticalAlign: 'middle'
  },
  StripeElement: {
    display: 'block',
    margin: '24px 0 10px 10px',
    maxWidth: '408px',
    padding: '10px 14px',
    boxShadow:
      'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
    borderRadius: '4px',
    background: 'white'
  }
}));

const PlaceOrder = ({
  checkoutDetails,
  deliveryAddress,
  createOrder,
  user,
  deleteAllCartItem,
  order
}) => {
  const classes = useStyles();

  const placeOrder = () => {
    console.log(checkoutDetails, 'checkoutcheckoutcheckoutcheckout');
    createOrder(user._id, checkoutDetails, deliveryAddress);
  };

  if (order && order !== {}) {
    if (order._id) {
      deleteAllCartItem();
      return <Redirect to={`/order/${order._id}`} />;
    }
  }

  return (
    <span>
      <div className={classes.checkout}>
        <Button color="secondary" variant="contained" onClick={placeOrder}>
          Place Order
        </Button>
      </div>
    </span>
  );
};

const mapState = state => ({
  user: state.auth.user,
  order: state.order.order
});

export default connect(mapState, { createOrder, deleteAllCartItem })(
  PlaceOrder
);

import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import {
  renewCartItem,
  updateCartItem,
  removeCartItem
} from './../../redux/actions/cart';

const useStyles = makeStyles(theme => ({
  card: {
    margin: '24px 0px',
    padding: '16px 40px 60px 40px',
    backgroundColor: '#80808017'
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  price: {
    color: theme.palette.text.secondary,
    display: 'inline'
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    marginTop: 0,
    width: 50
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.67)',
    padding: '8px 10px 0',
    cursor: 'pointer',
    display: 'inline-block'
  },
  cart: {
    width: '100%',
    display: 'inline-flex'
  },
  details: {
    display: 'inline-block',
    width: '100%',
    padding: '4px'
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: 160,
    height: 125,
    margin: '8px'
  },
  itemTotal: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'rgb(72, 175, 148)'
  },
  checkout: {
    float: 'right',
    margin: '24px'
  },
  total: {
    fontSize: '1.2em',
    color: 'rgb(53, 97, 85)',
    marginRight: '16px',
    fontWeight: '600',
    verticalAlign: 'bottom'
  },
  continueBtn: {
    marginLeft: '10px'
  },
  itemShop: {
    display: 'block',
    fontSize: '0.90em',
    color: '#78948f'
  },
  removeButton: {
    fontSize: '0.8em'
  },
  styledLink: {
    textDecoration: 'none'
  }
}));

const CartItems = props => {
  const classes = useStyles();

  const {
    checkout,
    setCheckout,
    user,
    auth,
    renewCartItem,
    updateCartItem,
    removeCartItem
  } = props;

  const openCheckout = () => {
    setCheckout(true);
  };

  const handleChange = index => event => {
    let cartItems = props.cartItems;

    if (event.target.value === 0) {
      cartItems[index].quantity = 1;
    } else {
      cartItems[index].quantity = event.target.value;
    }

    renewCartItem(cartItems);
    updateCartItem(index, event.target.value);
  };

  const handleRemoveItem = index => event => {
    removeCartItem(index);

    if (props.cartItems.length === 0) {
      setCheckout(false);
    }

    renewCartItem(props.cartItems);
  };

  const getTotal = () => {
    return props.cartItems.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
  };

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Shopping Cart
      </Typography>
      {props.cartItems.length > 0
        ? <span>
            {props.cartItems.map((item, i) => {
              return (
                <span key={item.product._id}>
                  <Card className={classes.cart}>
                    <CardMedia
                      className={classes.cover}
                      image={'/api/v1/products/image/' + item.product._id}
                      title={item.product.name}
                    />
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Link to={'/products/' + item.product._id}>
                          <Typography
                            type="title"
                            component="h3"
                            className={classes.productTitle}
                            color="primary"
                          >
                            {item.product.name}
                          </Typography>
                        </Link>
                        <div>
                          <Typography
                            type="subheading"
                            component="h3"
                            className={classes.price}
                            color="primary"
                          >
                            $ {item.product.price}
                          </Typography>
                          <span className={classes.itemTotal}>
                            ${item.product.price * item.quantity}
                          </span>
                          <span className={classes.itemShop}>
                            Shop:{' '}
                            {item.product.shop.map(shopItem => shopItem.name)}
                          </span>
                        </div>
                      </CardContent>
                      <div className={classes.subheading}>
                        Quantity:{' '}
                        <TextField
                          value={item.quantity}
                          onChange={handleChange(i)}
                          type="number"
                          inputProps={{
                            min: 1
                          }}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true
                          }}
                          margin="normal"
                        />
                        <Button
                          className={classes.removeButton}
                          color="primary"
                          onClick={handleRemoveItem(i)}
                        >
                          x Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <Divider />
                </span>
              );
            })}
            <div className={classes.checkout}>
              <span className={classes.total}>
                Total: ${getTotal()}
              </span>
              {!checkout &&
                (auth.isAuthenticated
                  ? <Button
                      color="secondary"
                      variant="contained"
                      onClick={openCheckout}
                    >
                      Checkout
                    </Button>
                  : <Link to="/signin" className={classes.styledLink}>
                      <Button color="primary" variant="contained">
                        Sign in to checkout
                      </Button>
                    </Link>)}
              <Link
                to="/"
                className={`${classes.continueBtn} ${classes.styledLink}`}
              >
                <Button variant="contained">Continue Shopping</Button>
              </Link>
            </div>
          </span>
        : <Typography type="subheading" component="h3" color="primary">
            No items added to your cart.
          </Typography>}
    </Card>
  );
};

const mapState = state => ({
  cartItems: state.cart.cart,
  user: state.auth.user,
  auth: state.auth
});

export default connect(mapState, {
  renewCartItem,
  updateCartItem,
  removeCartItem
})(CartItems);

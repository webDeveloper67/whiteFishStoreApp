import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addCartItem } from './../../redux/actions/cart';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBan } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  iconButton: {
    width: '28px',
    height: '28px'
  },
  disabledIconButton: {
    color: '#7f7563',
    width: '28px',
    height: '28px'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const AddToCart = ({
  item,
  cartStyle,
  addCartItem,
  cartItems,
  user,
  history
}) => {
  const classes = useStyles();

  const [direction, setDirection] = useState({
    redirect: false
  });

  const { redirect } = direction;

  const addToCart = () => {
    addCartItem(item);

    setDirection({ redirect: true });
  };
  // };

  if (redirect) {
    return <Redirect to={'/cart'} />;
  }

  return (
    <span>
      {item.quantity >= 0
        ? <IconButton color="secondary" dense="dense" onClick={addToCart}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={cartStyle || classes.iconButton}
              color="secondary"
            />
          </IconButton>
        : <IconButton disabled={true} color="secondary" dense="dense">
            <FontAwesomeIcon
              icon={faBan}
              className={cartStyle || classes.disabledIconButton}
            />
          </IconButton>}
    </span>
  );
};

const mapState = state => ({
  cartItems: state.cart.cart,
  user: state.auth.user
});

export default compose(withRouter, connect(mapState, { addCartItem }))(
  AddToCart
);

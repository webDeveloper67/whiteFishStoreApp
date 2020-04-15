import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ByProductOrderEdit from './ByProductOrderEdit';
import { connect } from 'react-redux';
import { listOrderByShop } from './../../redux/actions/order';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(
      3
    )}px ${theme.spacing()}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(),
    color: '#434b4e',
    fontSize: '1.1em'
  },
  customerDetails: {
    paddingLeft: '36px',
    paddingTop: '16px',
    backgroundColor: '#f8f8f8'
  }
}));

const ByShopOrders = ({ match, orders, listOrderByShop }) => {
  const classes = useStyles();

  const [openList, setListOpen] = useState({ open: 0 });
  const { open } = openList;

  const handleClick = index => event => {
    setListOpen({ open: index });
  };

  const loadShops = () => {
    listOrderByShop(match.params.shopId);
  };

  useEffect(() => {
    loadShops();
  }, []);

  console.log(orders, 'orders in shopOrder');

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Orders in {match.params.shop}
        </Typography>
        <List dense>
          {orders &&
            orders.map((order, index) => {
              return (
                <span key={index}>
                  <ListItem button onClick={handleClick(index)}>
                    <ListItemText
                      primary={'Order # ' + order._id}
                      secondary={new Date(order.created).toDateString()}
                    />
                    {open === index
                      ? <FontAwesomeIcon icon={faAngleUp} />
                      : <FontAwesomeIcon icon={faAngleDown} />}
                  </ListItem>
                  <Divider />
                  <Collapse
                    component="li"
                    in={open === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <ByProductOrderEdit
                      shopId={match.params.shopId}
                      order={order}
                      orderIndex={index}
                    />
                    <div className={classes.customerDetails}>
                      <Typography
                        type="subheading"
                        component="h3"
                        className={classes.subheading}
                      >
                        Deliver to:
                      </Typography>
                      <Typography
                        type="subheading"
                        component="h3"
                        color="primary"
                      >
                        <strong>{order.customer_name}</strong> ({order.customer_email})
                      </Typography>
                      <Typography
                        type="subheading"
                        component="h3"
                        color="primary"
                      >
                        {order.deliveryAddress.street}
                      </Typography>
                      <Typography
                        type="subheading"
                        component="h3"
                        color="primary"
                      >
                        {order.deliveryAddress.city},{' '}
                        {order.deliveryAddress.state}{' '}
                        {order.deliveryAddress.zipcode}
                      </Typography>
                      <Typography
                        type="subheading"
                        component="h3"
                        color="primary"
                      >
                        {order.deliveryAddress.country}
                      </Typography>
                      <br />
                    </div>
                  </Collapse>
                  <Divider />
                </span>
              );
            })}
        </List>
      </Paper>
    </div>
  );
};

const mapState = state => ({
  orders: state.order.orders
});

export default connect(mapState, { listOrderByShop })(ByShopOrders);

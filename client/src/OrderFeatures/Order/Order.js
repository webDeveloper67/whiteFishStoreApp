import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { readOrder } from './../../redux/actions/order';

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: 'center',
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
    margin: 30
  },
  cart: {
    textAlign: 'left',
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
  info: {
    color: 'rgba(83, 170, 146, 0.82)',
    fontSize: '0.95rem',
    display: 'inline'
  },
  thanks: {
    color: 'rgb(136, 183, 107)',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  },
  innerCardItems: {
    textAlign: 'left',
    margin: '24px 10px 24px 24px',
    padding: '24px 20px 40px 20px',
    backgroundColor: '#80808017'
  },
  innerCard: {
    textAlign: 'left',
    margin: '24px 24px 24px 10px',
    padding: '30px 45px 40px 45px',
    backgroundColor: '#80808017'
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(),
    color: theme.palette.openTitle
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  itemTotal: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'rgb(72, 175, 148)'
  },
  itemShop: {
    display: 'block',
    fontSize: '1em',
    color: '#78948f'
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
  }
}));

const Order = ({ readOrder, match, order }) => {
  const classes = useStyles();

  useEffect(() => {
    readOrder(match.params.orderId);
  }, []);

  console.log(order && order.products);

  const getTotal = () => {
    if (order.products) {
      return order.products.reduce((a, b) => {
        const quantity = b.status === 'Cancelled' ? 0 : b.quantity;
        return a + quantity * b.product.price;
      }, 0);
    }
  };

  return (
    <Card className={classes.card}>
      <Typography type="headline" component="h2" className={classes.title}>
        Order Details
      </Typography>
      <Typography
        type="subheading"
        component="h2"
        className={classes.subheading}
      >
        Order Code: <strong>{order._id}</strong> <br /> Placed on{' '}
        {new Date(order.created).toDateString()}
      </Typography>
      <br />
      <Grid container spacing={8}>
        <Grid item xs={7} sm={7}>
          <Card className={classes.innerCardItems}>
            {order &&
              order.products &&
              order.products.map((item, i) => {
                return (
                  <span key={i}>
                    <Card className={classes.cart}>
                      <CardMedia
                        className={classes.cover}
                        image={
                          '/api/v1/products/image/' +
                          item.product.map(prodEl => prodEl._id)
                        }
                        title={item.product.map(prodEl => prodEl.name)}
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Link
                            to={
                              '/products/' +
                              item.product.map(prodEl => prodEl._id)
                            }
                          >
                            <Typography
                              type="title"
                              component="h3"
                              className={classes.productTitle}
                              color="primary"
                            >
                              {item.product.map(prodEl => prodEl.name)}
                            </Typography>
                          </Link>
                          <Typography
                            type="subheading"
                            component="h3"
                            className={classes.itemShop}
                            color="primary"
                          >
                            $ {item.product.map(prodEl => prodEl.price)} x{' '}
                            {item.quantity}
                          </Typography>
                          <span className={classes.itemTotal}>
                            ${item.product.map(prodEl => prodEl.price) *
                              item.quantity}
                          </span>
                          <span className={classes.itemShop}>
                            Shop:
                            {item.shop.map(shopEl => shopEl.name)}
                          </span>
                          <Typography
                            type="subheading"
                            component="h3"
                            color={
                              item.status === 'Cancelled'
                                ? 'error'
                                : 'secondary'
                            }
                          >
                            Status: {item.status}
                          </Typography>
                        </CardContent>
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
            </div>
          </Card>
        </Grid>
        <Grid item xs={5} sm={5}>
          {order &&
            order.deliveryAddress &&
            <Card className={classes.innerCard}>
              <Typography
                type="subheading"
                component="h2"
                className={classes.productTitle}
                color="primary"
              >
                Deliver to:
              </Typography>
              <Typography
                type="subheading"
                component="h3"
                className={classes.info}
                color="primary"
              >
                <strong>
                  {order.customer_name}
                </strong>
              </Typography>
              <br />
              <Typography
                type="subheading"
                component="h3"
                className={classes.info}
                color="primary"
              >
                {order.customer_email}
              </Typography>
              <br />
              <br />
              <Divider />
              <br />
              <Typography
                type="subheading"
                component="h3"
                className={classes.itemShop}
                color="primary"
              >
                {order.deliveryAddress.street}
              </Typography>
              <Typography
                type="subheading"
                component="h3"
                className={classes.itemShop}
                color="primary"
              >
                {order.deliveryAddress.city}, {order.deliveryAddress.state}{' '}
                {order.deliveryAddress.zipcode}
              </Typography>
              <Typography
                type="subheading"
                component="h3"
                className={classes.itemShop}
                color="primary"
              >
                {order.deliveryAddress.country}
              </Typography>
              <br />
              <Typography
                type="subheading"
                component="h3"
                className={classes.thanks}
                color="primary"
              >
                Thank you for shopping with us! <br />You can track the status
                of your purchased items on this page.
              </Typography>
            </Card>}
        </Grid>
      </Grid>
    </Card>
  );
};

const mapState = state => ({
  order: state.order.order
});

export default connect(mapState, { readOrder })(Order);

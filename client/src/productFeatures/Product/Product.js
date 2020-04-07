import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Suggestions from './Suggestions';
import { connect } from 'react-redux';
import { getProduct, listRelated } from './../../redux/actions/product';
import AddToCart from './../../CartFeatures/Cart/AddToCart';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  },
  flex: {
    display: 'flex'
  },
  card: {
    padding: '24px 40px 40px'
  },
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53'
  },
  media: {
    height: 200,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  link: {
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  },
  styledLink: {
    textDecoration: 'none'
  }
}));

const Product = ({ getProduct, match, product, listRelated, suggestions }) => {
  const classes = useStyles();

  useEffect(() => {
    getProduct(match.params.productId);
    listRelated(match.params.productId);
  }, []);

  let imageUrl;
  if (product && product !== null) {
    imageUrl = product._id
      ? `/api/v1/products/image/${product._id}?${new Date().getTime()}`
      : '/api/v1/products/defaultphoto';
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={7} sm={7}>
          {product &&
            product !== null &&
            <Card className={classes.card}>
              <CardHeader
                title={product.name}
                subheader={product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                action={
                  <span className={classes.action}>
                    <AddToCart cartStyle={classes.addCart} item={product} />
                  </span>
                }
              />
              <div className={classes.flex}>
                <CardMedia
                  className={classes.media}
                  image={imageUrl}
                  title={product.name}
                />
                <Typography
                  component="p"
                  type="subheading"
                  className={classes.subheading}
                >
                  {product.description}
                  <br />
                  <span className={classes.price}>
                    $ {product.price}
                  </span>
                  {product.shop &&
                    product.shop.map(el =>
                      <Link
                        to={`/shops/${el._id}`}
                        className={`${classes.link} ${classes.styledLink}`}
                        key={el._id}
                      >
                        <span>
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faShoppingCart}
                          />
                          {el.name}
                        </span>
                      </Link>
                    )}
                </Typography>
              </div>
            </Card>}
        </Grid>
        {suggestions &&
          suggestions.length > 0 &&
          <Grid item xs={5} sm={5}>
            <Suggestions suggestions={suggestions} title="Related Products" />
          </Grid>}
      </Grid>
    </div>
  );
};

const mapState = state => ({
  product: state.product.product,
  suggestions: state.product.suggestions
});

export default connect(mapState, { getProduct, listRelated })(Product);

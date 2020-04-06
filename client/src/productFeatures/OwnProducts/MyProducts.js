import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardMedia from '@material-ui/core/CardMedia';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { listProductByShop, getProduct } from './../../redux/actions/product';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faEdit,
  faPlusSquare
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  products: {
    padding: '24px'
  },
  addButton: {
    float: 'right'
  },
  leftIcon: {
    marginRight: '8px'
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  cover: {
    width: 110,
    height: 100,
    margin: '8px'
  },
  details: {
    padding: '10px'
  },
  styledLink: {
    textDecoration: 'none'
  }
}));

const MyProducts = ({ listProductByShop, getProduct, products, shopId }) => {
  const classes = useStyles();

  useEffect(
    () => {
      listProductByShop(shopId);
    },
    [listProductByShop, shopId]
  );

  return (
    <Card className={classes.products}>
      <Typography type="title" className={classes.title}>
        Products
        <span className={classes.addButton}>
          <Link
            to={`/seller/${shopId}/products/new`}
            className={classes.styledLink}
          >
            <Button color="primary" variant="contained">
              <FontAwesomeIcon
                className={classes.leftIcon}
                icon={faPlusSquare}
              />{' '}
              New Product
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {products &&
          products.map(product => {
            return (
              <span key={product._id}>
                <ListItem>
                  <CardMedia
                    className={classes.cover}
                    image={`/api/v1/products/image/${product._id}?${new Date().getTime()}`}
                    title={product.name}
                  />
                  <div className={classes.details}>
                    <Typography
                      type="headline"
                      component="h2"
                      color="primary"
                      className={classes.productTitle}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h4"
                      className={classes.subheading}
                    >
                      Quantity: {product.quantity} | Price: ${product.price}
                    </Typography>
                  </div>
                  {product.shop.map(el =>
                    <ListItemSecondaryAction key={el._id}>
                      <Link to={`/seller/${el._id}/${product._id}`}>
                        <IconButton
                          aria-label="Edit"
                          color="primary"
                          onClick={() => getProduct(product._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                      </Link>
                      <IconButton aria-label="Edit" color="secondary">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
                <Divider />
              </span>
            );
          })}
      </List>
    </Card>
  );
};

export default connect(null, { listProductByShop, getProduct })(MyProducts);

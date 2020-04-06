import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import AddToCart from './../../CartFeatures/Cart/AddToCart';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px'
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px'
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px'
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    width: '100%'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize: '1.1em',
    marginBottom: '5px',
    color: 'rgb(189, 222, 219)',
    display: 'block'
  }
}));

const Products = ({ products, searched }) => {
  const classes = useStyles();

  // console.log(products && Object.values(products).map(el => el.shop));

  return (
    <div className={classes.root}>
      {products.length > 0
        ? <div className={classes.container}>
            <GridList cellHeight={200} className={classes.gridList} cols={3}>
              {products.map(product =>
                <GridListTile key={product._id} className={classes.tile}>
                  <Link to={`/products/${product._id}`}>
                    <img
                      className={classes.image}
                      src={`/api/v1/products/image/${product._id}`}
                      alt={product.name}
                    />
                  </Link>
                  <GridListTileBar
                    className={classes.tileBar}
                    title={
                      <Link
                        to={`/products/${product._id}`}
                        className={classes.tileTitle}
                      >
                        {product.name}
                      </Link>
                    }
                    subtitle={
                      <span>
                        $ {product.price}
                      </span>
                    }
                    actionIcon={<AddToCart item={product} />}
                  />
                </GridListTile>
              )}
            </GridList>
          </div>
        : searched &&
          <Typography
            type="subheading"
            component="h4"
            className={classes.title}
          >
            No products found!
          </Typography>}
    </div>
  );
};

export default Products;

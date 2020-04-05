import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { getShop } from '../../redux/actions/shop';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(),
    color: theme.palette.openTitle
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  productTitle: {
    padding: `${theme.spacing(3)}px ${theme.spacing(
      2
    )}px ${theme.spacing()}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  }
}));

const Shop = ({ getShop, match, shop: { shop } }) => {
  const classes = useStyles();

  useEffect(
    () => {
      getShop(match.params.shopId);
    },
    [getShop, match]
  );

  let shopImg;
  if (shop) {
    shopImg = shop._id
      ? `/api/v1/shops/logo/${shop._id}?${new Date().getTime()}`
      : '/api/v1/shops/defaultphoto';
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={4} sm={4}>
          {shop &&
            shop !== null &&
            <Card className={classes.card} key={shop._id}>
              <CardContent>
                <Typography
                  type="headline"
                  component="h2"
                  className={classes.title}
                >
                  {shop && shop.name}
                </Typography>
                <br />
                <Avatar src={shopImg} className={classes.bigAvatar} />
                <br />
                <Typography
                  type="subheading"
                  component="h2"
                  className={classes.subheading}
                >
                  {shop && shop.description}
                </Typography>
                <br />
              </CardContent>
            </Card>}
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography
              type="title"
              component="h2"
              className={classes.productTitle}
            >
              Products
            </Typography>
            {/* <Products products={products} searched={false} /> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapState = state => ({
  shop: state.shop
});

export default connect(mapState, { getShop })(Shop);

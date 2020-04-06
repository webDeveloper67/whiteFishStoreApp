import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AddToCart from './../../CartFeatures/Cart/AddToCart';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEye } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(),
    paddingBottom: 24,
    backgroundColor: '#80808024'
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1.1em',
    textAlign: 'center'
  },
  viewButton: {
    verticalAlign: 'middle'
  },
  card: {
    marginTop: '10px',
    width: '100%'
    // display: 'inline-flex'
  },
  details: {
    display: 'inline-block',
    width: '100%'
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: '65%',
    height: 130,
    margin: '8px'
  },
  controls: {
    marginTop: '8px'
  },
  date: {
    color: 'rgba(0, 0, 0, 0.4)'
  },
  icon: {
    verticalAlign: 'sub'
  },
  iconButton: {
    width: '28px',
    height: '28px'
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.67)'
  },
  actions: {
    float: 'right',
    marginRight: '6px'
  },
  price: {
    display: 'inline',
    lineHeight: '3',
    paddingLeft: '8px',
    color: theme.palette.text.secondary
  },
  styledLink: {
    textDecoration: 'none'
  }
}));

const Suggestions = ({ suggestions, title }) => {
  const classes = useStyles();

  const [spacing] = useState(5);

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          {title}
        </Typography>
        <Grid
          container
          justify="center"
          direction="row"
          alignContent="flex-start"
          spacing={spacing}
        >
          {suggestions &&
            suggestions.map(item => {
              return (
                <span key={item._id}>
                  <Grid item xs={12} sm={12}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cover}
                        image={`/api/v1/products/image/${item._id}`}
                        title={item.name}
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Link
                            to={`/products/${item._id}`}
                            className={classes.styledLink}
                          >
                            <Typography
                              type="title"
                              component="h3"
                              className={classes.productTitle}
                              color="primary"
                            >
                              {item.name}
                            </Typography>
                          </Link>
                          <Link
                            to={'/shops/' + item.shop._id}
                            className={classes.styledLink}
                          >
                            <Typography
                              type="subheading"
                              className={classes.subheading}
                            >
                              <FontAwesomeIcon
                                icon={faShoppingCart}
                                className={classes.icon}
                              />
                              {item.shop.name}
                            </Typography>
                          </Link>
                          <Typography component="p" className={classes.date}>
                            Added on {new Date(item.created).toDateString()}
                          </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                          <Typography
                            type="subheading"
                            component="h3"
                            className={classes.price}
                            color="primary"
                          >
                            $ {item.price}
                          </Typography>
                          <span className={classes.actions}>
                            <Link
                              to={`/products/${item._id}`}
                              className={classes.styledLink}
                            >
                              <IconButton color="secondary" dense="dense">
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className={classes.iconButton}
                                />
                              </IconButton>
                            </Link>

                            <AddToCart item={item} />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Divider />
                </span>
              );
            })}
        </Grid>
      </Paper>
    </div>
  );
};

export default Suggestions;

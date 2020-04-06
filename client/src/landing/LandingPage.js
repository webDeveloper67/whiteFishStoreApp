import React, { Fragment, useState, useEffect } from 'react';
import LandingBG from './LandingBackground';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Suggestions from './../productFeatures/Product/Suggestions';
import { connect } from 'react-redux';
import { listLatest, listCategories } from './../redux/actions/product';
import Categories from './../productFeatures/Product/Categories';
import Search from './../productFeatures/Product/Search';

const landingContent = {
  title: 'Find Your Favorite Shop',
  description:
    "I love vintage shopping, I think it's really fun. And I love the feeling of finding the most amazing piece for less.",
  image: '/img/landing-bg.jpeg',
  imgText: 'main image description',
  signInBut: 'Sign In',
  signUpBut: 'Sign Up',
  latestBut: 'Latest Products',
  svgProd: '/img/latestProdu.svg'
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  }
}));

const Landing = ({ suggestions, listLatest, listCategories, categories }) => {
  const classes = useStyles();

  const [title] = useState('Latest Products');

  useEffect(
    () => {
      listLatest();
      listCategories();
    },
    [listCategories, listLatest]
  );
  return (
    <Fragment>
      <div>
        <LandingBG post={landingContent} />
      </div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            {suggestions &&
              suggestions !== null &&
              <Suggestions suggestions={suggestions} title={title} />}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {categories &&
              categories.length > 0 &&
              <Search categories={categories} />}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {/* <Search /> */}
            {categories &&
              categories.length > 0 &&
              <Categories categories={categories} />}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

const mapState = state => ({
  suggestions: state.product.suggestions,
  categories: state.product.categories
});

export default connect(mapState, { listLatest, listCategories })(Landing);

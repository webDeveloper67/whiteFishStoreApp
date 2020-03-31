import React, { Fragment } from 'react';
import LandingBG from './LandingBackground';
import { makeStyles } from '@material-ui/core/styles';

const landingContent = {
  title: 'Find Your Favorite Shop',
  description:
    "I love vintage shopping, I think it's really fun. And I love the feeling of finding the most amazing piece for less.",
  image: '/img/landing-bg.jpeg',
  imgText: 'main image description',
  signInBut: 'Sign In',
  signUpBut: 'Sign Up',
  latestBut: 'Latest Products'
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  }
}));

const Landing = () => {
  return (
    <Fragment>
      <div>
        <LandingBG post={landingContent} />
      </div>
    </Fragment>
  );
};

export default Landing;

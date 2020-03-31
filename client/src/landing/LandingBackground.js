import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(/img/landing-bg.jpeg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '82vh',
    minHeight: '5rem'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.6)'
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  marginAutoItem: {
    margin: 'auto'
  },
  whiteBG: {
    background: '#eaeaea'
  },
  margin: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formField: {
    background: '#eaeaea'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const LandingBackground = props => {
  const classes = useStyles();
  const { post, history } = props;

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${post.image})` }}
    >
      <img style={{ display: 'none' }} src={post.image} alt={post.imageText} />

      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6} className={classes.marginAutoItem}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Button
              className={classes.margin}
              variant="contained"
              color="primary"
            >
              {post.signUpBut}
            </Button>
            <Button
              className={classes.margin}
              variant="contained"
              color="secondary"
              onClick={() => history.push('/signin')}
            >
              {post.signInBut}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LandingBackground;

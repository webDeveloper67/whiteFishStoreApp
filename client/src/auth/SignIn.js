import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';
import { signin } from './../redux/actions/auth';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}));

const Signin = ({ signin, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = name => e => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    signin({ email, password }, history);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card className={classes.card}>
        <CardContent>
          <FontAwesomeIcon icon={faSignInAlt} color="purple" size="lg" />
          <Typography type="headline" component="h2" className={classes.title}>
            Sign In
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={handleChange('email')}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={handleChange('password')}
            margin="normal"
          />
          <br />
        </CardContent>
        <CardActions>
          <Button
            type="button"
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default connect(null, { signin })(Signin);

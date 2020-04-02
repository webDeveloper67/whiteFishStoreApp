import React, { Fragment, useState } from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';
import { register } from './../redux/actions/auth';

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

const Register = ({ register, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: ''
  });

  const { name, password, email } = formData;

  const handleChange = name => e => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    register({ name, email, password }, history);
  };

  return (
    <Fragment>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <FontAwesomeIcon icon={faUserPlus} color="purple" size="lg" />
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              Sign Up
            </Typography>

            <TextField
              type="text"
              id="name"
              label="Name"
              className={classes.textField}
              value={name}
              onChange={handleChange('name')}
              margin="normal"
            />
            <br />
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
    </Fragment>
  );
};

export default connect(null, { register })(Register);

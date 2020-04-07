import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getUser, updateMe } from './../redux/actions/user';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  menu: {
    width: 150
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  }
}));

const EditProfile = ({ match, getUser, authUser, updateMe, history }) => {
  const classes = useStyles();

  const [editProfileData, setProfileData] = useState({
    name: '',
    email: '',
    seller: false
  });

  const loadCurrUser = useCallback(
    () => {
      getUser(match.params.userId);
    },
    [getUser, match.params.userId]
  );

  useEffect(
    () => {
      loadCurrUser();
      if (authUser && authUser !== null) {
        setProfileData({
          ...authUser,
          name: authUser.name,
          email: authUser.email,
          seller: authUser.seller
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleChange = name => event => {
    setProfileData({ ...editProfileData, [name]: event.target.value });
  };

  const handleCheck = (event, checked) => {
    setProfileData({ ...editProfileData, seller: checked });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // const CurrUser = {
    //   name: editProfileData.name || undefined,
    //   email: editProfileData.email || undefined,
    //   seller: editProfileData.seller,
    //   created: editProfileData.created,
    //   id: editProfileData._id
    // };

    const CurrUser = { ...editProfileData };
    await updateMe(CurrUser);
    history.push(`/user/${authUser._id}`);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Profile
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={editProfileData.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={editProfileData.email}
            onChange={handleChange('email')}
            margin="normal"
          />
          <br />

          <Typography
            type="subheading"
            component="h4"
            className={classes.subheading}
          >
            Seller Account
          </Typography>
          <FormControlLabel
            control={
              <Switch
                classes={{
                  checked: classes.checked,
                  bar: classes.bar
                }}
                checked={editProfileData.seller}
                onChange={handleCheck}
              />
            }
            label={editProfileData.seller ? 'Active' : 'Inactive'}
          />
          <br />
        </CardContent>
        <CardActions>
          <Button
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

const mapState = state => ({
  authUser: state.user.authUser
});

export default connect(mapState, { getUser, updateMe })(EditProfile);

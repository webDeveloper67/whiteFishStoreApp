import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { createShop } from './../../redux/actions/shop';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1em'
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
  input: {
    display: 'none'
  },
  filename: {
    marginLeft: '10px'
  },
  styledLink: {
    textDecoration: 'none'
  }
}));

const NewShop = ({ createShop, auth, history }) => {
  const classes = useStyles();

  const [shopForm, setShopForm] = useState({
    name: '',
    description: '',
    shopImg: ''
  });

  const { name, description, shopImg } = shopForm;

  let shopData = useRef(new FormData());

  const handleChange = name => event => {
    const value =
      name === 'shopImg' ? event.target.files[0] : event.target.value;
    shopData.current.set(name, value);
    setShopForm({ ...shopForm, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (auth.user && auth.user._id) {
      createShop(auth.user._id, shopData.current, history);
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={onSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              New Shop
            </Typography>
            <br />
            <input
              accept="image/*"
              onChange={handleChange('shopImg')}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <Button variant="contained" color="secondary" component="span">
                Upload Logo
                <FontAwesomeIcon icon={faCloudDownloadAlt} />
              </Button>
            </label>{' '}
            <span className={classes.filename}>
              {shopImg ? shopImg.name : ''}
            </span>
            <br />
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={name}
              onChange={handleChange('name')}
              margin="normal"
            />
            <br />
            <TextField
              id="multiline-flexible"
              label="Description"
              multiline
              rows="2"
              value={description}
              onChange={handleChange('description')}
              className={classes.textField}
              margin="normal"
            />
            <br />
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              className={classes.submit}
              onClick={onSubmit}
            >
              Submit
            </Button>
            <Link
              to="/seller/shops"
              className={`${classes.submit} ${classes.styledLink}`}
            >
              <Button variant="contained">Cancel</Button>
            </Link>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const mapState = state => ({
  auth: state.auth
});

export default connect(mapState, { createShop })(NewShop);

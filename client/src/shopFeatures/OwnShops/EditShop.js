import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { updateShop } from './../../redux/actions/shop';
// import MyProducts from './../product/MyProducts';
import Spinner from './../../layout/Spinner';

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
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename: {
    marginLeft: '10px'
  }
}));

const EditShop = ({ updateShop, match, singleShop, products, history }) => {
  const classes = useStyles();

  const [editShop, setEditShop] = useState({
    name: '',
    description: '',
    shopImg: '',
    owner: ''
  });

  const { name, description, shopImg, owner } = editShop;

  let shopData = useRef(new FormData());

  useEffect(
    () => {
      if (singleShop && singleShop !== null) {
        setEditShop({
          id: singleShop._id,
          name: singleShop.name,
          description: singleShop.description,
          owner: singleShop.owner[0].name
        });
      }
    },
    [singleShop]
  );

  const handleChange = name => event => {
    const value =
      name === 'shopImg' ? event.target.files[0] : event.target.value;
    shopData.current.set(name, value);
    setEditShop({ ...editShop, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateShop(match.params.shopId, shopData.current, history);
  };

  let shopImage;
  if (singleShop && singleShop !== null) {
    shopImage = singleShop._id
      ? `/api/v1/shops/logo/${singleShop._id}?${new Date().getTime()}`
      : '/api/v1/shops/defaultphoto';
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={6} sm={6}>
          {singleShop === null
            ? <Spinner />
            : <form autoComplete="off" onSubmit={handleSubmit}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      type="headline"
                      component="h2"
                      className={classes.title}
                    >
                      Edit Shop
                    </Typography>
                    <br />
                    <Avatar src={shopImage} className={classes.bigAvatar} />
                    <br />
                    <input
                      accept="image/*"
                      onChange={handleChange('shopImg')}
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                    />
                    <label htmlFor="icon-button-file">
                      <Button
                        variant="contained"
                        color="default"
                        component="span"
                      >
                        Change Logo
                        {/* <FileUpload/> */}
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
                      rows="3"
                      value={description}
                      onChange={handleChange('description')}
                      className={classes.textField}
                      margin="normal"
                    />
                    <br />
                    <Typography
                      type="subheading"
                      component="h4"
                      className={classes.subheading}
                    >
                      Owner: {owner}
                    </Typography>
                    <br />
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.submit}
                      onClick={handleSubmit}
                    >
                      Update
                    </Button>
                  </CardActions>
                </Card>
              </form>}
        </Grid>
        <Grid item xs={6} sm={6}>
          {/* <MyProducts shopId={match.params.shopId} products={products} /> */}
        </Grid>
      </Grid>
    </div>
  );
};

const mapState = state => ({
  singleShop: state.shop.shop
});

export default connect(mapState, { updateShop })(EditShop);

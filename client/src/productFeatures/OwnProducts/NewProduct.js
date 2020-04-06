import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import { connect } from 'react-redux';
import { createProduct } from './../../redux/actions/product';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

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
    fontSize: '1.2em'
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
  }
}));

const NewProduct = ({ createProduct, match, history }) => {
  const classes = useStyles();

  const [productsData, setProductData] = useState({
    name: '',
    description: '',
    prodImg: '',
    category: '',
    quantity: '',
    price: ''
  });

  const {
    name,
    description,
    prodImg,
    category,
    quantity,
    price
  } = productsData;

  let productData = useRef(new FormData());

  const handleChange = name => event => {
    const value =
      name === 'prodImg' ? event.target.files[0] : event.target.value;
    productData.current.set(name, value);

    setProductData({ ...productsData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    createProduct(match.params.shopId, productData.current, history);
  };
  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              New Product
            </Typography>
            <br />
            <input
              accept="image/*"
              onChange={handleChange('prodImg')}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <Button variant="contained" color="secondary" component="span">
                Upload Photo
                <FontAwesomeIcon icon={faCloudUploadAlt} />
              </Button>
            </label>{' '}
            <span className={classes.filename}>
              {prodImg ? prodImg.name : ''}
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
            <TextField
              id="category"
              label="Category"
              className={classes.textField}
              value={category}
              onChange={handleChange('category')}
              margin="normal"
            />
            <br />
            <TextField
              id="quantity"
              label="Quantity"
              className={classes.textField}
              value={quantity}
              onChange={handleChange('quantity')}
              type="number"
              margin="normal"
            />
            <br />
            <TextField
              id="price"
              label="Price"
              className={classes.textField}
              value={price}
              onChange={handleChange('price')}
              type="number"
              margin="normal"
            />
            <br />
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              className={classes.submit}
            >
              Submit
            </Button>
            <Link
              to={`/seller/shop/edit/${match.params.shopId}`}
              className={classes.submit}
            >
              <Button variant="contained">Cancel</Button>
            </Link>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default connect(null, { createProduct })(NewProduct);

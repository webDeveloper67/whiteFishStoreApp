import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import { connect } from 'react-redux';
import { updateProduct } from './../../redux/actions/product';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
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
  },
  styledLink: {
    textDecoration: 'none'
  }
}));

const EditProduct = ({ singleProduct, updateProduct, match, history }) => {
  const classes = useStyles();

  const [productsData, setProductsData] = useState({
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

  useEffect(
    () => {
      if (singleProduct && singleProduct !== null) {
        setProductsData({
          id: singleProduct._id,
          name: singleProduct.name,
          description: singleProduct.description,
          category: singleProduct.category,
          quantity: singleProduct.quantity,
          price: singleProduct.price
        });
      }
    },
    [singleProduct]
  );

  const handleChange = name => event => {
    const value =
      name === 'prodImg' ? event.target.files[0] : event.target.value;
    productData.current.set(name, value);

    setProductsData({ ...productsData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateProduct(
      match.params.shopId,
      match.params.productId,
      productData.current,
      history
    );
  };

  let imageUrl;
  if (singleProduct && singleProduct !== null) {
    imageUrl = singleProduct._id
      ? `/api/v1/products/image/${singleProduct._id}?${new Date().getTime()}`
      : '/api/v1/products/defaultphoto';
  }

  return (
    <form
      encType="multipart/form-data"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Product
          </Typography>
          <br />
          <Avatar src={imageUrl} className={classes.bigAvatar} />
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
              Change Image
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
            type="text"
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
            type="text"
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
            type="text"
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
            Update
          </Button>
          <Link
            to={`/seller/shop/edit/${match.params.shopId}`}
            className={`${classes.submit} ${classes.styledLink}`}
          >
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </form>
  );
};

const mapState = state => ({
  singleProduct: state.product.product
});

export default connect(mapState, { updateProduct })(EditProduct);

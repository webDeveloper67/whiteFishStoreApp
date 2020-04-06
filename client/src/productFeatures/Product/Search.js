import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Products from './Products';
import { connect } from 'react-redux';
import { listResults } from './../../redux/actions/product';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#80808024'
  },
  menu: {
    width: 200
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 130,
    verticalAlign: 'middle',
    marginBottom: '20px'
  },
  searchField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300,
    marginBottom: '20px'
  },
  searchButton: {
    minWidth: '20px',
    height: '30px',
    padding: '0 8px'
  }
}));

const Search = ({ categories, listResults, results }) => {
  const classes = useStyles();

  const [searchData, setSearchData] = useState({
    category: '',
    search: '',
    searched: false
  });

  const { category, search, searched } = searchData;

  const handleChange = name => event => {
    setSearchData({
      ...searchData,
      [name]: event.target.value
    });
  };

  const searchInfo = () => {
    if (search) {
      listResults({ search: search || undefined, category: category });

      setSearchData({ ...searchData, searched: true });
    }
  };

  const enterKey = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchInfo();
    }
  };

  return (
    <div>
      <Card className={classes.card}>
        <TextField
          id="select-category"
          select
          label="Select category"
          className={classes.textField}
          value={category}
          onChange={handleChange('category')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map(option =>
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )}
        </TextField>
        <TextField
          id="search"
          label="Search products"
          type="search"
          onKeyDown={enterKey}
          onChange={handleChange('search')}
          className={classes.searchField}
          margin="normal"
        />
        <Button
          variant="contained"
          color={'primary'}
          className={classes.searchButton}
          onClick={searchInfo}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <Divider />

        <Products products={results} searched={searched} />
      </Card>
    </div>
  );
};

const mapState = state => ({
  results: state.product.results
});

export default connect(mapState, { listResults })(Search);

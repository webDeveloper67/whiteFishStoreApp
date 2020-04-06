import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Products from './Products';
import { connect } from 'react-redux';
import { listSearch } from './../../redux/actions/product';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    transform: 'translateZ(0)'
  },
  tileTitle: {
    verticalAlign: 'middle',
    lineHeight: 2.5,
    textAlign: 'center',
    fontSize: '1.5em',
    margin: '0 4px 0 0'
  },
  card: {
    margin: 'auto',
    marginTop: 20
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    backgroundColor: '#80808024',
    fontSize: '1.1em'
  },
  icon: {
    verticalAlign: 'sub',
    color: '#738272',
    fontSize: '0.9em'
  },
  link: {
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
}));

const Categories = ({ categories, products, listSearch }) => {
  const classes = useStyles();

  const [selectCate, setSelected] = useState({
    selected: ''
  });

  const { selected } = selectCate;

  useEffect(
    () => {
      if (categories && categories.length > 0) {
        setSelected({ ...selectCate, selected: categories[0] });
      }
      listSearch({ category: categories[0] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories, listSearch]
  );

  const listByCategory = category => event => {
    setSelected({ ...selectCate, selected: category });
    listSearch({ category });
  };

  return (
    <div>
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Explore by category
        </Typography>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={4}>
            {categories &&
              categories.map((tile, i) =>
                <GridListTile
                  key={i}
                  className={classes.tileTitle}
                  style={{
                    height: '64px',
                    backgroundColor:
                      selected === tile
                        ? 'rgba(142, 68, 173,1.0)'
                        : 'rgba(155, 89, 182,1.0)'
                  }}
                >
                  <span className={classes.link} onClick={listByCategory(tile)}>
                    {tile}{' '}
                    <Icon className={classes.icon}>
                      {selected === tile &&
                        <FontAwesomeIcon color="purple" icon={faSortDown} />}
                    </Icon>
                  </span>
                </GridListTile>
              )}
          </GridList>
        </div>
        <Divider />
        <Products products={products} searched={false} />
      </Card>
    </div>
  );
};

const mapState = state => ({
  products: state.product.products
});

export default connect(mapState, { listSearch })(Categories);

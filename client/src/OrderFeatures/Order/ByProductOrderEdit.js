import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { getStatusValues } from './../../redux/actions/order';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
    paddingBottom: 0
  },
  listImg: {
    width: '70px',
    verticalAlign: 'top',
    marginRight: '10px'
  },
  listDetails: {
    display: 'inline-block'
  },
  listQty: {
    margin: 0,
    fontSize: '0.9em',
    color: '#5f7c8b'
  },
  textField: {
    width: '160px',
    marginRight: '16px'
  },
  statusMessage: {
    position: 'absolute',
    zIndex: '12',
    right: '5px',
    padding: '5px'
  }
}));

const ByProductOrderEdit = ({
  shopId,
  order,
  orderIndex,
  statusValues,
  getStatusValues
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (order && order.products) {
      getStatusValues();
    }
  }, []);

  console.log(order && order.products && order, 'order in productOrderEdit');

  return (
    <div>
      <List
        disablePadding
        style={{
          backgroundColor: '#f8f8f8'
        }}
      >
        {order &&
          order.products.map((item, index) => {
            return (
              <span key={index}>
                {item.shop.map(shopp => shopp._id === shopId)
                  ? <ListItem button className={classes.nested}>
                      <ListItemText
                        primary={
                          <div>
                            <img
                              alt=""
                              className={classes.listImg}
                              src={
                                '/api/v1/products/image/' +
                                item.product.map(pro => pro._id)
                              }
                            />
                            <div className={classes.listDetails}>
                              name: {item.product.map(pro => pro.name)}
                              <p className={classes.listQty}>
                                {'Quantity: ' + item.quantity}
                              </p>
                            </div>
                          </div>
                        }
                      />
                      <TextField
                        id="select-status"
                        select
                        label="Update Status"
                        className={classes.textField}
                        value={item.status}
                        // onChange={handleStatusChange(index)}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        margin="normal"
                      >
                        {statusValues &&
                          statusValues.map(option =>
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          )}
                      </TextField>
                    </ListItem>
                  : ''}
                <Divider style={{ margin: 'auto', width: '80%' }} />
              </span>
            );
          })}
      </List>
    </div>
  );
};

const mapState = state => ({
  statusValues: state.order.statusValues
});

export default connect(mapState, { getStatusValues })(ByProductOrderEdit);

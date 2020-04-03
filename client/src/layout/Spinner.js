import React, { Fragment } from 'react';
import preLoader from './preloader.gif';

export default () =>
  <Fragment>
    <img
      src={preLoader}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="loading..."
    />
  </Fragment>;

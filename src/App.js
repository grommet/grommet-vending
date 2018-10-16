import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Grommet, Box, Grid, ResponsiveContext, grommet,
} from 'grommet';

import Server from './Server';
import Header from './Header';
import Add from './screens/Add';
import Edit from './screens/Edit';
import Location from './screens/Location';
import Login from './screens/Login';
import Service from './screens/Service';
import Services from './screens/Services';

const Content = () => (
  <ResponsiveContext.Consumer>
    {responsive => (
      <Grid
        fill
        columns={responsive !== 'small'
          ? ['flex', 'large', 'flex']
          : ['flex']}
        rows={['flex']}
        areas={responsive !== 'small'
          ? [{ name: 'main', start: [1, 0], end: [1, 0] }]
          : [{ name: 'main', start: [0, 0], end: [0, 0] }]}
      >
        <Box gridArea="main">
          <Route path="/" component={Header} />
          <Box pad={responsive === 'small' ? { horizontal: 'large' } : undefined}>
            <Route exact path="/" component={Services} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/service/edit/:id" component={Edit} />
            <Route exact path="/service/location/:id" component={Location} />
            <Route exact path="/service/:id" component={Service} />
          </Box>
        </Box>
      </Grid>
    )}
  </ResponsiveContext.Consumer>
);

export default () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Grommet theme={grommet}>
      <Server>
        <Content />
      </Server>
    </Grommet>
  </Router>
);

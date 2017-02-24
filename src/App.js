import React, { Component } from 'react';
import Layout from './layout';
import Grid from './grid';

import * as engine from './engine';
import Cheese from './cheese';

export default class App extends Component {
  render() {
    let grid = new engine.Grid(5);
    return (
      <Layout>
      <Grid grid={grid} renderCell={ () => <Cheese /> } />
      </Layout>
    );
  }
}

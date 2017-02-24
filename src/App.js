import React, { Component } from 'react';
import Layout from './layout';
import Grid from './grid';

import * as engine from './engine';
import Cheese from './cheese';
import Mouse from './mouse';

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function initialState(cells) {
  const cellsData = cells.reduce((acc, c) => {
    const parts = rnd(0, 5);
    if (parts !== 0) {
      acc[c.key] = {type: "cheese", parts};
    } else {
      acc[c.key] = null;
    }
    return acc;
  }, {});
  const mouseCell = cells[ rnd(0, cells.length) ];
  cellsData[mouseCell.key] = {type: "mouse"}
  return {
    cellsData, mouseCell
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.grid = new engine.Grid(5);
    this.state = initialState(this.grid.cells);

    this.renderCell = this.renderCell.bind(this);
  }

  eat(c) {
    //todo можно есть только ближайшие
    this.setState(({mouseCell, cellsData}) => {

      console.log(cellsData[mouseCell.key])

      cellsData[c.key] = cellsData[mouseCell.key]
      cellsData[mouseCell.key] = null;

      return {
        mouseCell: c,
        cellsData
      }
    })
  }

  renderCell(c) {
    let data = this.state.cellsData[c.key];
    if (data === null) return
    if (data.type === "cheese")
      return <Cheese parts={data.parts} onClick={() => this.eat(c)} />
    if (data.type === "mouse")
      return <Mouse />
  }

  render() {
    return (
      <Layout>
      <Grid grid={this.grid} renderCell={this.renderCell} />
      </Layout>
    );
  }
}

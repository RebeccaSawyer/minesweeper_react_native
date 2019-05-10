import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from './Board';

export default class App extends Component {

constructor() {
  super();
  this.state = {
    rows: 10,
    columns: 10,
    flags: 10, 
    mines: 10,
    time: 0,
    status: "waiting",
    openCells: 0
  }
   this.handleCellClick = this.handleCellClick.bind(this);
   this.endGame = this.endGame.bind(this);
}

endGame () {
  this.setState({
    status: "ended"
  })
}

handleCellClick () {
  if (this.state.openCells === 0 && this.state.status !== "running") {
    this.setState({
      status: "running"
    })
  }
}
  render() {
    return (
      <View style={styles.container}>
      <Board rows={this.state.rows} 
      columns={this.state.columns} 
      mines={this.state.mines} 
      openCells={this.state.openCells} 
       openCellClick={this.handleCellClick}
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96beff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

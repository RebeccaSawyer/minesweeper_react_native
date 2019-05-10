/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Cell from './Cell';

export default class Row extends Component {
  constructor(props) {
  super(props);
  // this.state = {
  //   cells: props.cells
  // }

}


  render() {
    let cells = this.props.cells.map((data, index) => {
      return (
      <Cell 
      key={index}
      celldata={data}
      open={this.props.open} 
      />) 
  })
    return (
      <View style={styles.container}>
        {cells}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 30,
  //  backgroundColor: '#47f5ff',
  //  borderWidth: 0.5,
  //  borderColor: 'blue',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
});

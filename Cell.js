
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default class Cell extends Component {
  constructor(props) {
  super(props);
  this.state = {
    content: ''
  }
  //this.renderCell = this.renderCell.bind(this);
  this.renderContent = this.renderContent.bind(this);
}
renderContent () {
  //let content = '';
  if (this.props.celldata.isOpen) {
    this.setState({content: '🌳'});
  } else {
    this.setState({content: '🌫'});
  }
}

// renderCell () {

//}

 render() {
    if (this.props.celldata.isOpen) {

      if (this.props.celldata.hasMine) {
      return (<View style={styles.container}>
      <TouchableHighlight
        style={styles.openCell}
        onPress={() => {this.props.open(this.props.celldata)}}
  //      onLongPress={}
        delayLongPress={25}>
        <Text style={styles.text}>{'💣'}</Text>
      </TouchableHighlight>
      </View>)
      } 

      else if (this.props.celldata.count === 0) {
       return (<View style={styles.container}>
      <TouchableHighlight
        style={styles.openCell}
        onPress={() => {this.props.open(this.props.celldata)}}
  //      onLongPress={}
        delayLongPress={25}>
        <Text style={styles.text}>{'🌳'}</Text>
      </TouchableHighlight>
      </View>)
      } 

      else {
      return (<View style={styles.container}>
      <TouchableHighlight
        style={styles.openCell}
        onPress={() => {this.props.open(this.props.celldata)}}
  //      onLongPress={}
        delayLongPress={25}>
        <Text style={styles.text}>{this.props.celldata.count}</Text>
      </TouchableHighlight>
      </View>)

      }
  } 

  else {
    return (<View style={styles.container}>
      <TouchableHighlight
        style={styles.cell}
        onPress={() => {this.props.open(this.props.celldata)}}
  //      onLongPress={}
        delayLongPress={25}>
        <Text style={styles.text}>{'🌫'}</Text>
      </TouchableHighlight>
      </View>)
  }
    
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 720,
    height: 30,
 //   backgroundColor: '#47f5ff',
 //   borderWidth: 1,
    borderColor: 'white',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  cell: {
    width: 30,
    height: 30,
 //   backgroundColor: '#bec0c4',
    borderWidth: 0.3,
    borderColor: 'white'
  },
  openCell: {
    width: 30,
    height: 30,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 25,
    alignSelf: 'center'
  }
});

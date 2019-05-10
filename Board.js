import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Row from './Row';


export default class Board extends Component {

constructor(props) {
  super(props);
  this.state = {
  rows: this.createBoard(props)
 }
 this.createBoard = this.createBoard.bind(this);
 this.open = this.open.bind(this);
 this.findMines = this.findMines.bind(this);
 this.surroundingCells = this.surroundingCells.bind(this);
}

createBoard (props) {
  let board = [];
  for (let i = 0; i < props.rows; i++) {
    board.push([]);
    for (let j = 0; j < props.columns; j++) {
      board[i].push({
        x: j,
        y: i,
        count: 0,
        isOpen: false,
        hasMine: false,
        hasFlag: false
      });
    }
  }
  for (let i = 0; i < props.mines; i++) {
  let randomRow = Math.floor(Math.random() * props.rows);
  let randomCol = Math.floor(Math.random() * props.columns);
  let cell = board[randomRow][randomCol];
    if(cell.hasMine) {
      i--;
    } else {
      cell.hasMine = true;
    }
  }
  //console.log(board);
  return board;

}

open (cell) {
  let asyncCountMines = new Promise (resolve => {
    let mines = this.findMines(cell);
    resolve(mines);
  })
  
  asyncCountMines.then(numberOfMines => {
    console.log(numberOfMines);
  let rows = this.state.rows;
  let current = rows[cell.y][cell.x];

  if (current.hasMine && this.props.openCells === 0) {
    console.log('There is a mine! Restart the game!');
    let newRows = this.createBoard(this.props);
    this.setState({
      rows: newRows
    }, () => {
   this.open(cell);
    })
  } else {
    if (!cell.hasFlag && !current.isOpen) {
      current.isOpen = true;
      current.count = numberOfMines;
      this.setState({rows});

      if (!current.hasMine && numberOfMines === 0) {
        this.surroundingCells(cell);
      }
    }
  }

  })
}

findMines (cell) {
  let minesInProximity = 0;
  for (let row = -1; row <=1; row++) {
    for (let col = -1; col <=1; col++) {
      if(cell.y + row >= 0 && cell.x + col >=0) {
        if (cell.y + row < this.state.rows.length
          && cell.x + col < this.state.rows[0].length)
        {
          if (this.state.rows[cell.y + row][cell.x + col].hasMine && !(row === 0 && col === 0)) {
            minesInProximity++;
          }
        }
      }
    }
  }
  return minesInProximity;
}

surroundingCells (cell) {
   let rows = this.state.rows;
  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <=1; col++) {
      if(cell.y + row >= 0 && cell.x + col >=0) {
        if (cell.y + row < rows.length
          && cell.x + col < rows[0].length){
            if (!rows[cell.y + row][cell.x + col].hasMine && !rows[cell.y + row][cell.x + col].isOpen) {
              this.open(rows[cell.y + row][cell.x + col])
            }
        }
      }
    }
   }
}
render() {

  let rows = this.state.rows.map((row, index) => {
    return (
      <Row
      cells={row}
      key={index}
      open={this.open}
      />
      )
  })
  return (<View>
    {rows}
    </View>
    )
  }
}
  

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: '#c2f9fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    width: 20,
    height: 20,
    backgroundColor: '#96beff'
  },
});
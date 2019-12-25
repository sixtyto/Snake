import React from "react";
import Cells from "./Cells";
import { start, body, food, keys, cols, rows } from "./Config";
import "./sass/main.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      snake: [],
      direction: null,
      gameOver: false
    };
  }

  start = () => {
    const board = [];
    const snake = [start];
    board[start] = body;
    this.setState(
      {
        board,
        snake,
        direction: keys.right
      },
      () => this.frame()
    );
  };

  frame = () => {
    const { snake, board, direction } = this.state;
    const head = this.getNextIndex(snake[0], direction);
    const foodCell = board[head] === food || snake.length === 1;
    if (snake.indexOf(head) !== -1) {
      this.setState({ gameOver: true });
      return;
    }
    if (foodCell) {
      const maxCells = rows * cols;
      let i;
      do {
        i = Math.floor(Math.random() * maxCells);
      } while (board[i]);
      board[i] = food;
    } else {
      board[snake.pop()] = null;
    }
    board[head] = body;
    snake.unshift(head);
    this.setState(
      {
        board,
        snake
      },
      () => {
        setTimeout(this.frame, 200);
      }
    );
  };

  handleKey = e => {
    const direction = e.nativeEvent.keyCode;
    const diff = Math.abs(this.state.direction - direction);
    if (diff !== 2) {
      this.setState({
        direction
      });
    }
  };

  getNextIndex = (head, direction) => {
    let x = head % cols;
    let y = Math.floor(head / cols);
    switch (direction) {
      case keys.up:
        y = y <= 0 ? rows - 1 : y - 1;
        break;
      case keys.down:
        y = y >= rows - 1 ? 0 : y + 1;
        break;
      case keys.left:
        x = x <= 0 ? cols - 1 : x - 1;
        break;
      case keys.right:
        x = x >= cols - 1 ? 0 : x + 1;
        break;
      default:
        return;
    }
    return cols * y + x;
  };

  componentDidMount() {
    this.start();
  }

  render() {
    const { board } = this.state;
    return <Cells board={board} handleKey={this.handleKey} />;
  }
}

export default App;

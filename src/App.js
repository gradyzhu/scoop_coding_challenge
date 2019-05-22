import React from 'react';
import './App.css';
import Grid from './frontend/grid';

class App extends React.Component {
  populateGrid = (n = 3) => {
    return new Array(n).fill(null).map(() => {
      return new Array(n).fill(null);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      grid: this.populateGrid(),
      size: 3,
      mark: "O",
      gameOver: false,
      winner: null,
    };
  }
  
  updateCell = pos => {
    const { gameOver, grid, mark } = this.state;
    if (gameOver) return;
    let row = pos[0];
    let col = pos[1];
    if (grid[row][col] === null) {
      let updatedGrid = grid;
      updatedGrid[row][col] = mark;
      this.setState({ grid: updatedGrid });
    }
  }

  updateMark = () => {
    const { gameOver, mark } = this.state;
    if (gameOver) return;
    if (mark === "X") this.setState({ mark: "O" });
    if (mark === "O") this.setState({ mark: "X" });
  };

  updateWin = () => {
    this.lineWin();
    this.diagonalWin();
    this.gameTied();
  };

  xWins = () => {
    this.setState({ 
      gameOver: true,
      winner: "X WINS"
    });
  };

  oWins = () => {
    this.setState({ 
      gameOver: true,
      winner: "O WINS"
    });
  };

  drawGame = () => {
    this.setState({ 
      gameOver: true,
      winner: "DRAW"
    });
  };

  gameTied = () => {
    if (this.state.grid.flat().every(mark => mark != null)) this.drawGame();
  };

  lineWin = () => {
    const { grid } = this.state;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].every(mark => mark === "X")) this.xWins();
      if (grid[i].every(mark => mark === "O")) this.oWins();
    }

    let transposed = grid.map((col, i) => grid.map(row => row[i]));
    
    for (let i = 0; i < transposed.length; i++) {
      if (transposed[i].every(mark => mark === "X")) this.xWins();
      if (transposed[i].every(mark => mark === "O")) this.oWins();
    }
  };

  diagonalWin = () => {
    const { grid } = this.state;
    let topDownDiag = [];
    let botUpDiag = [];
    let length = grid.length;

    for (let i = 0; i < length; i++) {
      topDownDiag.push(grid[i][i]);
    }

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (j === length - 1 - i) {
          botUpDiag.push(grid[i][j]);
        }
      }
    }

    if (topDownDiag.every(mark => mark === "X") || botUpDiag.every(mark => mark === "X")) this.xWins();
    if (topDownDiag.every(mark => mark === "O") || botUpDiag.every(mark => mark === "O")) this.oWins();
  };

  handleRestart = () => {
    let grid = this.populateGrid(this.state.size);
    this.setState({
      grid: grid,
      mark: "O",
      gameOver: false,
      winner: null,
      restart: !this.state.restart,
    });
  };

  handleInput = (e) => {
    let size = e.currentTarget.value;
    if (size instanceof String || isNaN(size) || size === "") {
      size = "";
    } else {
      size = parseInt(e.currentTarget.value)
    }
    this.setState({ 
      size: size
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleRestart();
  }

  render = () => {
    const { gameOver, grid, winner, restart } = this.state;
    const displayWinner = gameOver ? "winner" : "display-off";

    return (
      <div className="app flex-center">
        <h1>
          tic-tac-toe
        </h1>
        <Grid
          grid={grid}
          updateCell={this.updateCell}
          updateMark={this.updateMark}
          updateWin={this.updateWin}
          restart={restart}/>
        <div className="flex-row">
          <input 
            type="text"
            value={this.state.size}
            onChange={this.handleInput}
            className="input">
          </input>
          <button 
            className="restart" 
            onClick={this.handleRestart}>
            Set Size / Restart
          </button>
        </div>
        <div className={displayWinner}>
          {winner}
        </div>
        <div className="background"></div>
      </div>
    );
  }
}

export default App;

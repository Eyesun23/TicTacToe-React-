import React from 'react';
import "../index.css";
import Board from "./GameBoard.js";

//dimensions N*N
const minimum = 3;
const maximum = 10;

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dimension: maximum,
			history: [
				{
					squares: Array(maximum * maximum).fill(null),
					winState: Array(maximum * 2 + 2).fill(0),
				}
			],
			turn: "X",
			step: 0,
      scores : {
        score_x : 0,
        score_o : 0
      }
		};
	}

	calculateWinner(dimension, winState,step) {
		for (var i = 0; i < winState.length; i++) {
			if (winState[i] === dimension) {

				return 'X';
			} else if (winState[i] === -1 * dimension) {
				return 'O';
			}
		}
    if (step === dimension*dimension){
      return 'Tie'
    }
		return null;
	}
  update_score(winner){

    let rx = (winner === 'X') ? 1 :0;
    let ro = (winner === 'O') ? 1 :0 ;

    this.setState({scores: {score_x: this.state.scores.score_x + rx,
                            score_o: this.state.scores.score_o + ro}})
  }

	jumpTo(step) {
		this.setState({
			turn: step % 2 === 0 ? 'X' : 'O',
			step: step
		});
	}
  scores_reset(d){
    this.setState({
      dimension: d,
			history: [{
				squares: Array(d * d).fill(null),
        winState: Array(d * 2 + 2).fill(0),
			}],
			turn: "X",
			step: 0,
      scores : {
        score_x : 0,
        score_o : 0
      }
		});
  }

	updateDimension(evt) {
		var dimension = Number(evt.target.value);
		this.setState({
			dimension: dimension,
			history: [
				{
					squares: Array(dimension * dimension).fill(null),
					winState: Array(dimension * 2 + 2).fill(0)
				}
			],
			turn: "X",
			step: 0
		});
	}

	updateWinState(i, dimension, turn, winState) {
    let row = Math.floor(i / dimension);
    let col = i % dimension;
   let diag1 = row === col;
   let diag2 = row + col === dimension - 1;

		let point = 0;
		if (turn === "X") {
			point = 1;
		} else if (turn === 'O') {
			point = -1;
		}
		winState[row] += point;
		winState[dimension + col] += point;
		if (diag1 === true) {
			winState[dimension * 2] += point;
		}
		if (diag2 === true) {
			winState[dimension * 2 + 1] += point;
		}
		return winState;
	}

	handleClick(i, dimension, history, turn, step, squares, winState) {
		history = history.slice(0, step + 1);
		if (this.calculateWinner(dimension, winState,step)||(squares[i])) {
			return;
		}
		squares[i] = turn;
    let nwinState = this.updateWinState(i, dimension, turn, winState)
		this.setState({
			history: history.concat([{
				squares: squares,
        winState: nwinState
			}]),
			turn: turn === "X" ? "O" : "X",
			step: history.length
		});
    let winner = this.calculateWinner(dimension, nwinState,1+step)
    this.update_score(winner)

	}

	render() {
		const dimension = this.state.dimension;
		const history = this.state.history.slice();
		const turn = this.state.turn;
		const step = this.state.step;

		// Showing the board state at a specified point in time
		const squares = history[step].squares.slice();
		const winState = history[step].winState.slice();

		// Defining the right game status
		const winner = this.calculateWinner(dimension, winState,step);
		const status = winner ? "Winner: " + winner : "Next Player: " + turn;


		return (
			<div>
      <h1>Tic Tac Toe</h1>
        <div className="score-info">
          <div id="status">{status}</div>
          <div className="score-card"><p>SCORE OF X</p>{this.state.scores.score_x}</div>
          <div className="score-card"><p>SCORE OF O</p>{this.state.scores.score_o}</div>
        </div>
				<div id="dimension-label">Dimension: {dimension} </div>
				<input
					value={dimension}
					onChange={(evt) => this.updateDimension(evt)}
					id="dimension"
					type="range"
					min={minimum}
					max={maximum}
				/>
				<div className="game">
					<div className="game-board">
						<Board
							dimension={dimension}
							squares={squares}
							onClick={(i) => this.handleClick(i, dimension, history, turn, step, squares, winState)}
						/>
					</div>
      </div>
      <div>
        <button id="reset" onClick={() => this.jumpTo(0)}>Play Again</button>
        <button id="reset" onClick = {()=>this.scores_reset(this.state.dimension)}>Reset</button>
      </div>
		</div>
		);
	}
}
export default Game;

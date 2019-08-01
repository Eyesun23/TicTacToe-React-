import React from 'react';
import "../index.css";


function Square(props) {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}
function GameBoard(props) {
	function renderSquare(i) {
		return (
			<Square
				value={props.squares[i]}
				onClick={props.onClick.bind(null, i)}
			/>
		);
	}
	var board = [];
	const dimension = props.dimension;
	for (var row = 0; row < dimension * dimension; row += dimension) {
		var boardRow = [];
		for (var col = row; col < row + dimension; col++) {
			boardRow.push(
				renderSquare(col)
			);
		}
		board.push(
			<div className="board-row">
				{boardRow}
			</div>
		);
	}

	return (
		<div>
			{board}
		</div>
	);
}
export default GameBoard;

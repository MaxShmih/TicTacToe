import React, { useState } from "react";
import Square from "./Square";


const Board = ({ xIsNext, squares, onPlay }) => {

	let status;

	const handleClick = (i) => {
		if ((calculateWinner(squares)) || squares[i]) { return; }
		const newSquares = squares.slice();
		if (squares[i]) {
			return;
		}
		if (xIsNext) {
			newSquares[i] = 'X'
		} else {
			newSquares[i] = 'O'
		}
		
		onPlay(newSquares);
	}

	const createSquare = (i) => {
		return <Square value={squares[i]}
			onClick={() => handleClick(i)}
		/>;
	}

	const calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	}

	const winner = calculateWinner(squares);

	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next playes: " + (xIsNext ? 'X' : 'O');
	}

	return (
		<div className="board">
			<div className="status">{status}</div>
			<div className="row">
				{createSquare(0)}
				{createSquare(1)}
				{createSquare(2)}
			</div>
			<div className="row">
				{createSquare(3)}
				{createSquare(4)}
				{createSquare(5)}
			</div>
			<div className="row">
				{createSquare(6)}
				{createSquare(7)}
				{createSquare(8)}
			</div>
		</div>

	)
}

export default function Game() {

	// const [xIsNext, setXIsNext] = useState(true);
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	const jumpTo = (nextMove) => {
		setCurrentMove(nextMove);
	}

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = 'Go to move #' + move;
		} else {
			description = 'Go to game start';
		}
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>
				{description}
			</button>
		</li >
	);
});

return (
	<div className="game">
		<div className="game_board">
			<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
		</div>
		<div className="game_info">
			<ol>
				{ moves }
			</ol>
		</div>
	</div>
)
}
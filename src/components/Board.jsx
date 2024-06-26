import React, { useState } from "react";
import Square from "./Square";


const Board = () => {
	const [xIsNext, setXIsNext] = useState(true);
	const [state, setState] = useState(Array(9).fill(null));

	let status;

	const handleClick = (i) => {
		if ( (calculateWinner(state)) || state[i]) {return;}
		const newSquares = state.slice();
		if (state[i]) {
			return;
		}
		if (xIsNext) {
			newSquares[i] = 'X'
		} else {
			newSquares[i] = 'O'
		}
		setState(newSquares);
		setXIsNext(!xIsNext);
	}

	const createSquare = (i) => {
		return <Square value={state[i]}
			onClick={() => handleClick(i)}
		/>;
	}

	const calculateWinner = (state) => {
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
			if (state[a] && state[a] === state[b] && state[a] === state[c]) {
				return state[a];
			}
		}
		return null;
	}

	const winner = calculateWinner(state);
	
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

export default Board;
import React, { useState } from 'react';
import Board from './Board';


const Game = () => {

	const [xIsNext, setXIsNext] = useState(true);
	const [history, setHistory] = useState([Array(9).fill(null)]);

	const handlePlay = (nextSquares) => {
		setHistory([...history, newSquares]);
		setXIsNext(!xIsNext);
	}

	const jumpTo = (nextMove) => {

	}

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = 'Go to move #' + move;
		} else {
			description = 'Go to game start';
		}
		return (
			<li>
				<button onClick={() => jumpTo(move)}>
				{description}
			</button>
		</li >
	);
});

const currentSquares = history[history.length - 1];

return (
	<div className="game">
		<div className="game_board">
			<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
		</div>
		<div className="game_info">
			<ol>
				{ }
			</ol>
		</div>
	</div>
)
}

export default Game;


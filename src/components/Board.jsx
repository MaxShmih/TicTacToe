import React, { useState } from "react";
import Square from "./Square";


const Board = ({ xIsNext, squares, onPlay, currentMove }) => {

	let status;
	let winCombo = [];

	const handleClick = (i) => {
		if ((calculateWinner(squares)) || squares[i]) { return; }
		const newSquares = squares.slice();
		if (xIsNext) {
			newSquares[i] = 'X'
		} else {
			newSquares[i] = 'O'
		}

		onPlay(newSquares);
	}

	const createSquare = (i) => {
		let className = '';
		if (winCombo.includes(i)) {
			className = 'winning_square'
		}

		return <Square value={squares[i]}
			onClick={() => handleClick(i)}
			className={className}
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
				winCombo = lines[i];
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
	if (currentMove === 9) {
		status = "Game Over!"
	}

	return (
		<>
			<div className="status">{status}</div>
			<div className="board">
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
		</>


	)
}

export default function Game() {

	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	const jumpTo = (nextMove) => {
		if (nextMove === 0) {
			setHistory([Array(9).fill(null)]);
			setCurrentMove(0);
		} else {
			setCurrentMove(nextMove);
		}
	};

	const moves = history.map((squares, move) => {
		let btnClassName = '';
		let description;
		if (move > 0) {
			description = 'Go to move #' + move;
			btnClassName = 'descr_btn'
		} else {
			description = 'Reset the game';
			btnClassName = 'descr_btn descr_btn_first'
		}
		return (
			<li key={move}>
				<div className={btnClassName} onClick={() => jumpTo(move)}>
					{description}
				</div>
			</li >
		);
	});
	return (
		<div className="game">
			<div className="game_board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove}/>
			</div>
			<div className="game_info">
				<ul className="game_info_list">
					{moves}
				</ul>
			</div>
		</div>
	)
}
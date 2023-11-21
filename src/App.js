import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [xname, setXName] = useState('');
  const [enteredNameX, setenteredNameX] = useState(xname);
  const [oname, setOName] = useState('');
  const [enteredNameO, setEnteredNameO] = useState(oname);

  function handleClicknameX(e) {
    setenteredNameX(xname);
    setXName('');
  }
  function handleClicknameO(e) {
    setEnteredNameO(oname);
    setOName('');
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner == 'O') {
    status = 'Winner: ' + enteredNameO;
  }
  else if (winner == 'X') {
    status = 'Winner: ' + enteredNameX;
  }
  else {
    status = 'Next player: ' + (xIsNext ? enteredNameX : enteredNameO);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div>
        <p><small>X Player: {enteredNameX}</small></p>
        <input type='text' onChange={(e) => setXName(e.target.value)} value={xname} />
        <button onClick={handleClicknameX}>Enter</button>

        <p><small>O Player: {enteredNameO}</small></p>
        <input type='text' onChange={(e) => setOName(e.target.value)} value={oname} />
        <button onClick={handleClicknameO}>Enter</button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
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





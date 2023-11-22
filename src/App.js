import { useState } from "react";
import ReactSwitch from "react-switch";


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      <div className={`pill ${value}`}>{value}</div>
    </button>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [xname, setXName] = useState("");
  const [enteredNameX, setenteredNameX] = useState("");
  const [oname, setOName] = useState("");
  const [enteredNameO, setEnteredNameO] = useState("");

  function handleClicknameX(e) {
    setenteredNameX(xname);
    setXName("");
  }
  function handleClicknameO(e) {
    setEnteredNameO(oname);
    setOName("");
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner == "O") {
    status = "Winner: " + enteredNameO;
  } else if (winner == "X") {
    status = "Winner: " + enteredNameX;
  } else {
    status = "Next player: " + (xIsNext ? enteredNameX : enteredNameO);
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
        <p>
          <small>X Player: {enteredNameX}</small>
        </p>
        <input
          type="text"
          onChange={(e) => setXName(e.target.value)}
          value={xname}
        />
        <button onClick={handleClicknameX}>Enter</button>

        <p>
          <small>O Player: {enteredNameO}</small>
        </p>
        <input
          type="text"
          onChange={(e) => setOName(e.target.value)}
          value={oname}
        />
        <button onClick={handleClicknameO}>Enter</button>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className="buttonStyle">
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game" id={theme}>
      <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
      <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol className="orderedList">{moves}</ol>
      </div>
    </div>
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

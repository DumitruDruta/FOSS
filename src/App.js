import React, { useState } from "react"
import ReactSwitch from "react-switch"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  TextField
} from "@mui/material"

function Square({ value, onSquareClick }) {
  return (
    <Button
      className="square"
      onClick={onSquareClick}
      style={{ width: "60px", height: "60px" }}
      data-testid = "square"
    >
      <Paper
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        elevation={3}
      >
        <div className={`pill ${value}`}>{value}</div>
      </Paper>
    </Button>
  )
}

function Board({ xIsNext, squares, onPlay, bot }) {
  const [xname, setXName] = useState("")
  const [enteredNameX, setenteredNameX] = useState("X")
  const [oname, setOName] = useState("")
  const [enteredNameO, setEnteredNameO] = useState("O")

  function handleClicknameX(e) {
    setenteredNameX(xname)
    e.target.disabled = true
  }
  function handleClicknameO(e) {
    setEnteredNameO(oname)
    e.target.disabled = true
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
    if (bot) {
      const nulls = []
      for (let i = 0; i <= 8; i++) {
        if (!nextSquares[i]) {
          nulls.push(i)
        }
      }
      nextSquares[nulls[Math.floor(Math.random() * nulls.length)]] = "O"
      onPlay(nextSquares)
    }
  }

  const winner = calculateWinner(squares)
  let status
  if (winner === "O") {
    status = "Winner: " + enteredNameO
  } else if (winner === "X") {
    status = "Winner: " + enteredNameX
  } else {
    status = "Next player: " + (xIsNext ? enteredNameX : enteredNameO)
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{ padding: 2, display: "flex", flexDirection: "column" }}
          >
            <TextField
              type="text"
              placeholder = "Type X Name"
              onChange={(e) => setXName(e.target.value)}
              value={xname}
              label="X Player"
              margin="normal"
            />
            <Button
              data-testid = "xplayernamebutton"
              onClick={handleClicknameX}
              variant="contained"
              color="primary"
            >
              Enter
            </Button>
            <br />
            <TextField
              type="text"
              placeholder = "Type O Name"
              onChange={(e) => setOName(e.target.value)}
              value={oname}
              label="O Player"
              margin="normal"
            />
            <Button
              data-testid = "oplayernamebutton"
              onClick={handleClicknameO}
              variant="contained"
              color="primary"
            >
              Enter
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "30px" }}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h6" className="status" data-testid="status">
              {status}
            </Typography>

            <Grid container item spacing={2} justifyContent="center">
              <Grid item>
                <Square
                  value={squares[0]}
                  onSquareClick={() => handleClick(0)}
                />
              </Grid>
              <Grid item>
                <Square
                  value={squares[1]}
                  onSquareClick={() => handleClick(1)}
                />
              </Grid>
              <Grid item>
                <Square
                  value={squares[2]}
                  onSquareClick={() => handleClick(2)}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2} justifyContent="center">
              <Grid item>
                <Square
                  value={squares[3]}
                  onSquareClick={() => handleClick(3)}
                />
              </Grid>
              <Grid item>
                <Square
                  value={squares[4]}
                  onSquareClick={() => handleClick(4)}
                />
              </Grid>
              <Grid item>
                <Square
                  value={squares[5]}
                  onSquareClick={() => handleClick(5)}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2} justifyContent="center">
              <Grid item>
                <Square
                  value={squares[6]}
                  onSquareClick={() => handleClick(6)}
                />
              </Grid>
              <Grid item>
                <Square
                  value={squares[7]}
                  onSquareClick={() => handleClick(7)}
                />
              </Grid>
              <Grid item>
                <Square
                  value={squares[8]}
                  onSquareClick={() => handleClick(8)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default function Game() {
  const [bot, setBot] = useState(false)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = bot ? true : currentMove % 2 === 0
  const currentSquares = history[currentMove]

  const [botText, setBotText] = useState("activate")
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function handleBot() {
    jumpTo(0)
    if (bot) {
      setBotText("activate")
      setBot(false)
    } else {
      setBotText("deactivate")
      setBot(true)
    }
  }
  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = "Go to move #" + move
    } else {
      description = "Go to game start"
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className="buttonStyle">
          {description}
        </button>
      </li>
    )
  })

  return (
    <div id={theme} data-testid = "main-div">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TIC - TAC - TOE
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleBot()}
          >
            {"Bot " + botText}
          </Button>
          <div style={{ marginLeft: "30px" }}>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} data-testid = "theme-switch"/>
          </div>
          {/* <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label> */}
        </Toolbar>
      </AppBar>

      <div
        className="game"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px"
        }}
      >
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            bot={bot}
          />
        </div>
        <div className="game-info">
          <ol className="orderedList">{moves}</ol>
        </div>
      </div>
      <br></br>
    </div>
  )
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
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

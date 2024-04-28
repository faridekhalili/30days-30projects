import './App.css';
import React, { useState, useCallback } from 'react'
import DarkTheme from './components/DarkTheme'

const Square = React.memo(({ handleClick, value }) => {
  return (
    <button className='square' onClick={handleClick}>{value}</button>
  )
});

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleClick = useCallback((i) => {
    setSquares(currentSquares => {
      if (calculateWinner(currentSquares) || currentSquares[i]) {
        return currentSquares;
      }
      const squaresCopy = [...currentSquares];
      const xCount = squaresCopy.filter(val => val === 'X').length;
      const oCount = squaresCopy.filter(val => val === 'O').length;
      squaresCopy[i] = xCount === oCount ? 'X' : 'O';
      return squaresCopy;
    });
  }, []);

  function calculateWinner(squares) {
    const winningPossibilities = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let i = 0; i < winningPossibilities.length; i++) {
      const [a, b, c] = winningPossibilities[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return (squares[a]);
      }
    }
    return (null);
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
  };

  const winner = calculateWinner(squares);
  const xCount = squares.filter(val => val === 'X').length;
  const oCount = squares.filter(val => val === 'O').length;
  let status;
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xCount === oCount ? 'X' : 'O'}`;
  }

  return (
    <div className='container'>
      <DarkTheme />
      <div className='row'>
        <Square value={squares[0]} handleClick={useCallback(() => handleClick(0), [handleClick])}/>
        <Square value={squares[1]} handleClick={useCallback(() => handleClick(1), [handleClick])}/>
        <Square value={squares[2]} handleClick={useCallback(() => handleClick(2), [handleClick])}/>
      </div>
      <div className='row'>
        <Square value={squares[3]} handleClick={useCallback(() => handleClick(3), [handleClick])}/>
        <Square value={squares[4]} handleClick={useCallback(() => handleClick(4), [handleClick])}/>
        <Square value={squares[5]} handleClick={useCallback(() => handleClick(5), [handleClick])}/>
      </div>
      <div className='row'>
        <Square value={squares[6]} handleClick={useCallback(() => handleClick(6), [handleClick])}/>
        <Square value={squares[7]} handleClick={useCallback(() => handleClick(7), [handleClick])}/>
        <Square value={squares[8]} handleClick={useCallback(() => handleClick(8), [handleClick])}/>
      </div>
      <div className='status'>{status}</div>
      <button className='restart' onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default App;

import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames,setPlayerNames] = useState(
    {
      X:"Player 1",
      O: "Player 2"
    }
  );

  const activePlayer = derivedActivePlayer(gameTurns);
  let winner ;
  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for(const turn of gameTurns){
    const {square,player} = turn;
        const {row,col} = square;
        gameBoard[row][col]=player;
    }


  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && thirdSquareSymbol===firstSquareSymbol){
      winner=playerNames[firstSquareSymbol];
      console.log(playerNames);
      
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerNameSave(symbol,playerName){
    setPlayerNames((playerNames)=> {
      playerNames[symbol] =playerName;
      return playerNames;
    })
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer==='X' ? 'O':'X');

    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName= {playerNames.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onPlayerNameChange = {handlePlayerNameSave}
          />
          <Player
            initialName={playerNames.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onPlayerNameChange = {handlePlayerNameSave}

          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart ={handleRematch}/> }
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

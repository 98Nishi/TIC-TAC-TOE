
import { useState } from "react";
import Card from "../card/Card";
import isWinner from "../../helper/checkWin";
import { ToastContainer, toast } from "react-toastify";

import "./Grid.css";
import "react-toastify/dist/ReactToastify.css";

function Grid({ numberOfCards }) {
  const [turn, setTurn] = useState(true); //false -> x, true -> o
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);

  function play(index) {
    if (board[index] === "") {
      board[index] = turn ? "O" : "X";
      const win = isWinner(board, turn ? "O" : "X");
      if (win) {
        setWinner(win);
        toast.success(`Congratulations ${win} wins the game!`);
      } else if (!board.includes("")) {
        // Check for draw when there's no winner and all cells are filled
        setWinner("Draw");
        toast.info("It's a draw!");
      }
      setBoard([...board]);
      setTurn(!turn);
    }
  }

  function reset() {
    setBoard(Array(numberOfCards).fill(""));
    setWinner(null);
    setTurn(true);
  }

  return (
    <div className="grid-wrapper">
       {/* Display winner or draw message along with reset button */}
      {(winner || winner === "Draw") && (
        <>
          <h1 className="turn-highlight">{winner === "Draw" ? "It's a Draw!" : `Winner is ${winner}`}</h1>
          <button className="reset" onClick={reset}>
            Reset
          </button>
          <ToastContainer position="top-left" />
        </>
      )}

      <h1 className="turn-highlight">Current Turn: {turn ? "O" : "X"} </h1>
      <div className="grid">
        {board.map((value, idx) => {
          return <Card gameEnd={winner} onPlay={play} player={value} key={idx} index={idx} />;
        })}
      </div>
    </div>
  );
}

export default Grid;


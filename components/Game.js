import React, {useState} from "react"
import Board from "./Board";
import {calculateWinner} from "../helpers";
import Confetti from 'react-confetti'

const styles = {
    width: "200px",
    margin: "25px",
    textAlign: "center"
}

const Game = () => {
    const [history,setHistory] = useState([Array(9).fill(null)]);
    const [turns,setTurns] = useState(0);
    // set this here since it will be set in the re-render after handleClick is called and state is updated
    const winner = calculateWinner(history[turns]);

    const handleClick = (i) => {
        const timeInHistory = history.slice(0, turns + 1);
        const current = timeInHistory[turns];
        const squares = [...current];
        if(winner || squares[i]) return;
        squares[i] = turns % 2 === 0? "X" : "O";
        setHistory([...timeInHistory,squares]);
        setTurns(prevTurns => prevTurns + 1);
    }

    const goToTurn = (i) => {
        setTurns(i);
    }

    const renderMoves = () => (
        history.map((_,i) => {
            const desc = i ? "Go to move #" + i : "Go to game start";
            return (
                <li key={i} className="move">
                    <button onClick={() => goToTurn(i)}>{desc}</button>
                </li>
            )
        })
    )

    return (
        <div>
            {winner && <Confetti />}
            <Board squares={history[turns]} onClick={handleClick} />
            <div style={styles}>
                {winner? <h1>Winner: {winner}</h1> : <p>Next Player: {turns % 2 === 0? "X" : "O"}</p>}
                {renderMoves()}
            </div>
        </div>
    )
}

export default Game;
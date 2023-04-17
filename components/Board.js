import React from "react"
import Square from "./Square"

const Board = ({squares, onClick}) => {

    const squaresElement = squares.map((value,index) => (
        <Square key={index} value={value} onClick={() => onClick(index)} />
        )
    )

    return (
        <div className="board">
            {squaresElement}
        </div>
    )  
}

export default Board;
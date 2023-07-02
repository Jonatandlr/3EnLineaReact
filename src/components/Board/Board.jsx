import React from 'react'
import './Board.css'
import { useState } from 'react';

function Cuadricula({value, clickHandle, classs='cuadricula', turnito}) {
  let classN=classs
  if(turnito=='X'&& value=='X'){
    classN='board__turn--xselected'
  }else if(turnito=='O'&& value=='O'){
    classN='board__turn--oselected'
  }
  return (
    <button className={classN} onClick={clickHandle}>{value}</button>
  )
}

const winnerCombos=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]





function Board() {
  
  const [boards, setBoards]=useState(Array(9).fill(null))
  const [turn, setTurn]=useState('X')
  const [winner, setWinner]=useState(null)
  
  const checkWinner=(checkBoard)=>{
    for(const combo of winnerCombos){
      const[a,b,c]=combo
      if(
        checkBoard[a]&&
        checkBoard[a]==checkBoard[b]&&
        checkBoard[a]==checkBoard[c]
      ){
        return checkBoard[a]
      }
    }
    return null
  }


  const resetGame=()=>{
    setBoards(Array(9).fill(null))
    setTurn('X')
    setWinner(null)
  }
  

 
  function handleClick(i){
    const nextBoard=boards.slice();
    if(boards[i]==null&&winner==null){
      if(turn=='X'){
        nextBoard[i]='X'
        setTurn('O')
      }else{
        nextBoard[i]='O'
        setTurn('X')
      }
      setBoards(nextBoard);

      const win=checkWinner(nextBoard)
      if (win){
        setWinner(win)

      }else if(nextBoard.every((e)=> e != null)){
        setWinner(false)
      }
    }
  }

 

  return (
    <div className='board'>
      <h1 className='board__title'>Tres en Raya</h1>

      <div className='board__turn'>
        <Cuadricula classs='board__turn--x' value='X' turnito={turn}/>
        <Cuadricula classs='board__turn--o' value='O' turnito={turn}/>
      </div>

      <div className='board__board'>
        <div className='board__boardRow'>
            <Cuadricula value={boards[0]} clickHandle={()=>{handleClick(0)}} />
            <Cuadricula value={boards[1]} clickHandle={()=>{handleClick(1)}} />
            <Cuadricula value={boards[2]} clickHandle={()=>{handleClick(2)}} />
        </div>
        <div className='board__boardRow'>
            <Cuadricula value={boards[3]} clickHandle={()=>{handleClick(3)}} />
            <Cuadricula value={boards[4]} clickHandle={()=>{handleClick(4)}} />
            <Cuadricula value={boards[5]} clickHandle={()=>{handleClick(5)}} />
        </div>
        <div className='board__boardRow'>
            <Cuadricula value={boards[6]} clickHandle={()=>{handleClick(6)}} />
            <Cuadricula value={boards[7]} clickHandle={()=>{handleClick(7)}} />
            <Cuadricula value={boards[8]} clickHandle={()=>{handleClick(8)}} />
        </div>
      </div>

      {
        winner != null &&(
          <div className='winner'>
            <div className='winner__text'>
              <h2>
                {
                  winner==false ? 'Empate':'Ganador'
                }
              </h2>
              {
                winner!=false ?
                  <div className='winner__text__cuadriculaWinner'>
                  {
                    winner=='X' ? 
                    <Cuadricula classs='board__turn--xselected' value='X' turnito={turn}/> :
                    <Cuadricula classs='board__turn--oselected' value='O' turnito={turn}/> 
                  }
                  </div>: <div></div>
              }
              <footer>
                <button className='winner__text--buttonReset' onClick={resetGame}>Play Again</button>
              </footer>


            </div>
          </div>
        )
      }

    </div>
  )
}

export default Board
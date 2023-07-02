import React, { useState } from 'react'
import './ButtonPlay.css'
import Board from '../Board/Board'

function ButtonPlay() {
  const [showBoard, setShowBoard]=useState(false);

  function handleClick(){
    setShowBoard(true)
  }
  if(showBoard){
    return <Board />
  }
  return (
    <div className='ButtonPlay'>
        <button className='ButtonPlay__Click' onClick={handleClick}>Click to play</button>
    </div>
  )
}

export default ButtonPlay
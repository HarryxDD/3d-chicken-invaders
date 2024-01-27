import React, {useState, useEffect, useRef} from 'react'
import { COUNTDOWN_VALUE } from '../App'

const EndGameModal = ({score, handleRestart}) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, 0%)',
      zIndex: 999999,
      width: '300px',
      height: '200px',
      color: 'black',
      borderRadius: '10px',
      paddingRight: '10px',
      paddingLeft: '10px',
      paddingBottom: '30px',
      backgroundColor: '#ffffff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      flexDirection: 'column'
    }}>
      <p style={{ marginBottom: '0px', fontSize: '28px', fontWeight: 'bold' }}>Game Over</p>
      <p style={{ marginBottom: '40px', fontSize: '20px' }}>Your final score: {score ?? 0}</p>
      <button 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => {
          console.log(33333)
          handleRestart()
        }}
      >
        Restart
      </button>
    </div>
  )
}

const UiComps = ({countdownValue, onSetCountdownValue, score, setScore}) => {
  let timer = useRef(null);

  useEffect(() => {
    if (countdownValue > 0) {
      timer.current = setInterval(() => {
        onSetCountdownValue((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer.current);
    } else {
      return () => clearInterval(timer.current);
    }
  }, [countdownValue]);

  console.log(countdownValue)

  const handleRestart = () => {
    onSetCountdownValue(COUNTDOWN_VALUE);
    setScore(0);
    console.log(2222)
  };

  return (
    <div style={{
      position: 'fixed',
      top: '15%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999998,
      fontSize: '35px',
      fontWeight: 'bold',  
      fontFamily: 'Roboto, sans-serif',
      color: 'white'
      }}>
      Countdown: {countdownValue}
      <br />
      <br />
      Current Score: {score}

      {countdownValue === 0 && (
        <EndGameModal score={score} handleRestart={handleRestart} />
      )}
    </div>
  )
}

export default UiComps
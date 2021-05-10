import { useState, useEffect } from 'react'
import './App.css'
import { guess, startGame, restart, checkServerHealth } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [serverOk, setServer] = useState(false)
  
  const detectNoServer = (
    <div>Oops! Server is down!</div>
  )
  // console.log(serverOk)
  
  useEffect(() => {
    const check = setInterval(() => {
      // console.log(`The status of ${serverOk}`)
      const result = checkServerHealth()
      result.then((res)=> {
        setServer(res)
      }, (err) => {
        setServer(err)
      })
      
      // console.log(`The status of ${serverOk}`)
      }, 1000)
    
    return () => clearInterval(check)
  })
  
  
  

  

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          await startGame()
          setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          await restart()
          setHasWon(false)
          setStatus('')
          setNumber('')
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    let returnMsg = await guess(number)
    setStatus(returnMsg)
    if (returnMsg === 'Equal') setHasWon(true)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
  }

  const gameMode = (
    <form onSubmit={onSubmit}>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
        type="submit"
      >
        guess!
      </button>
      <p>{status}</p>
    </form>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  

  if (!serverOk) {
    // console.log('QQ')
    return detectNoServer
  }

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App

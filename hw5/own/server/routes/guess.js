import express from 'express'
import getNumber from '../core/getNumber'
import msgLog from '../message'

const router = express.Router()

function roughScale(x) {
  let parsed
  try{
    parsed = Number(x)
    if (isNaN(parsed)) return x  
  }
  catch{
    return x
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const num = getNumber(true)
  let dt = new Date();
  let dtFormat = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth()+1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}-${dt.getHours().toString().padStart(2, '0')}-${dt.getMinutes().toString().padStart(2, '0')}-${dt.getSeconds().toString().padStart(2, '0')}\n`

  msgLog('Start number =', num, dtFormat, 'a+')
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  
  const number = getNumber()
  
  const guessed = roughScale(req.query.number)
  let dt = new Date();
  let dtFormat = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth()+1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}-${dt.getHours().toString().padStart(2, '0')}-${dt.getMinutes().toString().padStart(2, '0')}-${dt.getSeconds().toString().padStart(2, '0')}\n`

  msgLog('Guess', guessed, dtFormat, 'a+')
  console.log(number, guessed)
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100 || isNaN(guessed)) {
    res.status(400).send({ msg: `Error: ${guessed} is not a valid number (1 - 100)` })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed > number) res.status(200).send({msg: `Smaller {hint:${number}}`})
    else if (guessed < number) res.status(200).send({msg: `Bigger {hint:${number}}`})
    else {
      res.status(200).send({msg: 'Equal'})
      let dt = new Date();
      let dtFormat = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth()+1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}-${dt.getHours().toString().padStart(2, '0')}-${dt.getMinutes().toString().padStart(2, '0')}-${dt.getSeconds().toString().padStart(2, '0')}\n`
      msgLog('End-Game', '', dtFormat, 'a+')
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  const newNum = getNumber(true)
  let dt = new Date();
  let dtFormat = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth()+1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}-${dt.getHours().toString().padStart(2, '0')}-${dt.getMinutes().toString().padStart(2, '0')}-${dt.getSeconds().toString().padStart(2, '0')}\n`
  msgLog('Restart Number =', newNum, dtFormat, 'a+')
  res.json({ msg: 'The game has started.' })
})
export default router

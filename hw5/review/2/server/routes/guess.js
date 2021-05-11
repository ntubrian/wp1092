import express from 'express'
import { guess } from '../../src/axios'
import getNumber from '../core/getNumber'
import Logger from '../logger'
const logger = new Logger(__dirname+'/../log')

const router = express.Router()
let left=1, right=100
function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number= getNumber(true)
  logger.log(`start number=${number}`)

  res.json({
    msg: 'The game has started.'
  })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  logger.log(`gussed ${guessed}`)
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({
      msg: 'Not a legal number.'
    })
  } else {
    // DONE: check if number and guessed are the same,
    // and response with some hint "Equal", "Bigger", "Smaller"
    if (number === guessed) {
      logger.log(`End Game`)
      res.send({msg:'Equal'});
    }else if(guessed < left){
      res.send({msg:'U Stupid! I told u, Bigger!!'})
    }else if(guessed > right){
      res.send({msg:'U Stupid! I told u, Smaller!!'})
    } else if (number > guessed) {
      left = guessed+1
      res.send({msg:'Bigger'});
    }else{
      right = guessed - 1
      res.send({msg:'Smaller'});
    }
  }
})
router.post('/restart', (req, res)=>{
  const number = getNumber(true)
  logger.log(`restart number=${number}`)
  left = 1, right = 100
  res.send({msg:'ok'})
})
// TODO: add router.post('/restart',...)

export default router
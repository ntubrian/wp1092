let number

const getNumber = (forceRestart = false) => {
  // DONE:
  // generate a random number if number is undefined or forceRestart is true
  if( forceRestart || number === undefined) {
    number = Math.round(Math.random() * 100)
  }
  return number
}

export default getNumber

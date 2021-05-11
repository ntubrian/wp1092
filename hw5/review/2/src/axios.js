import axios from 'axios'
const instance = axios.create({ baseURL: `http://127.0.0.1:4000/api/guess` })

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')

  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try{
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })    
    return msg;
  }catch(e) {
    console.log(e) 

    if(e.response?.status == 400) {
      if(e.response.data.msg === 'Not a legal number.') {
        return `Error: "${number}" is not a valid number (1 - 100)`
      }
    }else{
      return handleError(e)
    }
  }
  return 'Something Wrong'
}

const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
}


function handleError(e) {
  if(e.response){
    if(e.response.status == 500) {
      return 'Server Failed'
    }
  }else if(!e.response) {
    return 'Server No Responding...'
  }
  return 'Bad Coding'
}
export { startGame, guess, restart }

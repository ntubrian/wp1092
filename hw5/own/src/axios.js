import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
// const checkHealth = axios.create({ baseURL: 'http://localhost:4000' })
function checkServerHealth() {
  let result = instance.get('/health')
    .then((res) => { if(res.status === 200) return true; })
    .catch((err)=> { return false })
  
  return result
}

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')
  console.log(msg)
  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  
  const {
    data: { msg }
  } = await instance.get('/guess', { params: { number }, validateStatus: (status)=> {return status < 500} })//.catch((err) => { return err.response.data})
  

  return msg
}

const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')
  
  return msg
}

// async function gogo () {
//   setInterval(() => {
//     checkHealth.get('/').catch((err)=>console.log(`opps ${Date.now()}`))
//   }, 1000);
  
// }

// gogo()


export { startGame, guess, restart, checkServerHealth }

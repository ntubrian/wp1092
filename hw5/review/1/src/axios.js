import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
const CONNECTION_ERROR = 'Error: Server not responding or not connected';

const startGame = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/start')

    return msg
  } catch (err) {
    if (!err.response && err.request) {
      return CONNECTION_ERROR;
    }
    return `Error: ${err.message}`;
  }
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try {
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })

    return msg
  } catch (err) {
    if (err.response) {
      if (err.response.status === 400) {
        return `Error: "${number}" is not a valid number (1 - 100)`
      }
    } else if (err.request) {
      return CONNECTION_ERROR;
    }
    return `Error: ${err.message}`;
  }
}

const restart = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/restart')

    return msg
  } catch (err) {
    if (!err.response && err.request) {
      return CONNECTION_ERROR;
    } 
    return `Error: ${err.message}`;
  }
}

export { startGame, guess, restart }

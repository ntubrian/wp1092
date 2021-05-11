import fs from 'fs';
import getNumber from '../core/getNumber'

const getFormattedTime = (withSec = true) => {
  const d = new Date();
  const date = d.toJSON().substring(0, 10);
  const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
  const mins = d.toJSON().substring(14, 16);
  const secs = d.toJSON().substring(17, 19);
  return withSec ?
    `${date}-${hours}-${mins}-${secs}` :
    `${date}-${hours}-${mins}`;
}

// Create log directory if it doesn't exist
const logDirPath = `${__dirname}/../log/`;
if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath);
}

// Create log file
const logFileName = `${getFormattedTime(false)}.log`;
const logPath = `${logDirPath}${logFileName}`;
const logStream = fs.createWriteStream(logPath);

// Handle log error
logStream.on('error', (err) => {
  console.log("Error: " + err);
});

const logger = (_, res, next) => {
  // Run after routes finished
  res.on('finish', () => {
    const action = res.req.url.substring(1); // Get rid of the '/' at the front of url

    if (action === 'start') {
      const log = `start number=${getNumber()} ${getFormattedTime()}\n`
      logStream.write(log);
    } else if (action === 'restart') {
      const log = `restart number=${getNumber()} ${getFormattedTime()}\n`
      logStream.write(log);
    } else { // action is guess
      const queryNumber = res.req.query.number;
      const log = queryNumber == getNumber() ?
        `guess ${queryNumber} ${getFormattedTime()}\nend-game\n` :
        `guess ${queryNumber} ${getFormattedTime()}\n`;
      logStream.write(log);
    }
  });
  return next()
}

export default logger;
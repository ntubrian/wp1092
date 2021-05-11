import {openSync, constants, writeSync} from 'fs'
const {
    O_RDWR,
    O_CREAT,
    O_EXCL
  } = constants;

class Logger {
    constructor(base='./log') {
        this.fd = openSync(`${base}/${(new Date()).toISOString()}.log`, 'w+')
    }
    log(str) {
        writeSync(this.fd, `${str} ${(new Date()).toISOString()}\n`)
    }
}

export default Logger
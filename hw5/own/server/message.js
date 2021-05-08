const fs = require('fs');

// let lyrics = 'coll\n'
let key
// write to a new file named 2pac.txt
function msgLog(title, num, time, mode, keyTime=key) {
    fs.writeFile(`./server/log/${keyTime}.log`, `${title} ${num} ${time}`, {
        encoding: "utf8",
        flag: mode }, 
        (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        
    });
    if (!key) key = keyTime
}

module.exports = msgLog
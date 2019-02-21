const gzip = require('gzip-size');
const fs = require('fs');

require('colors');

/* eslint-disable no-console */
function traveDir(dir) {
  fs.readdir(dir, (err, files) => {
    files.forEach((fileName) => {
      fs.stat(`${dir}/${fileName}`, (arg0, stats) => {
        if (stats.isFile()) {
          fs.readFile(`${dir}/${fileName}`, (arg1, data) => {
            const size = Math.ceil(gzip.sync(data) / 1024, 10);
            const len = Math.ceil(data.length / 1024, 10);
            const name = `${dir}/${fileName}`.padEnd(60, ' ');
            if (size < 100) {
              console.log(`${name}\t\t`.underline.white + `${len}k\t\t`.green + `${size}k`.green);
            } else if (size < 500) {
              console.log(`${name}\t\t`.underline.white + `${len}k\t\t`.green + `${size}k`.yellow);
            } else {
              console.log(`${name}\t\t`.underline.white + `${len}k\t\t`.green + `${size}k`.red);
            }
            console.log('');
          });
        } else {
          traveDir(`${dir}/${fileName}`);
        }
      });
    });
  });
}

/* eslint-disable */
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength,padString) {
    targetLength = targetLength>>0; //floor if number or convert non-number to 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
      return String(this);
    }
    else {
      targetLength = targetLength-this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
      }
      return String(this) + padString.slice(0,targetLength);
    }
  };
}

traveDir('./dist');


/*eslint no-console: 0*/
"use strict";

const chalk = require('chalk');
const providedEnv = process.env.env;

// polyfill for padEnd. I didn't want to introduce new npm package to do the same :)
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return String(this) + padString.slice(0, targetLength);
    }
  };
}

let proxyConf;

console.log();
try {
  // we will use dev as a default one
  const environment = (providedEnv || 'dev').trim().toLowerCase();
  if (['nginx', 'off', 'no'].indexOf(environment) > -1) {
    console.log('You selected to not use', chalk.blue('Webpack Dev Server Proxy'));
    console.log('You can use external proxy solution like', chalk.blue('nginx'), 'for example');
  } else {
    const config = require('../proxy.json');
    proxyConf = config[environment];

    console.log('Your selected environment:', chalk.blue(environment));
    if (proxyConf) {
      for (let prop in proxyConf) {
        console.log(chalk.gray('-'), prop.padEnd(12), chalk.blue(proxyConf[prop].target));
      }
    } else {
      console.log(chalk.blue(environment), 'environment was not found or is disabled');
    }
  }
} catch (err) {
  console.error('Could not load `proxy.json` file from the root directory. It\'s required to use proper endpoints');
  throw "Could not load proxy settings";
}

console.log();
module.exports = proxyConf;

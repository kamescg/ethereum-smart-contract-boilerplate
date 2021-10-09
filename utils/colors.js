const chalk = require("chalk");

function red() {
    if (!process.env.HIDE_DEPLOY_LOG) {
        console.log(chalk.red.call(chalk, ...arguments));
    }
}

function dim() {
    if (!process.env.HIDE_DEPLOY_LOG) {
        console.log(chalk.dim.call(chalk, ...arguments));
    }
}

function cyan() {
    if (!process.env.HIDE_DEPLOY_LOG) {
        console.log(chalk.cyan.call(chalk, ...arguments));
    }
}

function yellow() {
    if (!process.env.HIDE_DEPLOY_LOG) {
        console.log(chalk.yellow.call(chalk, ...arguments));
    }
}

function green() {
    if (!process.env.HIDE_DEPLOY_LOG) {
        console.log(chalk.green.call(chalk, ...arguments));
    }
}

function displayResult(name, result) {
    if (!result.newlyDeployed) {
        yellow(`Re-used existing ${name} at ${result.address}`);
    } else {
        green(`${name} deployed at ${result.address}`);
    }
}

module.exports = {
    red, dim, cyan, yellow, green, displayResult
}
import chalk from 'chalk';

function getTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}

export function notify(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.blue('[NOTIFY]')} ${chalk.white(msg)}`);
}

export function warning(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.yellow('[WARNING]')} ${chalk.white(msg)}`);
}

export function danger(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.red('[DANGER]')} ${chalk.white(msg)}`);
}

export function success(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.green('[SUCCESS]')} ${chalk.white(msg)}`);
}

export function info(msg) {
  console.log(`${ chalk.gray(`[${getTime()}]`) } ${ chalk.cyan('[INFO]') } ${ chalk.white(msg) }`);
}
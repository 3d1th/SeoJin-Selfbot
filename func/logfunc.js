import chalk from 'chalk';
import player from 'node-wav-player';

function getTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}

export async function notify(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.blue('[NOTIFY]')} ${chalk.white(msg)}`);
    try {
        await player.play({
            path: './sounds/noti.wav',
        });
    } catch (error) {
        danger('Failed to play sound.');
    }
}

export async function warning(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.yellow('[WARNING]')} ${chalk.white(msg)}`);
    try {
        await player.play({
            path: './sounds/warning.wav',
        });
    } catch (error) {
        danger('Failed to play sound.');
    }
}

export async function danger(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.red('[DANGER]')} ${chalk.white(msg)}`);
    try {
        await player.play({
            path: './sounds/danger.wav',
        });
    } catch (error) {
        danger('Failed to play sound.');
    }
}

export async function success(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.green('[SUCCESS]')} ${chalk.white(msg)}`);
}

export async function rog(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.blue('[NOTIFY]')} ${chalk.white(msg)}`);
}

export async function info(msg) {
    console.log(`${chalk.gray(`[${getTime()}]`)} ${chalk.cyan('[INFO]')} ${chalk.white(msg)}`);
    try {
        await player.play({
            path: './sounds/info.wav',
        });
    } catch (error) {
        danger('Failed to play sound.');
    }
}
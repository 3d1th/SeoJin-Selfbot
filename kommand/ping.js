import { notify } from '../func/logfunc.js';

export async function handleCommand(client, message, prefix) {
    if (message.content.startsWith(`${prefix}ping`)) {

        await message.delete();

        const ping = Math.round(client.ws.ping);

        await message.channel.send(`🏓 Pong! 현재 핑: ${ping}ms`);

        notify('used ping command');
    }
}
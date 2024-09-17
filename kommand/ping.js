import { notify, success, rog } from '../func/logfunc.js';
import seojin from '../func/message.js';
export async function handleCommand(client, message, prefix) {
    if (message.content.startsWith(`${prefix}ping`)) {

        await message.delete();

        const ping = Math.round(client.ws.ping);

        await seojin.send(message, `🏓 Pong! Current ping: ${ping}ms`);
        rog('used ping command');
    }
}
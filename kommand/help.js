import seojin from '../func/message.js';

export async function handleCommand(client, message, prefix) {
    if (message.content.startsWith(`${prefix}help`)) {
        await message.delete();

        const helpMessage = `<> = Required, [] = Optional

[ ${prefix}ping ] Shows bot ping.
[ ${prefix}resolve <domain> ] Gets server info.
[ ${prefix}webhook [name] ] Creates a webhook.
[ ${prefix}iplookup <IP address> ] Gets IP info.`;

        await seojin.send(message, helpMessage);
    }
}
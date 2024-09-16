import { notify, danger } from './logfunc.js';

export function setupSpy(client) {

    client.on('messageUpdate', (oldMessage, newMessage) => {
        if (oldMessage.channel.type === 'DM') {
            notify(`Message edited in DM with ${oldMessage.author.username}: [Old] ${oldMessage.content} -> [New] ${newMessage.content}`);
        }
    });

    client.on('messageDelete', (message) => {
        if (message.channel.type === 'DM') {
            notify(`Message deleted in DM with ${message.author.username}: [Deleted] ${message.content}`);
        }
    });
}
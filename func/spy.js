import { notify, danger, rog } from './logfunc.js';

export function setupSpy(client) {

    client.on('messageUpdate', (oldMessage, newMessage) => {
        if (oldMessage.channel.type === 'DM') {
            if (oldMessage.author && oldMessage.author.id === client.user.id) {
                rog(`You edited your message in DM with ${oldMessage.channel.recipient?.username || 'unknown'}: [Old] ${oldMessage.content} -> [New] ${newMessage.content}`);
            } else {
                notify(`Message edited in DM with ${oldMessage.author?.username || 'unknown'}: [Old] ${oldMessage.content} -> [New] ${newMessage.content}`);
            }
        }
    });

    client.on('messageDelete', (message) => {
        if (message.channel.type === 'DM') {
            if (message.author && message.author.id === client.user.id) {
                rog(`You deleted your message in DM with ${message.channel.recipient?.username || 'unknown'}: [Deleted] ${message.content}`);
            } else {
                notify(`Message deleted in DM with ${message.author?.username || 'unknown'}: [Deleted] ${message.content}`);
            }
        }
    });
}
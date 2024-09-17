import axios from 'axios';
import { notify, danger, rog } from '../func/logfunc.js';

export async function resolveServer(client, message, prefix) {
    if (message.content.startsWith(`${prefix}resolve`)) {
        await message.delete().catch(err => danger('Failed to delete message'));

        const args = message.content.split(' ');
        if (args.length < 2) {
            await message.channel.send('```ini\n[ Seojin ]\n\nPlease provide a domain. Usage: ${prefix}resolve <domain>\n```');
            rog('resolve command failed: no domain provided');
            return;
        }

        const domain = args[1];
        const validDomainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

        if (!validDomainRegex.test(domain)) {
            await message.channel.send(`\`\`\`ini\n[ Seojin ]\n\n"${domain}" is not a valid domain. Usage: ${prefix}resolve <valid_domain>\n\`\`\``);
            rog(`resolve command failed: invalid domain "${domain}"`);
            return;
        }

        const apiUrl = `https://api.mcsrvstat.us/2/${domain}`;

        try {
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.online) {
                await message.channel.send(`\`\`\`ini\n[ Seojin ]\n\n${domain} server is offline.\n\`\`\``);
                rog(`resolve command used: ${domain} is offline`);
                return;
            }

            const serverInfo = `\`\`\`ini
[ Seojin ]

Server Info - ${domain}
IP Address: ${data.ip || 'N/A'}
Port: ${data.port || 'N/A'}
Players: ${data.players.online}/${data.players.max}
\`\`\``;

            await message.channel.send(serverInfo);
            rog(`Resolved server info for: ${domain}`);
        } catch (error) {
            await message.channel.send('```ini\n[ Seojin ]\n\nFailed to retrieve server info. Please try again later.\n```');
            danger(`Failed to resolve ${domain}: ${error.message}`);
        }
    }
}
import axios from 'axios';
import seojin from '../func/message.js';
import { danger } from '../func/logfunc.js';


const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export async function handleCommand(client, message, prefix) {
    if (message.content.startsWith(`${prefix}iplookup`)) {
        await message.delete().catch(err => danger('Failed to delete message'));

        const args = message.content.split(' ');
        if (args.length < 2) {
            await seojin.send(message, 'Please provide an IP address.');
            return;
        }

        const ipAddress = args[1];

        if (!ipRegex.test(ipAddress)) {
            await seojin.send(message, `Invalid IP address format. Use the command like this:\n\`\`\`ini\n[ Seojin ]\n\n${prefix}iplookup <IP address>\n\`\`\``);
            return;
        }

        const apiUrl = `https://ipinfo.io/${ipAddress}/json`;

        try {
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data) {
                await seojin.send(message, 'No data found for this IP.');
                return;
            }

            const ipInfo = `IP address: ${data.ip || 'N/A'}
Host name: ${data.hostname || 'N/A'}
IP range: ${data.range || 'N/A'}
ISP: ${data.org || 'N/A'}
Organization: ${data.org || 'N/A'}
Country: ${data.country || 'N/A'}
Region: ${data.region || 'N/A'}
City: ${data.city || 'N/A'}
Time zone: ${data.timezone || 'N/A'}
Local time: ${new Date().toLocaleTimeString('en-US', { timeZone: data.timezone }) || 'N/A'}
Postal Code: ${data.postal || 'N/A'}`;

            await seojin.send(message, ipInfo);
        } catch (error) {
            await seojin.send(message, `Error fetching IP info: ${error.message}`);
        }
    }
}
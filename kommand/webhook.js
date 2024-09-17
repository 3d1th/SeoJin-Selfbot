import { notify, danger } from '../func/logfunc.js';
import clipboardy from 'clipboardy';
import Toast from '../func/toast.js';

const toast = new Toast();

export async function handleCommand(client, message, prefix) {
    if (message.content.startsWith(`${prefix}webhook`)) {
        await message.delete();

        const args = message.content.split(' ').slice(1);
        const webhookName = args.length > 0 && args[0] ? args[0] : message.channel.name;

        try {
            const webhook = await message.channel.createWebhook(webhookName, {
                reason: 'Requested via webhook command'
            });

            clipboardy.writeSync(webhook.url);

            toast.show('Webhook Created', `Webhook "${webhook.name}" has been created and the URL is copied to the clipboard.`);
            notify(`Webhook created with name: ${webhook.name}`);

        } catch (error) {
            if (error.code === 50013) {
                const errorMessage = '```ini\n[ Seojin ]\n\n❌ You do not have permission to create a webhook.\n```';
                danger(errorMessage);
                await message.channel.send(errorMessage);
            } else {
                const errorMessage = `\`\`\`ini\n[ Seojin ]\n\n❌ An error occurred while creating the webhook: ${error.message}\n\`\`\``;
                danger(errorMessage);
                await message.channel.send(errorMessage);
            }
        }
    }
}
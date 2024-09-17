const seojin = {
    async send(message, content) {
        const formattedMessage = `\`\`\`ini\n[ Seojin ]\n\n${content}\n\`\`\``;
        await message.channel.send(formattedMessage);
    }
};

export default seojin;
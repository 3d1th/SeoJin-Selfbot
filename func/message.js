const seojin = {
    async send(message, content) {
        const formattedMessage = `\`\`\`ini\n[ Seojin ]\n\n${content}\n\n[ https://github.com/3d1th ]\`\`\``;
        await message.channel.send(formattedMessage);
    }
};

export default seojin;
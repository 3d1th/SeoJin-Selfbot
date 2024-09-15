import { Client } from 'discord.js-selfbot-v13';
import { notify, success, warning, danger } from './func/logfunc.js';
import { promises as fs } from 'fs';
import path from 'path';

const configPath = './config.json';

async function loadConfig() {
    try {
        await fs.access(configPath);
        const data = await fs.readFile(configPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            const defaultConfig = {
                token: '',
                prefix: '$'
            };
            await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
            warning('config.json 파일이 생성되었습니다. 토큰을 추가하세요.');
            return defaultConfig;
        } else {
            throw err;
        }
    }
}

async function startBot() {
    const config = await loadConfig();
    const { token, prefix } = config;

    if (!token) {
        danger('토큰이 설정되지 않았습니다. config.json 파일에서 토큰을 입력하세요.');
        process.exit(1);
    }

    const client = new Client();

    client.on('ready', () => {
        success(`${client.user.username} 로그인됨`);
    });

    client.on('messageCreate', async message => {
        if (message.content === `${prefix}ping`) {
            await message.channel.send('Pong!');
            notify('Ping 명령어 실행됨');
        }
    });

    try {
        await client.login(token);
    } catch (error) {
        if (error.message.includes('TOKEN_INVALID')) {
            danger('로그인 실패: 유효하지 않은 토큰입니다. config.json 파일에서 올바른 토큰을 입력하세요.');
            process.exit(1);
        } else {
            danger(`로그인 실패: ${error.message}`);
            process.exit(1);
        }
    }
}

startBot().catch(err => {
    console.error(err);
});
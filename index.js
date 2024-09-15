import { Client } from 'discord.js-selfbot-v13';
import { success, warning, danger } from './func/logfunc.js';
import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

import { handleCommand as handlePingCommand } from './kommand/ping.js'; 
import { handleCommand as handleWebhookCommand } from './kommand/webhook.js';

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
            warning('The config.json file has been created. Add your token.');
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
        danger('Token not set. Enter the token in the config.json file.');
        process.exit(1);
    }

    const client = new Client();

    client.on('ready', () => {
        console.clear();
        console.log(chalk.red(`

            ███████╗███████╗ ██████╗      ██╗██╗███╗   ██╗    
            ██╔════╝██╔════╝██╔═══██╗     ██║██║████╗  ██║    
            ███████╗█████╗  ██║   ██║     ██║██║██╔██╗ ██║    
            ╚════██║██╔══╝  ██║   ██║██   ██║██║██║╚██╗██║    
            ███████║███████╗╚██████╔╝╚█████╔╝██║██║ ╚████║    
            ╚══════╝╚══════╝ ╚═════╝  ╚════╝ ╚═╝╚═╝  ╚═══╝    

            AKA: Sang-Il-Dong Anal Masturbation
`));

        console.log(`  Status: ` + chalk.green(`Connected`));
        console.log(`  Account: ${client.user.username}`);
        console.log(`  Prefix: ${config.prefix}\n`);

        console.log(chalk.white('----------------------------------------------------------------------\n'));
        success(`${client.user.username} logged in`);
    });

    client.on('messageCreate', async message => {
        await handlePingCommand(client, message, prefix);  // 명령어 처리
        await handleWebhookCommand(client, message, prefix);
    });

    try {
        await client.login(token);
    } catch (error) {
        if (error.message.includes('TOKEN_INVALID')) {
            danger('Login failed: Invalid token. Enter the correct token in your config.json file.');
            process.exit(1);
        } else {
            danger(`Login failed: ${error.message}`);
            process.exit(1);
        }
    }
}

startBot().catch(err => {
    console.error(err);
});
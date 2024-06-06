import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
import { VCT_BASE_API } from './constants/vct-api';
import Results from './types/results';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel],
});

client.once('ready', () => {
    console.log('Ready!');
    if (client.user) console.log(client.user.tag);
});

client.login(process.env.TOKEN);

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content === "/vamos") message.channel.send("https://tenor.com/view/drx-onur-vamos-stax-gif-26767488");

    if (message.content === "/liveScore") {
        const response = await fetch(VCT_BASE_API + "match?q=live_score");
        const data = await response.json();
        message.channel.send(data.data.segments[0].team1 + " " + data.data.segments[0].score1 + " - " + data.data.segments[0].score2 + " " + data.data.segments[0].team2);
    }

    if (message.content.includes("/results")) {
        const response = await fetch(VCT_BASE_API + "match?q=results");
        const data: Results = await response.json();
        if (message.content === "/results") {
            message.channel.send(data.data.segments[0].team1 + " " + data.data.segments[0].score1 + " - " + data.data.segments[0].score2 + " " + data.data.segments[0].team2);
        } else if (message.content === "/results all") {
            const list: string[] = [];
            data.data.segments.forEach((segment: any) => {
                list.push(segment.team1 + " " + segment.score1 + " - " + segment.score2 + " " + segment.team2);
            });
            message.channel.send(list.join("\n"));
        }

    }
});
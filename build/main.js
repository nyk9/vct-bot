"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const vct_api_1 = require("./constants/vct-api");
dotenv_1.default.config();
let i;
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Channel],
});
client.once('ready', () => {
    console.log('Ready!');
    if (client.user)
        console.log(client.user.tag);
});
client.login(process.env.TOKEN);
client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    if (message.content === "/vamos")
        message.channel.send("https://tenor.com/view/drx-onur-vamos-stax-gif-26767488");
    if (message.content === "/liveScore") {
        const response = yield fetch(vct_api_1.VCT_BASE_API + "match?q=results");
        const data = yield response.json();
        message.channel.send(data.data.segments[0].team1 + " " + data.data.segments[0].score1 + " - " + data.data.segments[0].score2 + " " + data.data.segments[0].team2);
    }
    if (message.content === "/results") {
        const response = yield fetch(vct_api_1.VCT_BASE_API + "match?q=results");
        const data = yield response.json();
        // console.log(data);
        message.channel.send(data.data.segments[0].team1 + " " + data.data.segments[0].score1 + " - " + data.data.segments[0].score2 + " " + data.data.segments[0].team2);
    }
}));

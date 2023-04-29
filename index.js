const TelegramApi = require('node-telegram-bot-api');
const token = '5881249722:AAHcFELho-r5rx7Hx3FJ5mN7mRzL7IJ6qFo';
const bot = new TelegramApi(token, {polling:true});
const {gameOptions, againOptions} = require("./options.js");

const chats = {};





const startGame = async(chatID) => {
    await bot.sendMessage(chatID, `Сейчас я загадаю число от одного до десяти`);
    const randomNumber = Math.floor(Math.random()*10);
    chats[chatID] = randomNumber;
    await bot.sendMessage(chatID, `Отгадай число`, gameOptions)
}


const start =  () => {
    bot.on('message', async msg=> {
        const text = msg.text;
        const chatID = msg.chat.id;


    
    
    
    
        bot.setMyCommands([
            {command: '/start', description:'Начальное приветсвие'},
            {command: '/info', description:'Получить информацию о боте'},
            {command: '/game', description: 'Поиграть ?'}
            
            
        ])
        if (text === '/start') {
           await bot.sendMessage(chatID, `Добро пожаловать`);
           return bot.sendSticker(chatID, `https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/2.webp`);
        }
        if(text === '/info') {
            return bot.sendMessage(chatID, `Тебя зовут ${msg.from.first_name} ${msg.from.username}?`);
        }


        if(text === `/game`) {
            return startGame(chatID);
        }
        return bot.sendMessage(chatID, `${msg.from.username}, я тебя не понимаю`)
        });

        bot.on('callback_query', msg => {
            const data = msg.data;
            const chatID = msg.message.chat.id;
            if(data === '/again') {
                return startGame(chatID)
            }
            if(data === chats[chatID]) {
                return bot.sendMessage(chatID, `${msg.from.first_name}, хрошо ты угадал! ${chats[chatID]}`, againOptions)
            } else {
                bot.sendMessage(chatID, `Ты не угадал!,я загадал число ${chats[chatID]}`, againOptions )
            }
        })
};
start()

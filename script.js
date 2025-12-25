// API Keys stored in file (replace with your actual keys)
const apiKeys = ['2ac6db40b186ebddcd359782c652552defdb3745d8e25124acf53a45ed535549', '7f28014dc52133378100170da05e50b5d9c26d45f3af5c891c2141aee9fbc58b', '615ab71a6766295a82b529c695db5956d2ae943cc1e8c3cc470ecbe97e0f772f', '9341744c45536d9370fba2e953bfe538d8465019d7f9582a4e61331e66b260cb', 'e6b2851dbfbc98817f92c9f0f53a2506ee097b7abc8d9f82349b77b308894234', 'fed89247615189b1640800f4ca7b1df07f159df5d84446cbce206ea95349e2bd', 'da3fb578e45b4d1117ccc1a4d23b5be0b0f8a9608806731e882580bf0b296f89', '87792bbc7341e34e1dd27304bf6380dd28e4e0d504f5606439044ddc3f43bdb3' ]; // Ganti dengan keys Anda

document.getElementById('reactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const link = document.getElementById('link').value.trim();
    const emojiInput = document.getElementById('emoji').value.trim();
    
    if (!link || !emojiInput) {
        showResult('Error', 'Link and emoji are required!', 'error');
        return;
    }
    
    // Process emoji: replace commas with spaces, split, filter, join with commas
    const emoji = emojiInput.replace(/,/g, ' ').split(/\s+/).filter(e => e.trim()).join(',');
    
    if (apiKeys.length === 0) {
        showResult('Error', 'No API keys available!', 'error');
        return;
    }
    
    showResult('Processing', 'Sending react... ⏳', 'success');
    
    let success = false;
    let lastError = 'Unknown error';
    
    for (const apiKey of apiKeys) {
        try {
            const url = `https://react.whyux-xec.my.id/api/rch?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(emoji)}`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "x-api-key": apiKey
                }
            });
            
            const json = await res.json();
            
            if (json.success) {
                const teks = `✅ React Sent!\n\n🔗 Target: ${json.link}\n🎭 Emoji: ${json.emojis.replace(/,/g, ' ')}\n\n🚀 Powered by React Channel Tool`;
                showResult('Success', teks, 'success');
                success = true;
                break;
            } else {
                lastError = json.details?.message || json.error || 'Unknown error';
                if (!lastError.toLowerCase().includes('limit') && !lastError.toLowerCase().includes('coin')) {
                    break;
                }
            }
        } catch (e) {
            console.error(e);
            lastError = "System error occurred";
        }
    }
    
    if (!success) {
        const teks = `❌ Failed Response\n\n📝 Message: ${lastError}\n💡 Info: API keys exhausted, get new keys at https://asitha.top/login`;
        showResult('Error', teks, 'error');
    }
});

function showResult(title, message, type) {
    const resultDiv = document.getElementById('result');
    const titleEl = document.getElementById('resultTitle');
    const messageEl = document.getElementById('resultMessage');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    resultDiv.className = `result ${type}`;
    resultDiv.classList.remove('hidden');
}

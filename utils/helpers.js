/* Utility Functions */

exports.calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
};

const https = require('https');

exports.sendNotification = (user, type, req) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const data = JSON.stringify({
        access_key: "4bec177e-04af-4653-8132-1f8b61e38a9e",
        name: "DevBlog System",
        subject: `StartUp Alert: ${user.name} (${type})`,
        message: `
🔍 NEW USER ACTIVITY DETECTED
------------------------------------------------
👤 Name:     ${user.name}
📱 Phone:    ${user.phone}
🌐 Type:     ${type}
📍 IP:       ${ip}
💻 Client:   ${req.headers['user-agent']}
------------------------------------------------
Trust System Active.
        `.trim()
    });

    const options = {
        hostname: 'api.web3forms.com',
        path: '/submit',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const request = https.request(options, (res) => {
        // Fire and forget
    });

    request.on('error', (error) => {
        console.error('Notification sent failed:', error.message);
    });

    request.write(data);
    request.end();
};

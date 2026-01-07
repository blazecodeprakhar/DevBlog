/* Utility Functions */

exports.calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
};

const https = require('https');

exports.sendNotification = (user, type, req) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
        const userAgent = req.headers['user-agent'] || 'Unknown Client';

        const data = JSON.stringify({
            access_key: "4bec177e-04af-4653-8132-1f8b61e38a9e",
            name: user.name || "Unknown User",
            email: "admin@blog.com", // Web3Forms often requires an email field, even if dummy
            subject: `New Login: ${user.name}`,
            message: `
User Details:
Name: ${user.name}
Phone: ${user.phone}
Type: ${type}
IP: ${ip}
Device: ${userAgent}
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
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log('✅ Notification Sent Successfully');
                } else {
                    console.error(`❌ Notification Failed: Status ${res.statusCode}`, responseBody);
                }
            });
        });

        request.on('error', (error) => {
            console.error('❌ Network Error sending notification:', error.message);
        });

        request.write(data);
        request.end();

    } catch (err) {
        console.error("❌ Critical Error in sendNotification:", err.message);
    }
};

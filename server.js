const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. Asli ChatBot API Node Route
app.post('/api/generate/text', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ status: 'error', message: 'Prompt parameter is missing.' });

        const response = await fetch(`https://pollinations.ai{encodeURIComponent(prompt)}`);
        const aiText = await response.text();
        return res.json({ status: 'success', output: aiText });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
});

// 2. Asli Leonardo AI Style Image Generator Route
app.post('/api/generate/image', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ status: 'error', message: 'Image prompt is missing.' });

        const seed = Math.floor(Math.random() * 1000000);
        const finalImageUrl = `https://pollinations.ai{encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}`;
        return res.json({ status: 'success', outputUrl: finalImageUrl });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
});

// Vercel Serverless Integration configuration
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 STAR AI PIPELINE ACTIVE ON PORT ${PORT}`);
});

module.exports = app;

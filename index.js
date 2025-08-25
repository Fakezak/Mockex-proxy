const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let proxyActive = false;
let proxyIP = "";
let proxyPort = "";
let uidStatus = {}; // { uid: "locked" / "unlocked" }

// Activate proxy
app.post('/activate', (req, res) => {
    proxyActive = true;
    proxyIP = `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
    proxyPort = 1000 + Math.floor(Math.random()*9000);

    setTimeout(() => { proxyActive = false; }, 60*60*1000); // 1 hour timer
    res.json({ ip: proxyIP, port: proxyPort, status: "Proxy activated for 1 hour" });
});

// Save UID
app.post('/save-uid', (req, res) => {
    const { uid } = req.body;
    if(!uid) return res.status(400).json({ error: "UID required" });

    uidStatus[uid] = "unlocked";
    res.json({ status: `UID ${uid} unlocked` });
});

// Simulate login
app.post('/login', (req, res) => {
    const { uid } = req.body;
    if(!proxyActive) return res.json({ error: "Proxy not active" });

    if(uidStatus[uid] === "unlocked") {
        res.json({ status: "Login successful" });
    } else {
        res.json({ error: "UID locked" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MockeX server running on port ${PORT}`));
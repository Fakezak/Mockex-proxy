const backendURL = "https://mockex-backend.onrender.com"; // replace with your deployed backend URL

const activateBtn = document.getElementById('activateBtn');
const ipPortBox = document.getElementById('ipPortBox');
const saveUidBtn = document.getElementById('saveUidBtn');
const uidInput = document.getElementById('uidInput');
const loginBtn = document.getElementById('loginBtn');
const loginUid = document.getElementById('loginUid');
const loginResult = document.getElementById('loginResult');

// Activate proxy
activateBtn.addEventListener('click', async () => {
    const res = await fetch(`${backendURL}/activate`, { method:'POST' });
    const data = await res.json();
    ipPortBox.innerHTML = `Proxy IP: ${data.ip} | Port: ${data.port} <br> Status: ${data.status}`;
});

// Save UID
saveUidBtn.addEventListener('click', async () => {
    const uid = uidInput.value;
    if(!uid) return alert("Enter UID");
    const res = await fetch(`${backendURL}/save-uid`, { 
        method:'POST', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ uid })
    });
    const data = await res.json();
    alert(data.status);
});

// Login simulation
loginBtn.addEventListener('click', async () => {
    const uid = loginUid.value;
    if(!uid) return alert("Enter UID to login");
    const res = await fetch(`${backendURL}/login`, { 
        method:'POST', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ uid })
    });
    const data = await res.json();
    loginResult.innerHTML = data.status || data.error;
});
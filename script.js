document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const controlSection = document.getElementById('control');
    const authSection = document.getElementById('auth');
    const pairForm = document.getElementById('pairForm');
    const updateSettingsForm = document.getElementById('updateSettingsForm');
    const fetchDataButton = document.getElementById('fetchData');
    const deviceDataPre = document.getElementById('deviceData');

    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const role = document.getElementById('registerRole').value;

        await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }),
        });

        alert('User registered');
    };

    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        localStorage.setItem('token', data.token);
        authSection.style.display = 'none';
        controlSection.style.display = 'block';
        alert('Logged in');
    };

    pairForm.onsubmit = async (e) => {
        e.preventDefault();
        const pairEmail = document.getElementById('pairEmail').value;
        const parentToken = document.getElementById('parentToken').value;

        await fetch('http://localhost:3000/pair', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ parentToken, childEmail: pairEmail }),
        });

        alert('Device paired');
    };

    updateSettingsForm.onsubmit = async (e) => {
        e.preventDefault();
        const token = document.getElementById('updateToken').value;
        const screenTime = document.getElementById('screenTime').value;
        const appLimits = document.getElementById('appLimits').value.split(',');

        await fetch('http://localhost:3000/update-settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, settings: { screenTime, appLimits } }),
        });

        alert('Settings updated');
    };

    fetchDataButton.onclick = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/fetch-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();
        deviceDataPre.textContent = JSON.stringify(data, null, 2);
    };
});

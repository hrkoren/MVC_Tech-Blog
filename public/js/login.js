const { response } = require("express");

//login handler function
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    if (email && password) {
        const response = await fetch('/api/userRoutes/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'ContentType': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);
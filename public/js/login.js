//login handler function
async function loginFormHandler(event) {
    console.log('starting loginFormHandler');
    event.preventDefault();

    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#pwdLogin').value.trim();
    console.log('loginFormHandler', email, password);
    if (email && password) {
        console.log('fetching /api/users/login');
        const response = await fetch('/api/users/login', {

            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            console.log(response);
        } else {
            alert(response.statusText);
        }
    }
}
console.log('hello');
document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);
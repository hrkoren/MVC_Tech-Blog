//Post form handler
async function newFormHandler(event) {
    event.preventDefault();
    console.log('#newPost');
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('content[name="content"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        window.location.replace('/posts');
    } else {
        console.log(response.statusText);
    }
}

document.getElementById('newPost').addEventListener('submit', newFormHandler);
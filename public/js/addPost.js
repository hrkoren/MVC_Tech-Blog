//Post form handler
async function newFormHandler(event) {
    event.preventDefault();
    console.log('#newPost');
    const title = document.querySelector('blogTitle').value;
    const content = document.querySelector('blogContent').value;

    const response = await fetch(`/api/posts`, {
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
        document.location.replace('/posts');
    } else {
        console.log(response.statusText);
    }
}

document.getElementById('newPost').addEventListener('submit', newFormHandler);
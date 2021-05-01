//Comment form
async function newFormHandler(event) {
    event.preventDefault();

    const content = document.querySelector('textarea[name="comment"]').value.trim();
    const postID = window.location.toString().split('/')[
        window.location.toString().split('/'.length - 1)
    ];

    if (content) {
        const response = await fetch('api/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            console.log(response.statusText);
        }
    }
}

document.querySelector('.comment').addEventListener('submit', newFormHandler);
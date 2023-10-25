document.addEventListener('DOMContentLoaded', function() {

    // By default, load the inbox
    load_posts('all');
  });
  

async function load_posts(posts) { 
    console.log(posts)
    // Show the mailbox and hide other views
    document.querySelector('#allPosts-view').style.display = 'block';
    // Show the Post name
    document.querySelector('#allPosts-view').innerHTML = `<h3>${posts.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;


    try {
        const response = await fetch(`/posts/${posts}`)
        .then(response => response.json())
        .then(posts => {
            // Print emails
            console.log(posts);
        });
    }catch(err){
        console.error(err)
    }

}
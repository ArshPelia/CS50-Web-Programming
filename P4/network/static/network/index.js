/* when the DOM content of the page has been loaded, 
  we attach event listeners to each of the buttons. 
  
  Ensures use of the function to only run the code once all content has loaded
   
   */
  document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('form').onsubmit = () => create_post();
    
    //default load posts
    get_posts();
  });

  function create_post(){
    const content = document.querySelector('#new_post_text').value;
    console.log(JSON.stringify(content))

 // Send post request to views and create new post
    fetch('/posts', {
        method: 'POST',
        body: JSON.stringify({
            content: content
        })
    })
    // Put response into json form
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      alert(JSON.stringify(result))

      location.reload();
  });

  }

  function get_posts(){

    // Show the mailbox name
    document.querySelector('#all_posts').innerHTML = `<h3>All Posts</h3>`;

    fetch('/posts/all_posts')
      .then(response => response.json())
      .then(posts => {
        console.log(posts)
        for (let i = 0; i < posts.length; i++) {
          const post = posts[i];
          const user = post.user;
          const content = post.content;
          const timestamp = post.timestamp;

          // Create an anchor element for the clickable link
          const link = document.createElement('a');
          link.href = '#'; // Set the desired link URL or leave it as '#' for now

          // Create a div item for the email content
          const contentDiv = document.createElement('div');
          contentDiv.style.border = '1px solid black';
          contentDiv.style.padding = '10px';
          contentDiv.style.marginBottom = '10px';
          contentDiv.style.color = 'black';

          // Create elements for from, sub, and time
          const userContent = document.createElement('h4');
          const contentContent = document.createElement('h3');
          const timeContent = document.createElement('h5');

          // Set the innerHTML of from, sub, and time elements
          userContent.innerHTML = `Author: ${JSON.stringify(user.username)}`;
          contentContent.innerHTML = `Content: ${content}`;
          timeContent.innerHTML = `Time: ${timestamp}`;
  
          // Append from, sub, and time elements to the contentDiv
          contentDiv.appendChild(userContent);
          contentDiv.appendChild(contentContent);
          contentDiv.appendChild(timeContent);

          // Append the contentDiv to the anchor element
          link.appendChild(contentDiv);

          link.addEventListener('click', () => open_email(id));

          // Append the contentDiv to the desired container element
          // For example, if you have a div with id "emailContainer", you can use:
          // document.querySelector('#emails-view').append(contentDiv);
          document.querySelector('#all_posts').append(link);
        }
      });
  }
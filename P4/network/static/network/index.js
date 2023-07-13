/* when the DOM content of the page has been loaded, 
  we attach event listeners to each of the buttons. 
  
  Ensures use of the function to only run the code once all content has loaded
   
   */
  document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('form').onsubmit = () => create_post();
    
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
  });

  }
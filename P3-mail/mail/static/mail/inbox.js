/* when the DOM content of the page has been loaded, 
  we attach event listeners to each of the buttons. 
  
  Ensures use of the function to only run the code once all content has loaded
   
   */
document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', () => compose_email());
  document.querySelector('form').onsubmit = () => send_mail();
  


  // By default, load the inbox
  load_mailbox('inbox');
});
/* 
The compose_email function first hides the emails-view (by setting its style.display property 
  to none) and shows the compose-view (by setting its style.display property to block). 
  
After that, the function takes all of the form input fields (where the user might type in a
    recipient email address, subject line, and email body) and sets their value to the empty 
    string '' to clear them out. 
     
This means that every time you click the “Compose” button, you should be presented with a 
  blank email form 
  
*/
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

/* 
the load_mailbox function first shows the emails-view and hides the compose-view. 

The load_mailbox function also takes an argument, which will be the name of the mailbox 
  that the user is trying to view. For this project, you’ll design an email client with 
  three mailboxes: an inbox, a sent mailbox of all sent mail, and an archive of emails that 
  were once in the inbox but have since been archived. 
  
The argument to load_mailbox, then, will be one of those three values, and the load_mailbox 
  function displays the name of the selected mailbox by updating the innerHTML of the 
  emails-view (after capitalizing the first character). 

This is why, when you choose a mailbox name in the browser, you see the name of that mailbox
 (capitalized) appear in the DOM: the load_mailbox function is updating the emails-view to 
 include the appropriate text.
*/

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //open mailbox

  if (mailbox === 'inbox') {
    fetch('/emails/inbox')
      .then(response => response.json())
      .then(emails => {
        // Print emails
        console.log(emails);
  
        // Iterate over the emails array
        for (let i = 0; i < emails.length; i++) {
          const email = emails[i];
          const id = email.id;
          const to = email.recipients;
          const from = email.sender;
          const sub = email.subject;
          const time = email.timestamp;
          const read = email.read;
          const archived = email.archived;

          // Create an anchor element for the clickable link
          const link = document.createElement('a');
          link.href = '#'; // Set the desired link URL or leave it as '#' for now

          // Create a div item for the email content
          const contentDiv = document.createElement('div');
          contentDiv.style.border = '1px solid black';
          contentDiv.style.padding = '10px';
          contentDiv.style.marginBottom = '10px';
          contentDiv.style.color = 'black'

          if(read.value === true){
            contentDiv.style.backgroundColor = 'white'
          }else{
            contentDiv.style.backgroundColor = 'gray'
          }
  
  
          // Create elements for from, sub, and time
          const fromContent = document.createElement('h4');
          const subContent = document.createElement('h3');
          const timeContent = document.createElement('h5');
  
          // Set the innerHTML of from, sub, and time elements
          fromContent.innerHTML = `From: ${from}`;
          subContent.innerHTML = `Subject: ${sub}`;
          timeContent.innerHTML = `Time: ${time}`;
  
          // Append from, sub, and time elements to the contentDiv
          contentDiv.appendChild(fromContent);
          contentDiv.appendChild(subContent);
          contentDiv.appendChild(timeContent);

          // Append the contentDiv to the anchor element
          link.appendChild(contentDiv);

          

          // Append the contentDiv to the desired container element
          // For example, if you have a div with id "emailContainer", you can use:
          // document.querySelector('#emails-view').append(contentDiv);
          document.querySelector('#emails-view').append(link);
        }
      });
  }else if(mailbox === 'sent') {
    fetch('/emails/sent')
      .then(response => response.json())
      .then(emails => {
        // Print emails
        console.log(emails);
  
        // Iterate over the emails array
        for (let i = 0; i < emails.length; i++) {
          const email = emails[i];
          const id = email.id;
          const to = email.recipients;
          const from = email.sender;
          const sub = email.subject;
          const time = email.timestamp;
          const read = email.read;
          const archived = email.archived;
  
          // Create an anchor element for the clickable link
          const link = document.createElement('a');
          link.href = '#'; // Set the desired link URL or leave it as '#' for now


          // Create a div item for the email content
          const contentDiv = document.createElement('div');
          contentDiv.style.border = '1px solid black';
          contentDiv.style.padding = '10px';
          contentDiv.style.marginBottom = '10px';
  
  
          // Create elements for to, sub, and time
          const toContent = document.createElement('h4');
          const subContent = document.createElement('h3');
          const timeContent = document.createElement('h5');
  
          // Set the innerHTML of to, sub, and time elements
          toContent.innerHTML = `to: ${to}`;
          subContent.innerHTML = `Subject: ${sub}`;
          timeContent.innerHTML = `Time: ${time}`;
  
          // Append to, sub, and time elements to the contentDiv
          contentDiv.appendChild(toContent);
          contentDiv.appendChild(subContent);
          contentDiv.appendChild(timeContent);
  
          // Append the contentDiv to the anchor element
          link.appendChild(contentDiv);

          // Append the contentDiv to the desired container element
          // For example, if you have a div with id "emailContainer", you can use:
          // document.querySelector('#emails-view').append(contentDiv);
          document.querySelector('#emails-view').append(link);
        }
      });
  }else if(mailbox === 'archived') {
    fetch('/emails/archived')
      .then(response => response.json())
      .then(emails => {
        // Print emails
        console.log(emails);
  
        // Iterate over the emails array
        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];
            if(email.archived.value === true){
              const id = email.id;
              const to = email.recipients;
              const from = email.sender;
              const sub = email.subject;
              const time = email.timestamp;
              const read = email.read;
              const archived = email.archived;

              // Create an anchor element for the clickable link
              const link = document.createElement('a');
              link.href = '#'; // Set the desired link URL or leave it as '#' for now
      
              // Create a div item for the email content
              const contentDiv = document.createElement('div');
              contentDiv.style.border = '1px solid black';
              contentDiv.style.padding = '10px';
              contentDiv.style.marginBottom = '10px';
      
      
              // Create elements for from, sub, and time
              const fromContent = document.createElement('h4');
              const subContent = document.createElement('h3');
              const timeContent = document.createElement('h5');
      
              // Set the innerHTML of from, sub, and time elements
              fromContent.innerHTML = `from: ${from}`;
              subContent.innerHTML = `Subject: ${sub}`;
              timeContent.innerHTML = `Time: ${time}`;
      
              // Append from, sub, and time elements from the contentDiv
              contentDiv.appendChild(fromContent);
              contentDiv.appendChild(subContent);
              contentDiv.appendChild(timeContent);
      
              // Append the contentDiv to the anchor element
              link.appendChild(contentDiv);

              // Append the contentDiv to the desired container element
              // For example, if you have a div with id "emailContainer", you can use:
              // document.querySelector('#emails-view').append(contentDiv);
              document.querySelector('#emails-view').append(link);
            }
        }
      });
    }
}



/* 
When a user submits the email composition form, add JavaScript code to actually send the email.

Make a POST request to /emails, passing in values for recipients, subject, and body.

Once the email has been sent, load the user’s sent mailbox.
*/
function send_mail(){
  // alert('sending')
  const to = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;
  console.log(to);
  console.log(subject);
  console.log(body);
  
  // Send post request to upload new email
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: to,
        subject: subject,
        body: body
    })
  })
  // Put response into json form
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      alert(JSON.stringify(result))
  });

  return false;

}
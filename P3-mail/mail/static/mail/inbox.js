/* when the DOM content of the page has been loaded, 
  we attach event listeners to each of the buttons. */

document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

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
}


/* 
When a user submits the email composition form, add JavaScript code to actually send the email.

Make a POST request to /emails, passing in values for recipients, subject, and body.

Once the email has been sent, load the user’s sent mailbox.
*/
function send_mail(){

}
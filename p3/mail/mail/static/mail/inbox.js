document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  // add event as an argument
  document.querySelector('form').onsubmit = function() {
    // and then do your stuff
    send_email();
    load_mailbox('sent');
    return false;
  }

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

async function load_mailbox(mailbox) { 
  console.log('Opening mailbox: ', mailbox)
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';


  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //load emails
  console.log('Gettings Emails for: ', mailbox);

  try {
    const response = await fetch(`/emails/${mailbox}`)
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
        contentDiv.classList.add('email-item');
        
        
        if(read === true){
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

        link.addEventListener('click', () => view_email(id));

        // Append the contentDiv to the desired container element
        // For example, if you have a div with id "emailContainer", you can use:
        // document.querySelector('#emails-view').append(contentDiv);
        document.querySelector('#emails-view').append(link);
      }
    });
  }catch(err){
    console.error(err)
  }

}

async function send_email() {
  console.log('Sending Email');
  
  try {
    const response = await fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value,
      }),
    });

    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  window.alert('Email Sent!');
}

async function view_email(id){
  console.log('Opening Email: ', id)
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').innerHTML = `<h3>View Email</h3>`;

  try{
    const response = await fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
        // Print email
        console.log(email);
        const id = email.id;
        const to = email.recipients;
        const body = email.body;
        const from = email.sender;
        const sub = email.subject;
        const time = email.timestamp;
        const archived = email.archived;
        
        // Create a div item for the email content
        const contentDiv = document.createElement('div');
        
        // Create elements for from, sub, and time
        const fromContent = document.createElement('h4');
        const toContent = document.createElement('h4');
        const subContent = document.createElement('h3');
        const timeContent = document.createElement('h5');
        const bodyContent = document.createElement('h5');
        const archLinkContent = document.createElement('a');
        const repLinkContent = document.createElement('a');

        archLinkContent.href = '#'; // Set the desired link URL or leave it as '#' for now
        if(archived == true){
          archLinkContent.innerHTML = 'UnArchive'
          archLinkContent.onclick = function() {
            unarchive_email(id);
            load_mailbox('inbox');
            return false;
          }
        }
        else{
          archLinkContent.innerHTML = 'Archive'
          archLinkContent.onclick = function() {
            archive_email(id);
            load_mailbox('inbox');
            return false;
          }
        }

        repLinkContent.href = '#'; // Set the desired link URL or leave it as '#' for now
        repLinkContent.onclick = function() {
          reply_email(id);
          return false;
        }

        // Set the innerHTML of from, sub, and time elements
        fromContent.innerHTML = `Senders: ${from}`;
        toContent.innerHTML = `Recipients: ${to}`;
        subContent.innerHTML = `Subject: ${sub}`;
        timeContent.innerHTML = `Time: ${time}`;
        bodyContent.innerHTML = `Message: ${body}`;
        repLinkContent.innerHTML = 'Reply'



        // Append from, sub, and time elements to the contentDiv
        contentDiv.appendChild(archLinkContent);
        contentDiv.appendChild(fromContent);
        contentDiv.appendChild(toContent);
        contentDiv.appendChild(subContent);
        contentDiv.appendChild(timeContent);
        contentDiv.appendChild(bodyContent);
        contentDiv.appendChild(repLinkContent);
        document.querySelector('#email-view').append(contentDiv);

    });
  }catch(err){
    console.error(err)
  }

  try {
    await fetch(`/emails/${id}`, {
       method: 'PUT',
       body: JSON.stringify({
           read: true
       })
     })
   }catch(err){
     console.error(err)
   }

}

async function archive_email(id){
  console.log('Archiving email: ', id)
  try {
    await fetch(`/emails/${id}`, {
       method: 'PUT',
       body: JSON.stringify({
        archived: true
       })
     })
   }catch(err){
     console.error(err)
   }
}

async function unarchive_email(id){
  console.log('UnArchiving email: ', id)
  try {
    await fetch(`/emails/${id}`, {
       method: 'PUT',
       body: JSON.stringify({
        archived: false
       })
     })
   }catch(err){
     console.error(err)
   }
}

async function reply_email(id){
  console.log('Replying to email: ', id)
    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#email-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
  

  try {
    const response = await fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
        // Print email
        console.log(email);
        const body = email.body;
        const from = email.sender;
        const sub = email.subject;
        const time = email.timestamp;
        
        document.querySelector('#compose-recipients').value = from;
        document.querySelector('#compose-subject').value = `Re: ${sub}`;
        document.querySelector('#compose-body').value = `On ${time} ${from} wrote: ${body}`;
            

    });

   }catch(err){
     console.error(err)
   }
}
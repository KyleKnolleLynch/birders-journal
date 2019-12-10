const entries = document.querySelector('.entries');
const entryTitle = document.querySelector('.entry-title');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');

document.addEventListener('DOMContentLoaded', () => {
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });

  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });

  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  const date = document.querySelectorAll('.datepicker');
  M.Datepicker.init(date, { container: 'body', showClearBtn: true });

  const time = document.querySelectorAll('.timepicker');
  M.Timepicker.init(time, { container: 'body', showClearBtn: true });
});

//  conditional links
const loggedInUI = user => {
  const accDetails = document.querySelector('.account-details');

  if (user) {
    const creation = new Date(user.metadata.creationTime).toLocaleDateString();
    const lastSign = new Date(user.metadata.lastSignInTime).toLocaleString();

    loggedInLinks.forEach(link => (link.style.display = 'block'));
    loggedOutLinks.forEach(link => (link.style.display = 'none'));
    db.collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        accDetails.innerHTML = `
    <div>
    <h5>Logged in as:&nbsp;${user.email}</h5>
    <h6>Bio:&nbsp;${doc.data().bio}</h6>
    </div>
    <div>
    <h6>Date joined:&nbsp;${creation}</h6>
    <h6>Last signed in:&nbsp;${lastSign}</h6>
    </div>
    `;
      });
  } else {
    loggedInLinks.forEach(link => (link.style.display = 'none'));
    loggedOutLinks.forEach(link => (link.style.display = 'block'));
    accDetails.innerHTML = '';
  }
};

//  render entry data
const renderEntry = (data, id) => {
  if (data) {
    const htmlTemplate = `
  <div class="card-panel entry white row" data-id="${id}">
  <img src="/img/logo-bird.png" alt="logo-bird" />
  <div class="entry-details">
    <div class="entry-species"><span class="black-text form-text">Species:</span>&nbsp; ${
      data.species
    }</div>
    <div class="entry-location"><span class="black-text form-text">Location:</span>&nbsp; ${
      data.location
    }</div>
    <div class="entry-date"><span class="black-text form-text">Date:</span>&nbsp; ${
      data.date
    }</div>
    <div class="entry-time"><span class="black-text form-text">Time:</span>&nbsp; ${
      data.time
    }</div>
    <div class="entry-conditions"><span class="black-text form-text">Conditions:</span>&nbsp; ${
      data.conditions
    }</div>
    <div class="entry-notes"><span class="black-text form-text">Notes:</span>&nbsp; ${
      data.notes === undefined ? '' : data.notes
    }</div>
  </div>
  <div class="entry-delete">
    <i class="material-icons" data-id="${id}">delete_outline</i>
  </div>
</div>
  `;

    entries.insertAdjacentHTML('afterbegin', htmlTemplate);
    entryTitle.textContent = 'Entries';
  } else {
    entries.innerHTML = '';
    entryTitle.textContent = 'Login to View Entries';
  }
};

//  remove entry from dom
const removeEntry = id => {
  const entry = document.querySelector(`.entry[data-id=${id}]`);
  entry.remove();
};

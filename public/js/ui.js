const entries = document.querySelector('.entries');

document.addEventListener('DOMContentLoaded', () => {
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });

  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});

//  render entry data
const renderEntry = (data, id) => {
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
      data.notes === undefined ? "" : data.notes
    }</div>
  </div>
  <div class="entry-delete">
    <i class="material-icons" data-id="${id}">delete_outline</i>
  </div>
</div>
  `;

  entries.insertAdjacentHTML('afterbegin', htmlTemplate);
  // entries.innerHTML += htmlTemplate;
};

//  remove entry from dom
const removeEntry = id => {
  const entry = document.querySelector(`.entry[data-id=${id}]`);
  entry.remove();
};



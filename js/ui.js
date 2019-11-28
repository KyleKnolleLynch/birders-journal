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
    <div class="entry-species">${data.species}</div>
    <div class="entry-location">${data.location}</div>
    <div class="entry-date">${data.date}</div>
    <div class="entry-time">${data.time}</div>
    <div class="entry-conditions">${data.conditions}</div>
    <div class="entry-notes">${data.notes === undefined ? '' : data.notes}</div>
  </div>
  <div class="entry-delete">
    <i class="material-icons" data-id="${id}">delete_outline</i>
  </div>
</div>
  `;
  entries.insertAdjacentHTML('afterbegin', htmlTemplate);
  // entries.innerHTML += htmlTemplate;
};

//  offline data
db.enablePersistence().catch(err => {
  if (err.code == 'failed-precondition') {
    //  probably multiple tabs open simultaniously
    console.log('persistence failed');
  } else if (err.code == 'unimplemented') {
    //  lack of browser support
    console.log('persistance is not available');
  }
});

//

//  add entry
const form = document.querySelector('.add-entry');
form.addEventListener('submit', e => {
  e.preventDefault();
  const entry = {
    species: form.species.value,
    location: form.location.value,
    date: form.date.value,
    time: form.time.value,
    conditions: form.conditions.value,
    notes: form.notes.value
  };
  db.collection('entries')
    .add(entry)
    .then(() => {
      const formDiv = document.querySelector('.side-form');
      M.Sidenav.getInstance(formDiv).close();
    })
    .catch(err => console.log(err.message));

  form.species.value = '';
  form.location.value = '';
  form.date.value = '';
  form.time.value = '';
  form.conditions.value = '';
  form.notes.value = '';
});


//  delete entry
const entryContainer = document.querySelector('.entries');
entryContainer.addEventListener('click', e => {
  if (e.target.tagName === 'I') {
    const id = e.target.getAttribute('data-id');
    db.collection('entries')
      .doc(id)
      .delete()
      .catch(err => console.log(err));
  }
});

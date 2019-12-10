//  add admin cloud funciton
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', e => {
  e.preventDefault();
  const adminEmail = document.getElementById('admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

//  listen for auth state change
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      loggedInUI(user);
    });

    //  real-time listener
    db.collection('entries').onSnapshot(
      snapshot => {
       
        // console.log(snapshot.docChanges());
        snapshot.docChanges().forEach(change => {
          // console.log(change, change.doc.data(), change.doc.id);
          if (change.type === 'added') {
            renderEntry(change.doc.data(), change.doc.id);
          }
          if (change.type === 'removed') {
            removeEntry(change.doc.id);
          }
        });
      },
      err => {
        console.log(err.message);
      }
    );
  } else {
    loggedInUI();
    renderEntry();
  }
});

//  signup user
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db
        .collection('users')
        .doc(cred.user.uid)
        .set({
          bio: signupForm['signup-bio'].value
        });
    })
    .then(() => {
      const modal = document.getElementById('modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(err => {
      M.toast({ html: err });
    });
  entryTitle.textContent = 'Add Entries Below';
});

//  logout user
const logout = document.querySelector('.logout');
logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut();
});

//  login user
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      const modal = document.getElementById('modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    })
    .catch(err => {
      M.toast({ html: err });
    });
  if (entries.length) {
    entryTitle.textContent = 'Entries';
  } else {
    entryTitle.textContent = 'Add Entries Below';
  }
});

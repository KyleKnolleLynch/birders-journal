//  signup user
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred.user);

      const modal = document.getElementById('modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(err => {
      M.toast({ html: err });
    });
});

//  logout user
const logout = document.querySelector('.logout');
logout.addEventListener('click', e => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {
      console.log('user signed out');
    })
    .catch(err => {
      M.toast({ html: err });
    });
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
      console.log(cred.user);

      const modal = document.getElementById('modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    })
    .catch(err => {
      M.toast({ html: err });
    });
});

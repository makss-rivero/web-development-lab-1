const shell = document.querySelector('.auth-shell');
const form = document.querySelector('#access-form');
const modeButtons = document.querySelectorAll('[data-mode]');
const title = document.querySelector('#form-title');
const nameField = document.querySelector('#name-field');
const fullName = document.querySelector('#full-name');
const password = document.querySelector('#password');
const passwordToggle = document.querySelector('#toggle-password');
const feedback = document.querySelector('#feedback');
let mode = 'login';
form.noValidate = true;

function clearFeedback() {
  feedback.textContent = 'Demo only. No details are sent.';
  feedback.classList.remove('is-error');
  form.classList.remove('has-errors');
}

function showPassword(show) {
  password.type = show ? 'text' : 'password';
  passwordToggle.textContent = show ? 'Hide' : 'Show';
  passwordToggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  passwordToggle.setAttribute('aria-pressed', show);
}

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    mode = button.dataset.mode;
    const registering = mode === 'register';
    shell.classList.toggle('is-register', registering);
    nameField.hidden = !registering;
    fullName.disabled = !registering;
    fullName.required = registering;
    fullName.setCustomValidity('');
    title.textContent = registering ? 'Register' : 'Log in';
    document.querySelector('#form-description').textContent = registering ? 'Make a little space for yourself.' : 'Good to see you again.';
    document.querySelector('#submit-label').textContent = registering ? 'Create account' : 'Log in';
    password.autocomplete = registering ? 'new-password' : 'current-password';
    password.value = '';
    showPassword(false);
    modeButtons.forEach((item) => {
      item.disabled = item === button;
      item.setAttribute('aria-pressed', item === button);
    });
    clearFeedback();
    title.focus({ preventScroll: true });
  });
});

passwordToggle.addEventListener('click', () => {
  showPassword(password.type === 'password');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  fullName.setCustomValidity(mode === 'register' && !fullName.value.trim() ? 'Please enter your name.' : '');
  if (!form.checkValidity()) {
    form.classList.add('has-errors');
    feedback.classList.add('is-error');
    feedback.textContent = 'Complete the fields with a valid email and a password of at least 8 characters.';
    form.reportValidity();
    return;
  }
  clearFeedback();
  feedback.textContent = mode === 'register'
    ? 'Details valid. Demo only — no account was created.'
    : 'Details valid. Demo only — no sign-in was performed.';
});

form.addEventListener('input', () => {
  fullName.setCustomValidity('');
  clearFeedback();
});

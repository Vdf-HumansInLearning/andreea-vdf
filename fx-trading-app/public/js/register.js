const form = document.getElementById("form-register");
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateRegisterForm(); // front-end validation
    console.log(isValid);

    if (isValid) {
        // submit form
        form.submit();
    }
});

function validateRegisterForm() {
    let isValid = true;

    const username = document.getElementById('username');
    removePreviousError(username.parentElement);
    if (!username.value) {
        isValid = false;
        username.parentElement.insertAdjacentHTML('beforeend', '<p class="error">Username is not valid</p>');
    } else if (username.value.length < 3 || username.value.length > 20) {
        isValid = false;
        username.parentElement.insertAdjacentHTML('beforeend', '<p class="error">Username must be between 3 and 20 characters</p>');
    }

    const email = document.getElementById('email');
    removePreviousError(email.parentElement);
    const pattern = /^\S+@\S+\.\S+$/;
    if (!pattern.test(email.value)) {
        email.parentElement.insertAdjacentHTML('beforeend', '<p class="error">Email is not valid</p>');
    }

    const password = document.getElementById('password');
    removePreviousError(password.parentElement);
    if (password.value.length <= 6 || password.value.length >= 20) {
        isValid = false;
        password.parentElement.insertAdjacentHTML('beforeend', '<p class="error">Password must be between 6 and 20 characters</p>');
    }

    const confirmPassword = document.getElementById('confirm-password');
    removePreviousError(confirmPassword.parentElement);
    if (confirmPassword.value !== password.value) {
        isValid = false;
        password.parentElement.insertAdjacentHTML('beforeend', '<p class="error">Passwords do not match</p>');
    }

    return isValid;
}

function removePreviousError(parent) {
    const errors = parent.getElementsByClassName('error');

    if (errors.length > 0) {
        for (let errChild of errors) {
            parent.removeChild(errChild);
        }
    }

}
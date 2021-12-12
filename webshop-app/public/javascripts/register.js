
const form = document.getElementById("register-form");
if(form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
    
        let regexLetters = /^[a-zA-Z ]{2,30}$/;
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let regexUsername = /^[a-z0-9_-]{3,16}$/igm;
        let firstName = document.getElementById("first-name");
        let lastName = document.getElementById("last-name");
        let username = document.getElementById("username");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        if(regexLetters.test(firstName.value) && regexLetters.test(lastName.value) && regexPassword.test(password.value) && regexEmail.test(email.value) && regexUsername.test(username.value)) {
            // form.submit();
            fetch(form.action,{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username : username.value, first_name : firstName.value, last_name : lastName.value, email : email.value, password : password.value})
            })
            .then(data => {
                console.log(data);
                if(data.status === 200){
                    var myModal = new bootstrap.Modal(document.getElementById("register-success"), {});
                    myModal.show();
                    
                } else {
                    document.getElementById("invalid").classList.remove("d-none");
                }
                
            })
            
        }
    });

    var myModalEl = document.getElementById('register-success')
    myModalEl.addEventListener('hide.bs.modal', function (event) {
        window.location.href = "http://localhost:3000/auth/login";
    });
    
    // Get the input box
    let passwordInput = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    confirmPassword.disabled = true;
    
    // Init a timeout variable to be used below
    let timeout = null;
    
    // Listen for keystroke events
    passwordInput.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        
        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if(regex.test(passwordInput.value) === false){
                document.getElementById("invalid-password").style.display = "block";
                confirmPassword.disabled = true;
            } else {
                document.getElementById("invalid-password").style.display = "none";
                confirmPassword.disabled = false;
            }
        }, 1000);
    });
    
    confirmPassword.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        
        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            if(confirmPassword.value !== passwordInput.value){
                document.getElementById("invalid-confirm-password").style.display = "block";
            } else {
                document.getElementById("invalid-confirm-password").style.display = "none";
            }
        }, 1000);
    });

    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    firstName.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        let regexLetters = /^[a-zA-Z ]{2,30}$/;
        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            if(regexLetters.test(firstName.value)) {
                document.getElementById("invalid-name").style.display = "none";
            } else {
                document.getElementById("invalid-name").style.display = "block";
            }
            
        }, 1000);
    });

    lastName.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        let regexLetters = /^[a-zA-Z ]{2,30}$/;
        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            if(regexLetters.test(lastName.value)) {
                document.getElementById("invalid-name").style.display = "none";
            } else {
                document.getElementById("invalid-name").style.display = "block";
            }
            
        }, 1000);
    });


    
    
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    email.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            if(regexEmail.test(email.value)) {
                document.getElementById("invalid-email").style.display = "none";
            } else {
                document.getElementById("invalid-email").style.display = "block";
            }
            
        }, 1000);
    });

    username.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        let regexUsername = /^[a-z0-9_-]{3,16}$/igm;
        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            if(regexUsername.test(username.value)) {
                document.getElementById("invalid-username").style.display = "none";
            } else {
                document.getElementById("invalid-username").style.display = "block";
            }
            
        }, 1000);
    });
}

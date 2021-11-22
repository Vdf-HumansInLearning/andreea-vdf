
const form = document.getElementById("register-form");
if(form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
    
        let regex = /^[a-zA-Z ]{2,30}$/;
        let firstName = document.getElementById("first-name");
        let lastName = document.getElementById("last-name");
        let username = document.getElementById("username");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        if(regex.test(firstName.value) && regex.test(lastName.value)) {
            document.getElementById("invalid-name").style.display = "none";
            form.submit();
            fetch(`http://localhost:3000/register?username=${username.value}&first_name=${firstName.value}&last_name=${lastName.value}&email=${email.value}&password=${password.value}`,{
                method: 'post'
            })
            .then(data => {
                console.log(data);
            })
            window.location.href = "http://localhost:3000/login";
        } else {
            document.getElementById("invalid-name").style.display = "block";
        }
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
                console.log("not ok");
                confirmPassword.disabled = true;
            } else {
                console.log("ok");
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
}

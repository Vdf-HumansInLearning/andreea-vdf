
if(document.getElementById("login-form")){
    let localStorageStatus = localStorage.getItem('register_status');
    if(localStorageStatus === '200'){
        alert("Successfully registered! Please log in!");
    }
    localStorage.removeItem('register_status');
    document.getElementById("login-form").addEventListener("submit",function(e) {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let formData = new FormData();
        formData.append("email", username);
        formData.append("password", password);
        fetch(document.getElementById("login-form").action,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, password : password})
        })
        .then(data => {
            console.log(document.cookie);
            console.log(data);
            if(document.cookie === ""){
                document.getElementById("invalid").classList.remove("d-none");
            } else {
                if(data.status === 200){
                    localStorage.setItem("login_status", 200);
                    window.location.href = "http://localhost:3000/";
                }
                
            }
            
        })
        
    
    });
}

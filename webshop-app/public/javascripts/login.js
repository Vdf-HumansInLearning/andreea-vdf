
if(document.getElementById("login-form")){
    document.getElementById("login-form").addEventListener("submit",function(e) {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        fetch(document.getElementById("login-form").action + `/${username}/${password}`,{
            method: 'post'
        })
        .then(data => {
            console.log(document.cookie);
            if(document.cookie === ""){
                document.getElementById("invalid").classList.remove("d-none");
            } else {
                window.location.href = "http://localhost:3000/";
            }
            
        })
        
    
    });
}

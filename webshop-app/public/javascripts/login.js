
if(document.getElementById("login-form")){
    
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
                    var myModal = new bootstrap.Modal(document.getElementById("confirm-login"), {});
                    myModal.show();
                    
                }
                
            }
            
        })
        
    
    });
    var myModalEl = document.getElementById('confirm-login')
    myModalEl.addEventListener('hide.bs.modal', function (event) {
        window.location.href = "http://localhost:3000/";
    });
}

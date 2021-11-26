let localStorageItems = localStorage.getItem('items');
if(localStorageItems){
    let localStorageObject = JSON.parse(localStorageItems);
    document.getElementById("cart-items").textContent = localStorageObject.length;
}

if(document.querySelector("#navbar .nav-item .active")){
    document.querySelector("#navbar .nav-item .active").classList = "nav-link";
}
if(document.getElementById("users-link")) {
    document.getElementById("users-link").classList = "nav-link active";
}


let collapseBtn = document.querySelectorAll(".btn-collapse");
if(collapseBtn) {
    collapseBtn.forEach(item => {

        item.addEventListener('click', () => {
            let icon = document.createElement("i");        
            if(item.classList.contains("collapsed")){
                icon.setAttribute("class","fas fa-chevron-circle-down");
            } else {
                icon.setAttribute("class","fas fa-chevron-circle-up");
            }
            item.replaceChildren(icon);
        })
    });
}


let deleteBtn = document.querySelectorAll(".btn-delete");
if(deleteBtn){
    deleteBtn.forEach(item => {

        item.addEventListener('click', () => {
            document.getElementById("delete-user").addEventListener('click', function(e) {
                fetch(`/user/${item.id}`, {
                    method: 'DELETE',
                    }).then(data => {
                        window.location.reload();
                    });
            });
        })
    })
}

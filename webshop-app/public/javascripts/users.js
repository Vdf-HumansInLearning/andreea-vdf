let localStorageItems = localStorage.getItem('items');
if(localStorageItems){
    let localStorageObject = JSON.parse(localStorageItems);
    document.getElementById("cart-items").textContent = localStorageObject.length;
}

if(document.querySelector("#navbar .nav-item .active")){
    document.querySelector("#navbar .nav-item .active").classList = "nav-link";
}
document.getElementById("users-link").classList = "nav-link active";


let collapseBtn = document.querySelectorAll(".btn-collapse");
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

let deleteBtn = document.querySelectorAll(".btn-delete");
deleteBtn.forEach(item => {
    item.addEventListener('click', () => {
        fetch(`/users/delete/${item.id}`, {
        method: 'DELETE',
        }).then(data => {
            window.location.reload();
        });
        // document.getElementById(`item-${item.id}`).remove();
        // document.getElementById(`collapse${item.id}`).remove();
    })
})
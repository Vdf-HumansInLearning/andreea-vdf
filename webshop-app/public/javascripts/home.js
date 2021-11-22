if(document.querySelector("#navbar .nav-item .active")){
    document.querySelector("#navbar .nav-item .active").classList = "nav-link";
}
document.getElementById("home-link").classList = "nav-link active";

let localStorageItems = localStorage.getItem('items');
if(localStorageItems){
    let localStorageObject = JSON.parse(localStorageItems);
    document.getElementById("cart-items").textContent = localStorageObject.length;
}
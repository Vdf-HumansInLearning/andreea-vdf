let localStorageItems = localStorage.getItem('items');
if(localStorageItems){
    let localStorageObject = JSON.parse(localStorageItems);
    document.getElementById("cart-items").textContent = localStorageObject.length;
}
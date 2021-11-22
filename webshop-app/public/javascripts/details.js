const addCartBtn = document.getElementById("add-to-cart");

let localStorageItems = localStorage.getItem('items');
if(localStorageItems){
    let localStorageObject = JSON.parse(localStorageItems);
    document.getElementById("cart-items").textContent = localStorageObject.length;
}

addCartBtn.addEventListener("click", () => {
    let name = document.getElementById("brand").textContent;
    let price = document.getElementById("price").textContent;
    console.log(name, price);
    var existing = localStorage.getItem('items');
    if(existing){
        let count = 0;
        const parsedObject = JSON.parse(existing);
        console.log(parsedObject);
        for(let i=0;i<parsedObject.length;i++){
            console.log(parsedObject[i]);
            if(parsedObject[i].name === name){
                parsedObject[i].quantity += 1;
                count +=1;
                console.log(parsedObject[i]);
                
            }
        }
        console.log(count);
        if(count < 1){
            parsedObject.push({name: name, price : price, quantity : 1 });
            document.getElementById("cart-items").textContent = Number(document.getElementById("cart-items").textContent) + 1;
        }
        localStorage.setItem("items", JSON.stringify(parsedObject));
        
    } else {
        const items =  [{name: name, price : price, quantity : 1 }];
        localStorage.setItem("items", JSON.stringify(items));
        document.getElementById("cart-items").textContent = Number(document.getElementById("cart-items").textContent) + 1;
    }
    
    
});
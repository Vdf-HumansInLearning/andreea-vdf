let localStorageItems = localStorage.getItem('items');
if(localStorageItems){
    let localStorageObject = JSON.parse(localStorageItems);
    document.getElementById("cart-items").textContent = localStorageObject.length;

        
    let orderH3 = document.createElement("h3");
    orderH3.textContent = "Order Summary";
    let orderDiv = document.createElement("div");
    orderDiv.setAttribute("class","order");
    orderDiv.setAttribute("id","order");
    document.getElementById("container").appendChild(orderH3);
    document.getElementById("container").appendChild(orderDiv);
    let totalPrice = 0;
    for(let i=0;i<localStorageObject.length;i++){
        let itemDiv = document.createElement("div");
        itemDiv.setAttribute("class","d-flex justify-content-between align-items-center p-2 item-container");
        let h4 = document.createElement("h4");
        h4.textContent = i+1 + ". " + localStorageObject[i].name;
        let quantityDiv = document.createElement("div");
        let quantityTitle = document.createElement("p");
        quantityTitle.textContent = "Quantity";
        let qtySpanDiv = document.createElement("div");
        qtySpanDiv.setAttribute("class","d-flex justify-content-between");
        let spanMinus = document.createElement("span");
        let iconMinus = document.createElement("i");
        iconMinus.setAttribute("class","far fa-minus-square mx-2");
        spanMinus.appendChild(iconMinus);
        let quantity = document.createElement("p");
        quantity.textContent = localStorageObject[i].quantity;
        let spanPlus = document.createElement("span");
        let iconPlus = document.createElement("i");
        iconPlus.setAttribute("class","far fa-plus-square mx-2");
        spanPlus.appendChild(iconPlus);
        qtySpanDiv.appendChild(spanMinus);
        qtySpanDiv.appendChild(quantity);
        qtySpanDiv.appendChild(spanPlus);

        quantityDiv.appendChild(quantityTitle);
        quantityDiv.appendChild(qtySpanDiv);
        

        let priceDiv = document.createElement("div");
        let priceTitle = document.createElement("p");
        priceTitle.textContent = "Price";
        let price = document.createElement("p");
        price.textContent = `${localStorageObject[i].quantity} x ${localStorageObject[i].price} = ` + Number(localStorageObject[i].price) * localStorageObject[i].quantity + " RON";
        totalPrice += Number(localStorageObject[i].price) * localStorageObject[i].quantity;
        priceDiv.appendChild(priceTitle);
        priceDiv.appendChild(price);

        itemDiv.appendChild(h4);
        itemDiv.appendChild(quantityDiv);
        itemDiv.appendChild(priceDiv);

        orderDiv.appendChild(itemDiv);
    }


    let totalTitle = document.createElement("h4");
    totalTitle.textContent = "Total:";
    let totalDiv = document.createElement("div");
    totalDiv.setAttribute("class","order-total d-flex justify-content-between p-2");
    totalDiv.setAttribute("id","order-total");
    totalDiv.appendChild(totalTitle);

    let totalPriceH4 = document.createElement("h4");
    totalPriceH4.textContent = totalPrice + " RON";
    totalDiv.appendChild(totalPriceH4);
    orderDiv.appendChild(totalDiv);
} else {
    let emptyCart = document.createElement("h4");
    emptyCart.textContent = "Your cart is empty";
    let phonePageLink = document.createElement("a");
    phonePageLink.setAttribute("href","/phones");
    phonePageLink.textContent = "Continue shopping";
    document.getElementById("container").classList.add("text-center");
    document.getElementById("container").appendChild(emptyCart);
    document.getElementById("container").appendChild(phonePageLink);
}
var localStorageItems = localStorage.getItem('items');
var localStorageObject = JSON.parse(localStorageItems);

if(localStorageItems && localStorageObject.length > 0){

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
            h4.textContent = "- " + localStorageObject[i].name;
            let quantityDiv = document.createElement("div");
            let quantityTitle = document.createElement("p");
            quantityTitle.textContent = "Quantity";
            let qtySpanDiv = document.createElement("div");
            qtySpanDiv.setAttribute("class","d-flex justify-content-between");
            let spanMinus = document.createElement("span");
            let buttonMinus = document.createElement("button");
            buttonMinus.setAttribute("class","quantity-btn minus-btn");
            let iconMinus = document.createElement("i");
            iconMinus.setAttribute("class","far fa-minus-square mx-2");
            buttonMinus.appendChild(iconMinus);
            spanMinus.appendChild(buttonMinus);
            let quantity = document.createElement("p");
            quantity.setAttribute("class","quantity");
            quantity.textContent = localStorageObject[i].quantity;
            let spanPlus = document.createElement("span");
            let buttonPlus = document.createElement("button");
            buttonPlus.setAttribute("class","quantity-btn plus-btn");
            let iconPlus = document.createElement("i");
            iconPlus.setAttribute("class","far fa-plus-square mx-2");
            spanPlus.appendChild(buttonPlus);
            buttonPlus.appendChild(iconPlus);
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

            let removeDiv = document.createElement("div");
            let removeBtn = document.createElement("button");
            removeBtn.setAttribute("class","delete-item");
            removeBtn.setAttribute("data-bs-toggle","modal");
            removeBtn.setAttribute("data-bs-target","#confirm-delete");
            let removeIcon = document.createElement("i");
            removeIcon.setAttribute("class","far fa-trash-alt");
            removeBtn.appendChild(removeIcon);
            removeDiv.appendChild(removeBtn);

            itemDiv.appendChild(h4);
            itemDiv.appendChild(quantityDiv);
            itemDiv.appendChild(priceDiv);
            itemDiv.appendChild(removeDiv);

            orderDiv.appendChild(itemDiv);
        
    }


    let totalTitle = document.createElement("h4");
    totalTitle.textContent = "Total:";
    let totalDiv = document.createElement("div");
    totalDiv.setAttribute("class","order-total d-flex justify-content-between p-2");
    totalDiv.setAttribute("id","order-total");
    totalDiv.appendChild(totalTitle);

    var totalPriceH4 = document.createElement("h4");
    totalPriceH4.textContent = totalPrice + " RON";
    totalDiv.appendChild(totalPriceH4);
    orderDiv.appendChild(totalDiv);

    let orderBtnDiv = document.createElement("div");
    orderBtnDiv.setAttribute("class","d-flex justify-content-end mt-3");
    let orderBtn = document.createElement("button");
    orderBtn.setAttribute("id","order-btn");
    orderBtn.setAttribute("class","order-btn btn btn-outline-dark");
    orderBtn.textContent = "Place Order";
    orderBtnDiv.appendChild(orderBtn);
    document.getElementById("container").appendChild(orderBtnDiv);

   
    let modalDiv = document.createElement("div");
    modalDiv.setAttribute("class","modal");
    modalDiv.setAttribute("id","confirm-delete");
    modalDiv.setAttribute("role","dialog");
    let modalDialogDiv = document.createElement("div");
    modalDialogDiv.setAttribute("class","modal-dialog modal-dialog-centered");

    let modalContent = document.createElement("div");
    modalContent.setAttribute("class","modal-content");
    let modalHeader = document.createElement("div");
    modalHeader.setAttribute("class","modal-header");
    let modalHeaderH5 = document.createElement("h5");
    modalHeaderH5.setAttribute("class","modal-title");
    modalHeaderH5.textContent = "Are you sure you want to delete this item?";
    let modalHeaderBtn = document.createElement("button");
    modalHeaderBtn.setAttribute("class","btn-close");
    modalHeaderBtn.setAttribute("type","button");
    modalHeaderBtn.setAttribute("data-bs-dismiss","modal");
    modalHeaderBtn.setAttribute("aria-label","Close");
    modalHeader.appendChild(modalHeaderH5);
    modalHeader.appendChild(modalHeaderBtn);
    let modalBody = document.createElement("div");
    modalBody.setAttribute("class","modal-body");
    let modalFooter = document.createElement("div");
    modalFooter.setAttribute("class","modal-footer d-flex justify-content-between");
    let modalFooterCancelBtn = document.createElement("button");
    modalFooterCancelBtn.setAttribute("class","btn btn-secondary");
    modalFooterCancelBtn.setAttribute("type","button");
    modalFooterCancelBtn.setAttribute("data-bs-dismiss","modal");
    modalFooterCancelBtn.textContent = "Close";
    let modalFooterDeleteBtn = document.createElement("button");
    modalFooterDeleteBtn.setAttribute("id","delete-user");
    modalFooterDeleteBtn.setAttribute("type","button");
    modalFooterDeleteBtn.setAttribute("class","btn btn-danger");
    modalFooterDeleteBtn.textContent = "Delete item";
    modalFooter.appendChild(modalFooterCancelBtn);
    modalFooter.appendChild(modalFooterDeleteBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialogDiv.appendChild(modalContent);
    modalDiv.appendChild(modalDialogDiv);
    document.getElementById("container").appendChild(modalDiv);


    const minusBtns = document.querySelectorAll(".minus-btn");
    const plusBtns = document.querySelectorAll(".plus-btn");
    minusBtns.forEach(item => {
        item.addEventListener('click', () => {
            if(Number(item.parentElement.nextSibling.textContent) > 0){
                item.parentElement.nextSibling.textContent = Number(item.parentElement.nextSibling.textContent) - 1;
                let total = 0;
                for(let i=0;i<localStorageObject.length;i++){
                    if(localStorageObject[i].name === item.parentElement.parentElement.parentElement.parentElement.firstChild.textContent.slice(2)){
                        localStorageObject[i].quantity -= 1;
                        item.parentElement.parentElement.parentElement.nextSibling.lastChild.textContent = `${localStorageObject[i].quantity} x ${localStorageObject[i].price} = ` + Number(localStorageObject[i].price) * (localStorageObject[i].quantity) + " RON";
                        
                    }
                    if(localStorageObject[i].quantity === 0){
                        localStorageObject.splice(i, 1);
                        i=i-1;
                        localStorage.setItem("items", JSON.stringify(localStorageObject));
                        item.parentElement.parentElement.parentElement.parentElement.remove();
                        document.getElementById("cart-items").textContent = localStorageObject.length;
                    } else {
                        total += Number(localStorageObject[i].price) * localStorageObject[i].quantity;
                    }
                    
                }
                if(localStorageObject.length > 0 ){
                    totalPriceH4.textContent = total + " RON";
                } else {
                    window.location.reload();
                }
                
                
            }
        });
    });
    plusBtns.forEach(item => {
        item.addEventListener('click', () => {
            item.parentElement.previousSibling.textContent = Number(item.parentElement.previousSibling.textContent) + 1;
            let total = 0;
            for(let i=0;i<localStorageObject.length;i++){
                if(localStorageObject[i].name === item.parentElement.parentElement.parentElement.parentElement.firstChild.textContent.slice(2)){
                    localStorageObject[i].quantity += 1;
                    item.parentElement.parentElement.parentElement.nextSibling.lastChild.textContent = `${localStorageObject[i].quantity} x ${localStorageObject[i].price} = ` + Number(localStorageObject[i].price) * (localStorageObject[i].quantity) + " RON";
                }
                localStorage.setItem("items", JSON.stringify(localStorageObject));
                total += Number(localStorageObject[i].price) * localStorageObject[i].quantity;
            }
            totalPriceH4.textContent = total + " RON";
        });
    });

    const deleteBtns = document.querySelectorAll(".delete-item");
    console.log(deleteBtns);
    deleteBtns.forEach(item => {
        item.addEventListener("click", () => {
            document.getElementById("delete-user").addEventListener('click', function(e) {
                let total = 0;
                for(let i=0;i<localStorageObject.length;i++){
                    if(localStorageObject[i].name === item.parentElement.parentElement.firstChild.textContent.slice(2)){
                        localStorageObject.splice(i, 1);
                        i=i-1;
                        localStorage.setItem("items", JSON.stringify(localStorageObject));
                        item.parentElement.parentElement.remove();
                        document.getElementById("cart-items").textContent = localStorageObject.length;
                    } else {
                        total += Number(localStorageObject[i].price) * localStorageObject[i].quantity;
                    }
                    
                }
                if(localStorageObject.length > 0 ){
                    totalPriceH4.textContent = total + " RON";
                } else {
                    window.location.reload();
                }
            });
            
        });
    });

    orderBtn.addEventListener("click", () => {
        localStorage.removeItem("items");
        alert("You ordered!");
        window.location.reload();
    });
} else {
    localStorage.removeItem("items");
    let emptyCart = document.createElement("h4");
    emptyCart.textContent = "Your cart is empty";
    let phonePageLink = document.createElement("a");
    phonePageLink.setAttribute("href","/phones");
    phonePageLink.textContent = "Continue shopping";
    document.getElementById("container").classList.add("text-center");
    document.getElementById("container").appendChild(emptyCart);
    document.getElementById("container").appendChild(phonePageLink);
}
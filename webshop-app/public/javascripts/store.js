// phone store exercise

let localStorageItems = localStorage.getItem('items');
if(localStorageItems){
    let localStorageObject = JSON.parse(localStorageItems);
    document.getElementById("cart-items").textContent = localStorageObject.length;
}
    
if(document.querySelector("#navbar .nav-item .active")){
    document.querySelector("#navbar .nav-item .active").classList = "nav-link";
}
document.getElementById("phones-link").classList = "nav-link active";

// EVENT LISTENERS

    let form = document.getElementById("filter-form");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        let searchInput = document.getElementById("search-input").value;
        let sortSelected = document.getElementById("sort").value;
        let rating = document.getElementById("minimum_rating");
        console.log(searchInput !== "");
        console.log(sortSelected !== "none");
        if(searchInput !== ""){
            document.getElementById("hidden-search").value = searchInput;
        } else {
            document.getElementById("hidden-search").disabled = true;
        }
        if(sortSelected !== "none"){
            document.getElementById("hidden-sort").value = sortSelected;
        } else {
            document.getElementById("hidden-sort").disabled = true;
        }
        if(Number(rating.value) < 1){
            rating.disabled = true;
        }
        form.submit();
    });

    document.getElementById("search-input").addEventListener('blur',function() {
        let url = new URL(location.href);
        if(document.getElementById("search-input").value !== ""){
            if("http://localhost:3000/phones" === window.location.href){
                window.location.href += "?search=" + document.getElementById("search-input").value;
            } else {
                url.searchParams.delete('search');
                if("http://localhost:3000/phones" === url.href){
                    window.location.href += "?search=" + document.getElementById("search-input").value;
                } else {
                    window.location.href += "&search=" + document.getElementById("search-input").value;
                }
            }
        } else {
            url.searchParams.delete('search');
            window.location.href = url.href;
        }
        
    });

    document.getElementById("sort").addEventListener('change',function() {
        let url = new URL(location.href);
        if(document.getElementById("sort").value !== "none"){
            if("http://localhost:3000/phones" === window.location.href){
                window.location.href += "?sort=" + document.getElementById("sort").value;
            } else {
                url.searchParams.delete('sort');
                console.log(url.href)
                if("http://localhost:3000/phones" === url.href){
                    window.location.href = url.href + "?sort=" + document.getElementById("sort").value;
                } else {
                    window.location.href = url.href + "&sort=" + document.getElementById("sort").value;
                }
            }
        } else {
            url.searchParams.delete('sort');
            window.location.href = url.href;
        }
        
    });

    // hide/show the filter form
    document.getElementById('toggle-filters').addEventListener('click', function() {
        if(document.getElementById('filter-form').classList.contains('hide-form')){
            document.getElementById('filter-form').classList.remove('hide-form');
        } else {
            document.getElementById('filter-form').classList.add('hide-form');
        }
    });
    
    // reset the filters in the form
    document.getElementById('reset').addEventListener('click', function() {
        let url = "http://localhost:3000/phones";
        let count = 1;
        if(document.getElementById("search-input").value !== ""){
            url += "?search=" + document.getElementById("search-input").value;
            count += 1;
        }
        if(document.getElementById("sort").value !== "none"){
            if(count===1){
                url += "?sort=" + document.getElementById("sort").value;
            } else {
                url += "&sort=" + document.getElementById("sort").value;
            }
            
        }
        window.location.href = url;
    });

    if(document.getElementById("display-add-form")){
        document.getElementById("display-add-form").addEventListener("click", function() {
            document.getElementById("new-phone-container").classList.remove("hide");
        });

        document.getElementById("cancel-add").addEventListener("click", function() {
            document.getElementById("new-phone-container").classList.add("hide");
        });
    
        document.querySelectorAll("#new-phone-form .input-group .form-control").forEach(item => {
            item.addEventListener("blur", function() {
                let brand = document.getElementById("add-brand").value;
                let name = document.getElementById("add-name").value;
                let os = document.getElementById("add-os").value;
                let price = Number(document.getElementById("add-price").value);
                let discount = document.getElementById("add-discount").value;
                let quantity = Number(document.getElementById("add-quantity").value);
                let date = document.getElementById("add-date").value;
                let rating = document.getElementById("add-rating").value;
                if(discount){
                    discount = Number(discount);
                } else
                {
                    discount = 0;
                }
                if(rating){
                    rating = Number(rating);
                } else
                {
                    rating = -1;
                }
                // console.log(brand, name, os, price, discount, quantity, date, rating);
                if(brand && name && os && price && quantity && date) {
                    document.getElementById("add-phone").disabled = false;
                }
            })
        })
    
        document.getElementById("new-phone-form").addEventListener("submit",function(e) {
            e.preventDefault();
            let brand = document.getElementById("add-brand").value;
            let name = document.getElementById("add-name").value;
            let os = document.getElementById("add-os").value;
            let price = Number(document.getElementById("add-price").value);
            let discount = document.getElementById("add-discount").value;
            let quantity = Number(document.getElementById("add-quantity").value);
            let date = document.getElementById("add-date").value;
            let rating = document.getElementById("add-rating").value;
            if(discount){
                discount = Number(discount);
            } else
            {
                discount = 0;
            }
            if(rating){
                rating = Number(rating);
            } else
            {
                rating = -1;
            }
    
            let img_path = "";
                switch(brand){
                    case "Samsung" :
                        img_path += "toppng.com-samsung-phone-833x870.png";
                        break;
                    case "Apple" :
                        img_path += "toppng.com-iphone-550x620.png";
                        break;
                    case "Motorola" :
                        img_path += "toppng.com-motorola-moto-x-gen-2-tempered-glass-by-cellhelmet-motorola-moto-x2-310x585.png";
                        break;
                    case "Google" :
                        img_path += "toppng.com-google-pixel-1-white-600x600.png";
                        break;
                    case "Xiaomi" :
                        img_path += "toppng.com-xiaomi-smartphone-710x710.png";
                        break;
                    case "Huawei" :
                        img_path += "toppng.com-huawei-p8-1200x900.png";
                        break;
                    default :
                        img_path = "";
            }
            document.getElementById("new-phone-container").classList.add("hide");
    
            fetch(document.getElementById("new-phone-form").action + `?brand=${brand}&name=${name}&os=${os}&price=${price}&discount=${discount}&quantity=${quantity}&date=${date}&rating=${rating}&imgUrl=${img_path}`,{
                method: 'post'
            })
            .then(data => {
                console.log(data);
            })
            window.location.reload();
    
        });
    }
    

const addCartBtn = document.querySelectorAll(".add-to-cart");

addCartBtn.forEach(item => {
    item.addEventListener("click", () => {
        // console.log(item.parentElement);

        let name = item.parentElement.querySelector(".title").textContent + " " + item.parentElement.querySelector(".subtitle").textContent;
        let price = item.parentElement.querySelector(".price").textContent;
        // console.log(name);
        // console.log(price);
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
});

    

// FUNCTIONS

    // filter by available date (change availability_date to see effects)
    function getProductsByDate(item){
        let today = new Date();
        return new Date(item.availability_date) <= today;
    }

    // ADMIN ACTIONS

    // show all phones with less than N items available in stock
    function getProductsWithStock(num){
        let filtered = productObj.products.filter(product => product.quantity < num);
        return filtered
    }

    // show average rating by brand - for all brands
    function getAverageRatingByBrand(){

        let brands = new Set();
        productObj.products.forEach(product => brands.add(product.brand));

        let ratingArr = [];

        brands.forEach(brand => {
            let average = parseFloat(productObj.products.filter(product => product.brand === brand && product.rating > 0).reduce((previous,current,index,array) => {
                let calcSum = previous + current.rating;
                if(index === array.length - 1 ) {
                    return calcSum/array.length;
                }
                return calcSum;
            },0).toFixed(1));
            ratingArr.push([brand,average]);
        });
        return ratingArr;
        
    }

    // show average rating by brand - for selected brands
    function getAverageRatingBySelectedBrand(...brands){

        let ratingArr = [];

        brands.forEach(brand => {
            let average = parseFloat(productObj.products.filter(product => product.brand === brand && product.rating > 0).reduce((previous,current,index,array) => {
                let calcSum = previous + current.rating;
                if(index === array.length - 1 ) {
                    return calcSum/array.length;
                }
                return calcSum;
            },0).toFixed(1));
            ratingArr.push([brand,average]);
        });
        return ratingArr;
        
    }

    // show average discount by brand - for all brands
    function getAverageDiscountByBrand(){

        let brands = new Set();
        productObj.products.forEach(product => brands.add(product.brand));

        let discountArr = [];
        
        brands.forEach(brand => {
            let average = parseFloat(productObj.products.filter(product => product.brand === brand).reduce((previous,current,index,array) => {
                let calcSum = previous + current.discount;
                if(index === array.length - 1 ) {
                    return calcSum/array.length;
                }
                return calcSum;
            },0).toFixed());
            discountArr.push([brand,average]);
        });
        return discountArr;
        
    }

    // show average discount by brand - for selected brands
    function getAverageDiscountBySelectedBrand(...brands){

        let discountArr = [];
        
        brands.forEach(brand => {
            let average = parseFloat(productObj.products.filter(product => product.brand === brand).reduce((previous,current,index,array) => {
                let calcSum = previous + current.discount;
                if(index === array.length - 1 ) {
                    return calcSum/array.length;
                }
                return calcSum;
            },0).toFixed());
            discountArr.push([brand,average]);
        });
        return discountArr;
        
    }

    // show max discount by brand
    function getMaxDiscountByBrand(){

        let brands = new Set();
        productObj.products.forEach(product => brands.add(product.brand));

        let discountArr = [];
        
        brands.forEach(brand => {
            let max = productObj.products.filter(product => product.brand === brand).map(product => product.discount).reduce((previous,current) => Math.max(previous,current));
            discountArr.push([brand,max]);
        });
        return discountArr;
    }


    // sort by brand
    function getSortedByBrand(){
        return (a,b) => {
            return a.brand.localeCompare(b.brand);
        };
    }

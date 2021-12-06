let articles;

window.onload = function(e) {
    if(window.location.hash === ""){
        window.location.hash = "home";
    }
    onRouteChange(e);
    window.scrollTo(0, 0);
    let localStorageTheme = localStorage.getItem('theme');
    if(localStorageTheme === 'dark'){
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
}

window.addEventListener('hashchange', e => this.onRouteChange(e));

function onRouteChange(e) {
    window.scrollTo(0, 0);
    const hashLocation = window.location.hash.substring(1);
    this.loadContent(hashLocation);
}

// call getArticles to load the content
function loadContent(uri){
    getArticles(uri);  
}

//FUNCTIONS
// get articles from db.json
function getArticles(uri) {

    fetch('http://localhost:3000/articles')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
            articles = data;
            displayHtml(uri);
            if(uri === "home") {

                // CONSTANTS
                const ADDBTN = document.getElementById("add-article");
                const CANCELBTN = document.getElementById("cancel");
                const SAVEBTN = document.getElementById("save");
                const MODAL = document.querySelector(".modal__overlay");
                const DELETEBUTTONS = document.querySelectorAll(".btn-delete");
                const EDITBUTTONS = document.querySelectorAll(".btn-edit");

                // EVENT LISTENERS
                ADDBTN.addEventListener('click', () => {
                    MODAL.style.display = "block";
                    

                    CANCELBTN.addEventListener('click', () => {
                        MODAL.style.display = "none";
                    });
    
                    SAVEBTN.addEventListener('click', () => {
                        addArticle();
                    });
                });

                

                DELETEBUTTONS.forEach( item => {
                    item.addEventListener('click', () => {
                        id = item.parentElement.id;
                        deleteArticle(id);
                    });
                });

                EDITBUTTONS.forEach( item => {
                    item.addEventListener('click', () => {
                        id = item.parentElement.id;
                        editArticle(id);
                    });
                });
            }

            document.getElementById("theme-btn").addEventListener("click", function() {
                
                if(document.getElementById("theme-btn").childNodes[0].id === "dark-icon"){
                    document.getElementById("theme-btn").removeChild(document.getElementById("theme-btn").childNodes[0]);
                    let lightIcon = document.createElement("i");
                    lightIcon.setAttribute("class","far fa-sun");
                    lightIcon.setAttribute("id","light-icon");
                    document.getElementById("theme-btn").appendChild(lightIcon);
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem("theme", "dark");
                } else {
                    document.getElementById("theme-btn").removeChild(document.getElementById("theme-btn").childNodes[0]);
                    let darkIcon = document.createElement("i");
                    darkIcon.setAttribute("class","far fa-moon");
                    darkIcon.setAttribute("id","dark-icon");
                    document.getElementById("theme-btn").appendChild(darkIcon);
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem("theme", "light");
                }
                
            });
            
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

function addArticle() {
    const titleInput = document.getElementById("title");
    const tagInput = document.getElementById("tag");
    const authorInput = document.getElementById("author");
    const imageInput = document.getElementById("image");
    const dateInput = document.getElementById("date");
    const sayingInput = document.getElementById("saying");
    const contentInput = document.getElementById("article-content");
    if(titleInput.value !== "" && tagInput.value !== "" && authorInput.value !== "" && imageInput.value !== "" && dateInput.value !== "" && sayingInput.value !== "" && contentInput.value !== ""){
        fetch("http://localhost:3000/articles", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title":titleInput.value,
                "info":{
                    "subtitle":tagInput.value,
                    "author":authorInput.value,
                    "date":dateInput.value
                },
                "imgUrl":imageInput.value,
                "imgAlt":imageInput.value,
                "content":contentInput.value.split(/\r?\n/),
                "saying":sayingInput.value
            })
          })
        //   .then(json)
          .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            cleanupAndLoad()
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
}

function editArticle(id) {
    
    const MODAL = document.querySelector(".modal__overlay");
    const CANCELBTN = document.getElementById("cancel");
    const SAVEBTN = document.getElementById("save");
    const titleInput = document.getElementById("title");
    const tagInput = document.getElementById("tag");
    const authorInput = document.getElementById("author");
    const imageInput = document.getElementById("image");
    const dateInput = document.getElementById("date");
    const sayingInput = document.getElementById("saying");
    const contentInput = document.getElementById("article-content");
    let article = articles.find(item => item.id == id);
    titleInput.value = article.title;
    tagInput.value = article.info.subtitle;
    authorInput.value = article.info.author;
    imageInput.value = article.imgUrl;
    dateInput.value = article.info.date;
    sayingInput.value = article.saying;
    contentInput.value = article.content.join("\r\n");
  
    MODAL.style.display = "block";
    

    CANCELBTN.addEventListener('click', () => {
        titleInput.value = "";
        tagInput.value = "";
        authorInput.value = "";
        imageInput.value = "";
        dateInput.value = "";
        sayingInput.value = "";
        contentInput.value = "";
        MODAL.style.display = "none";
    });

    SAVEBTN.addEventListener('click', () => {
        fetch(`http://localhost:3000/articles/${id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    "title":titleInput.value,
                    "info":{
                        "subtitle":tagInput.value,
                        "author":authorInput.value,
                        "date":dateInput.value
                    },
                    "imgUrl":imageInput.value,
                    "imgAlt":imageInput.value,
                    "content":contentInput.value.split(/\r?\n/),
                    "saying":sayingInput.value
            })
          })
        //   .then(json)
          .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            cleanupAndLoad()
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
    });
}

function deleteArticle(id) {
    fetch(`http://localhost:3000/articles/${id}`, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => {
        cleanupAndLoad()
    })
}

function cleanupAndLoad() {
    let body = document.getElementsByTagName("body")[0];
    if(body){
        body.querySelectorAll('*').forEach(n => n.remove());
    }
    loadContent(window.location.hash.substring(1));
}

// display HTML based on the path (home or article)
function displayHtml(path) {
    // before anything, remove everything from the body element
    let body = document.getElementsByTagName("body")[0];
    if(body){
        body.querySelectorAll('*').forEach(n => n.remove());
    }
    
    // in case the path contains article, we will display the Article page
    if(path.startsWith("article")) {
        const articleId = path.slice(11);
        let article = articles.filter(item => item.id === Number(articleId));

        let containerDiv = document.createElement("div");
        containerDiv.setAttribute("class","container");

        let themeButton = document.createElement("button");
        themeButton.setAttribute("class","theme-btn");
        themeButton.setAttribute("id","theme-btn");
        let icon = document.createElement("i");

        let localStorageTheme = localStorage.getItem('theme');
        if(localStorageTheme === 'dark'){
            icon.setAttribute("class","far fa-sun");
            icon.setAttribute("id","light-icon");
        } else {
            icon.setAttribute("class","far fa-moon");
            icon.setAttribute("id","dark-icon");
        }
            
        themeButton.appendChild(icon);
        containerDiv.appendChild(themeButton);
        containerDiv.appendChild(createNav());

        let main = document.createElement("main");
        main.setAttribute("class","main");
        main.appendChild(createArticleDetails(article[0]));

        containerDiv.appendChild(main);
        containerDiv.appendChild(createFooterDetails());
        body.appendChild(containerDiv);

    // in case the path is home, we will display the Home page
    } else if (path === "home") {
        let containerDiv = document.createElement("div");
        containerDiv.setAttribute("class","container");

        let themeButton = document.createElement("button");
        themeButton.setAttribute("class","theme-btn");
        themeButton.setAttribute("id","theme-btn");
        let icon = document.createElement("i");

        let localStorageTheme = localStorage.getItem('theme');
        if(localStorageTheme === 'dark'){
            icon.setAttribute("class","far fa-sun");
            icon.setAttribute("id","light-icon");
        } else {
            icon.setAttribute("class","far fa-moon");
            icon.setAttribute("id","dark-icon");
        }
            
        themeButton.appendChild(icon);
        containerDiv.appendChild(themeButton);
        containerDiv.appendChild(createNav());
        containerDiv.appendChild(createAddArticleContainer());

        let main = document.createElement("main");
        main.setAttribute("class","main");
        for(let i=0; i< articles.length;i++){
            main.appendChild(createArticleHome(articles[i]));
        }
        containerDiv.appendChild(main);
        containerDiv.appendChild(createFooterHome());
        containerDiv.appendChild(createModal());
        body.appendChild(containerDiv);
    } else {
        body.innerHTML = "404 Not Found"
    }
    
    
}

// create the navigation menu
function createNav(){
    let navLinks = ["Travel updates", "Reviews", "About", "Contact"];
    let nav = document.createElement("nav");
    nav.setAttribute("class","nav");
    let navUl = document.createElement("ul");
    navUl.setAttribute("class","nav__container");
    for(let i=0; i<navLinks.length; i++){
        let navLi = document.createElement("li");
        navLi.setAttribute("class","nav__item");
        let navAnchor = document.createElement("a");
        navAnchor.setAttribute("class","nav__link");
        navAnchor.setAttribute("href","/client/#home");
        navAnchor.textContent = navLinks[i];
        navLi.appendChild(navAnchor);
        navUl.appendChild(navLi);
    }

    nav.appendChild(navUl);
    return nav;
}

// create the container with the 'Add article' button
function createAddArticleContainer() {
    let addArticleDiv = document.createElement("div");
    addArticleDiv.setAttribute("class","add__container");
    let addArticleBtn = document.createElement("button");
    addArticleBtn.setAttribute("type","button");
    addArticleBtn.setAttribute("class","button");
    addArticleBtn.setAttribute("id","add-article");
    addArticleBtn.textContent = " + Add Article";

    addArticleDiv.appendChild(addArticleBtn);
    return addArticleDiv;
}

// create the articles container for the home page
function createArticleHome(article) {
    let domArticle = document.createElement("article");

    let title = document.createElement("h2");
    title.setAttribute("class","title");
    title.textContent = article.title;

    let ul = document.createElement("ul");
    ul.setAttribute("class","info__container");
    for(let i in article.info){
        let li = document.createElement("li");
        li.setAttribute("class","info__item");
        if(i === "author") {
            let span = document.createElement("span");
            span.setAttribute("class","info__mark");
            span.textContent = article.info[i];
            li.appendChild(span);
        } else {
            li.textContent = article.info[i];
        }
        ul.appendChild(li);
    }

    let actionsDiv = document.createElement("div");
    actionsDiv.setAttribute("class","actions__container");
    actionsDiv.setAttribute("id",article.id);
    let editBtn = document.createElement("button");
    editBtn.setAttribute("type","button");
    editBtn.setAttribute("class","actions__btn btn-edit");
    editBtn.textContent = "Edit";
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type","button");
    deleteBtn.setAttribute("class","actions__btn btn-delete");
    deleteBtn.textContent = "Delete";

    actionsDiv.append(editBtn);
    actionsDiv.appendChild(deleteBtn);

    let img = document.createElement("img");
    img.setAttribute("src", article.imgUrl);
    img.setAttribute("alt", article.imgAlt);

    let contentDiv = document.createElement("div");
    contentDiv.setAttribute("class","content__container");
    let paragraph = document.createElement("p");
    paragraph.textContent = article.content[0];
    contentDiv.appendChild(paragraph);

    let readMoreDiv = document.createElement("div");
    readMoreDiv.setAttribute("class","readmore__container");
    let readMoreBtn = document.createElement("button");
    readMoreBtn.setAttribute("type","button");
    readMoreBtn.setAttribute("class","button");
    let readMoreLink = document.createElement("a");
    readMoreLink.setAttribute("href",`/client/#article?id=${article.id}`);
    readMoreBtn.textContent = "Read More";
    readMoreLink.appendChild(readMoreBtn);
    readMoreDiv.appendChild(readMoreLink);

    domArticle.appendChild(title);
    domArticle.appendChild(ul);
    domArticle.appendChild(actionsDiv);
    domArticle.appendChild(img);
    domArticle.appendChild(contentDiv);
    domArticle.appendChild(readMoreDiv);
    return domArticle;
}

// create the article container for the details page
function createArticleDetails(article) {
    let domArticle = document.createElement("article");

    let title = document.createElement("h2");
    title.setAttribute("class","title title--details");
    title.textContent = article.title;

    let ul = document.createElement("ul");
    ul.setAttribute("class","info__container info__container--details");
    for(let i in article.info){
        let li = document.createElement("li");
        li.setAttribute("class","info__item");
        if(i === "author") {
            let span = document.createElement("span");
            span.setAttribute("class","info__mark");
            span.textContent = article.info[i];
            li.appendChild(span);
        } else {
            li.textContent = article.info[i];
        }
        ul.appendChild(li);
    }

    let img = document.createElement("img");
    img.setAttribute("src", article.imgUrl);
    img.setAttribute("alt", article.imgAlt);

    let contentDiv = document.createElement("div");
    contentDiv.setAttribute("class","content__container");
    for(let j=0;j<article.content.length;j++){
        let paragraph = document.createElement("p");
        if(j === article.content.length / 2){
            let saying = document.createElement("p");
            saying.setAttribute("class","saying");
            saying.textContent = article.saying;
            contentDiv.appendChild(saying);
        }
        paragraph.textContent = article.content[j];
        contentDiv.appendChild(paragraph);
    }


    domArticle.appendChild(title);
    domArticle.appendChild(ul);
    domArticle.appendChild(img);
    domArticle.appendChild(contentDiv);
    return domArticle;
}

// create the footer for the home page
function createFooterHome() {
    let footer = document.createElement("footer");
    footer.setAttribute("class","footer");
    let prevBtn = document.createElement("button");
    prevBtn.setAttribute("class","footer__link");
    prevBtn.textContent = "previous";
    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("class","footer__link footer__link--next");
    nextBtn.textContent = "next";
    footer.appendChild(prevBtn);
    footer.appendChild(nextBtn);

    return footer;
}

// create the footer for the details page
function createFooterDetails() {
    const url = window.location.hash.substring(1);
    const id = Number(url.slice(11));

    let footer = document.createElement("footer");
    footer.setAttribute("class","footer");
    let articlesId = articles.map(article => article.id);
    let index = articlesId.indexOf(id);
    
    if(id > 1) {
        let prevBtn = document.createElement("button");
        prevBtn.setAttribute("class","footer__link");
        prevBtn.textContent = "previous article";
        let prevLink = document.createElement("a");
        prevLink.setAttribute("href",`/client/#article?id=${articlesId[index - 1]}`);
        prevLink.appendChild(prevBtn);
        footer.appendChild(prevLink);
    }
    if(index < articles.length - 1) {
        let prevDiv = document.createElement("div");
        let nextBtn = document.createElement("button");
        nextBtn.setAttribute("class","footer__link footer__link--next");
        nextBtn.textContent = "next article";
        let nextLink = document.createElement("a");
        nextLink.setAttribute("href",`/client/#article?id=${articlesId[index + 1]}`);
        nextLink.appendChild(nextBtn);
        footer.appendChild(prevDiv);
        footer.appendChild(nextLink);
    }
    

    return footer;
}

// create the modal
function createModal() {
    let inputs = [{input: "title", placeholder: "Please enter title"}, {input: "tag", placeholder: "Please enter tag"}, {input: "author", placeholder: "Please enter author"}, {input: "date", placeholder: "Please enter date"}, {input: "image", placeholder: "Please enter image url"}, {input: "saying", placeholder: "Please enter saying"}];
    let modalContainerDiv = document.createElement("div");
    modalContainerDiv.setAttribute("class","modal__overlay");
    let modalDiv = document.createElement("div");
    modalDiv.setAttribute("class","modal");
    let modalContent = document.createElement("div");
    modalContent.setAttribute("class","modal__content");
    let title = document.createElement("h2");
    title.setAttribute("class","title");
    title.textContent = "Add/Edit article";
    let inputsContainer = document.createElement("div");
    inputsContainer.setAttribute("class","inputs__container");
    for(let i=0;i<inputs.length;i++){
        let input = document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("class","input");
        input.setAttribute("id",inputs[i].input);
        input.setAttribute("placeholder",inputs[i].placeholder);
        inputsContainer.appendChild(input);
    }
    let textarea = document.createElement("textarea");
    textarea.setAttribute("class","textarea");
    textarea.setAttribute("id","article-content")
    textarea.setAttribute("name","content");
    textarea.setAttribute("cols","28");
    textarea.setAttribute("rows","7");
    textarea.setAttribute("placeholder","Please enter content");

    let modalButtonsDiv = document.createElement("div");
    modalButtonsDiv.setAttribute("class","modal__buttons");
    let cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("type","button");
    cancelBtn.setAttribute("class","button");
    cancelBtn.setAttribute("id","cancel");
    cancelBtn.textContent = "Cancel";

    let saveBtn = document.createElement("button");
    saveBtn.setAttribute("type","button");
    saveBtn.setAttribute("class","button button--pink");
    saveBtn.setAttribute("id","save");
    saveBtn.textContent = "Save";
    modalButtonsDiv.appendChild(cancelBtn);
    modalButtonsDiv.appendChild(saveBtn);

    modalContent.appendChild(title);
    modalContent.appendChild(inputsContainer);
    modalContent.appendChild(textarea);
    modalContent.appendChild(modalButtonsDiv);

    modalDiv.appendChild(modalContent);
    modalContainerDiv.appendChild(modalDiv);

    return modalContainerDiv;

}

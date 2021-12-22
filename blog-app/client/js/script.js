
let articlesPerPage = 3;
let indexStart = 0;
let indexEnd = articlesPerPage - 1;
let totalArticlesPerPage = 0;

function updateStartEndIndexes(button) {
    if (button === 'next') {
        indexStart = indexStart + articlesPerPage;
        indexEnd = indexEnd + articlesPerPage;
        console.log(indexStart, indexEnd);
    }

    if (button === 'previous') {
        indexStart = indexStart - articlesPerPage;
        indexEnd = indexEnd - articlesPerPage;
        console.log(indexStart, indexEnd);
    }
}

function updatePrevAndNextButtons() {
    let prevBtn = document.getElementById('prev-button');
    let nextBtn = document.getElementById('next-button');

    if (indexStart === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    if (indexEnd >= totalArticlesPerPage - 1) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
}

window.onload = function(e) {
    
    if(window.location.hash === ""){
        window.location.hash = "home";
    }
    cleanupAndLoad();
    window.scrollTo(0, 0);
    // set the theme
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
    displayHtml(uri);  
}

//FUNCTIONS
// display HTML based on the path (home or article)
function displayHtml(path) {

    // before anything, remove everything from the body element
    let body = document.getElementsByTagName("body")[0];
    if(body){
        body.querySelectorAll('*').forEach(n => n.remove());
    }
    
    getArticles(path,body);
    
}

// get articles from db.json
function getArticles(path,body){
    // in case the path contains article, we will display the Article page
    
    if(path.startsWith("article")) {
        const articleId = path.slice(11);
        //let article = articles.filter(item => item.id === Number(articleId));

        if(articleId){
            fetch(`http://localhost:3002/articles/${articleId}`)
            .then(
                function(response) {

                // Examine the text in the response
                response.json().then(function(data) {
                    if (response.status === 200) {
                        
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
                        main.appendChild(createArticleDetails(data));

                        containerDiv.appendChild(main);
                        containerDiv.appendChild(createFooterDetails(data.prevId, data.nextId));
                        
                        body.appendChild(containerDiv);

                        eventListenerTheme();
                    } else {
                        body.appendChild(createNotFoundPage());

                    }
                });
            }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
        } else {
            body.appendChild(createNotFoundPage());
        }

        
        

        

    // in case the path is home, we will display the Home page
    } else if (path.startsWith("home")) {
        const page = path.slice(5);
        
        
        fetch(`http://localhost:3002/articles?indexStart=${indexStart}&indexEnd=${indexEnd}`)
        .then(
            function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                // let length = 0;
                // if((data.length % articlesPerPage) > 0){
                //     length = Math.floor(data.length / articlesPerPage) + 1;
                // } else if ((data.length % articlesPerPage) === 0){
                //     length = Math.floor(data.length / articlesPerPage);
                // }
                // let pageArr = [];
                // for(let i=1; i<=length;i++){
                //     pageArr.push(i);
                // }
                // if(pageArr.includes(Number(page))){

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
                    
                    // let i = (Number(page) - 1) * articlesPerPage;
                    // let arrArticles = data.slice(i,articlesPerPage * Number(page));
                    for(let i=0; i< data.articles.length;i++){
                        main.appendChild(createArticleHome(data.articles[i]));
                    }

                    //
                    containerDiv.appendChild(main);
                    containerDiv.appendChild(createFooterHome());
                    containerDiv.appendChild(createModal());
                    body.appendChild(containerDiv);

                    totalArticlesPerPage = data.numberOfArticles;
                    updatePrevAndNextButtons();

                    // CONSTANTS
                    const addBtn = document.getElementById("add-article");
                    const cancelBtn = document.getElementById("cancel");
                    const saveBtn = document.getElementById("save");
                    const MODAL = document.querySelector(".modal__overlay");
                    const deleteButtons = document.querySelectorAll(".btn-delete");
                    const editButtons = document.querySelectorAll(".btn-edit");
                    // EVENT LISTENERS
                    addBtn.addEventListener('click', () => {
                        MODAL.style.display = "block";
                        removeError();
                        cancelBtn.addEventListener('click', () => {
                            MODAL.style.display = "none";
                            
                        });

                        saveBtn.addEventListener('click', () => {
                            addArticle();
                        });

                    });

                    
                    // the delete and edit buttons for each article
                    deleteButtons.forEach( item => {
                        item.addEventListener('click', () => {
                            id = item.parentElement.id;
                            deleteArticle(id);
                        });
                    });

                    editButtons.forEach( item => {
                        item.addEventListener('click', () => {
                            id = item.parentElement.id;
                            let article = data.articles.find(item => item.id == id);
                            editArticle(id,article);
                        });
                    });

                    eventListenerTheme();
                // } else {
                //     body.appendChild(createNotFoundPage());
                // }
                
                
            });
        }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
        
    } else {
        body.appendChild(createNotFoundPage());
    }
}

// store the form inputs values and make a call to the server to add the new article
function addArticle() {
    const titleInput = document.getElementById("title");
    const tagInput = document.getElementById("tag");
    const authorInput = document.getElementById("author");
    const imageInput = document.getElementById("image");
    const dateInput = document.getElementById("date");
    const sayingInput = document.getElementById("saying");
    const contentInput = document.getElementById("article-content");
    if(titleInput.value !== "" && tagInput.value !== "" && authorInput.value !== "" && imageInput.value !== "" && dateInput.value !== "" && sayingInput.value !== "" && contentInput.value !== ""){
        removeError();
        fetch("http://localhost:3002/articles", {
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
                "content":contentInput.value,
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
    } else {
        createError();
    }
}

// give the form inputs the values of the article to edit; make a call to the server to update the article
function editArticle(id,article) {
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
    // let article = articles.find(item => item.id == id);
    titleInput.value = article.title;
    tagInput.value = article.info.subtitle;
    authorInput.value = article.info.author;
    imageInput.value = article.imgUrl;
    dateInput.value = article.info.date;
    sayingInput.value = article.saying;
    contentInput.value = article.content
  
    MODAL.style.display = "block";
    
    removeError();

    CANCELBTN.addEventListener('click', () => {
        titleInput.value = "";
        tagInput.value = "";
        authorInput.value = "";
        imageInput.value = "";
        dateInput.value = "";
        sayingInput.value = "";
        contentInput.value = "";
        removeError();
        MODAL.style.display = "none";
        id = null;
    });

    SAVEBTN.addEventListener('click', () => {
        removeError();
        if(id && titleInput.value !== "" && tagInput.value !== "" && authorInput.value !== "" && imageInput.value !== "" && dateInput.value !== "" && sayingInput.value !== "" && contentInput.value !== ""){
            fetch(`http://localhost:3002/articles/${id}`, {
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
                        "content":contentInput.value,
                        "saying":sayingInput.value
                })
            })
            //   .then(json)
            .then(function (data) {
                console.log('Request succeeded with JSON response', data);
                cleanupAndLoad();
                id = null;
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
        } else {
            createError();
        }
    });
}

// make a call to delete an article based on the id
function deleteArticle(id) {
    // window.confirm("Are you sure you want to delete this article?");
    if (confirm("Are you sure you want to delete this article?")) {
        fetch(`http://localhost:3002/articles/${id}`, {
        method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => {
            cleanupAndLoad()
        });
    }
    
}

function eventListenerTheme() {
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
}

// removes everything in the body and call de loadContent function in order to display the updated articles
function cleanupAndLoad() {
    let body = document.getElementsByTagName("body")[0];
    if(body){
        body.querySelectorAll('*').forEach(n => n.remove());
    }
    onRouteChange();
}

function createError() {
    let exist = document.querySelectorAll('.error_message');
    if(exist.length === 0){
        let modalTitle = document.querySelector(".modal__content .title");
        let error = document.createElement('div');
        error.setAttribute('class','error_message');
        error.textContent = "Please complete all fields";
        modalTitle.after(error);
    }
    
}

function removeError() {
    let error = document.querySelectorAll(".error_message");
    if(error){
        error.forEach(n => n.remove());
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
    paragraph.textContent = article.content.substring(0,article.content.length/2) + " ...";
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

    let secondParagraph = article.content.substring(Math.floor(article.content.length/2) + 1);
    let periodIndex = secondParagraph.indexOf('.');
    let firstParagraph = article.content.substring(0,Math.floor(article.content.length/2));
    firstParagraph = firstParagraph.concat(secondParagraph.slice(0,periodIndex+1));
    secondParagraph = secondParagraph.slice(periodIndex+1);

    for(let j=0;j<2;j++){
        let paragraph = document.createElement("p");
        if(j === 0){
            paragraph.textContent = firstParagraph;
        } else {
            let saying = document.createElement("p");
            saying.setAttribute("class","saying");
            saying.textContent = article.saying;
            contentDiv.appendChild(saying);
            paragraph.textContent = secondParagraph;
        }   
        
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
        prevBtn.setAttribute('id','prev-button');
        prevBtn.textContent = "previous";
        footer.appendChild(prevBtn);

        prevBtn.addEventListener('click', function() {
            updateStartEndIndexes('previous');
            onRouteChange();
        });
    
        let nextBtn = document.createElement("button");
        nextBtn.setAttribute("class","footer__link footer__link--next");
        nextBtn.setAttribute("id","next-button");
        nextBtn.textContent = "next";
        let prevDiv = document.createElement("div");

        nextBtn.addEventListener('click', () => {
            updateStartEndIndexes('next');
            onRouteChange();
        });
        footer.appendChild(prevDiv);
        footer.appendChild(nextBtn);

    return footer;
}

// create the footer for the details page
function createFooterDetails(prevId, nextId) {
    let footer = document.createElement("footer");
    footer.setAttribute("class","footer");
    
    if(prevId) {
        let prevBtn = document.createElement("button");
        prevBtn.setAttribute("class","footer__link");
        prevBtn.textContent = "previous article";
        let prevLink = document.createElement("a");
        prevLink.setAttribute("href",`/client/#article?id=${prevId}`);
        prevLink.appendChild(prevBtn);
        footer.appendChild(prevLink);
    }
    if(nextId) {
        let prevDiv = document.createElement("div");
        let nextBtn = document.createElement("button");
        nextBtn.setAttribute("class","footer__link footer__link--next");
        nextBtn.textContent = "next article";
        let nextLink = document.createElement("a");
        nextLink.setAttribute("href",`/client/#article?id=${nextId}`);
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

function createNotFoundPage() {
    let notFoundDiv = document.createElement('div');
    notFoundDiv.setAttribute("class","not-found-container");
    let title = document.createElement("h3");
    title.setAttribute('class','title');
    title.textContent = "404";
    let subtitle = document.createElement('h4');
    subtitle.setAttribute('class','subtitle');
    subtitle.textContent = "Page Not Found";
    let backBtn = document.createElement('button');
    backBtn.setAttribute("class","back-button");
    let homeLink = document.createElement('a');
    homeLink.setAttribute('href',"/client/#home");
    backBtn.textContent = "Go Back Home";
    homeLink.appendChild(backBtn);
    notFoundDiv.appendChild(title);
    notFoundDiv.appendChild(subtitle);
    notFoundDiv.appendChild(homeLink);

    return notFoundDiv;
}
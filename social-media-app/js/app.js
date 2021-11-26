const LIST = document.getElementById("friends");
const PAGINATION = document.getElementById("pagination");
let perPage = 6;
let pageNo = 1;
let url = "https://reqres.in/api/users";
let clickedPageNo = 1;

startApp();

function startApp() {
  callUserEndpointAndLoadData(insertPaginationControl);
}

function callUserEndpointAndLoadData(callback) {
  fetch(url + "?per_page=" + perPage + "&page=" + pageNo)
    .then((resp) => {
      return resp.json();
    })
    .then((friends) => {
      let html = "";
      friends.data.forEach((friend) => {
        html += `
                <div>
                <img class="avatar" src="${friend.avatar}" alt="Picture of ${friend.first_name} ${friend.last_name}"> 
                <p class="name">${friend.first_name} ${friend.last_name}</p>
                <p class="email">${friend.email}</p>
                </div>
                `;
        LIST.innerHTML = html;
      });
      callback(friends);
    });
}

function insertPaginationControl(response) {
  let pages = "";
  for (let i = 0; i < response.total_pages; i++) {
    pages += `
            <p class="page" id="page_${i + 1}">${i + 1}</p>
        `;
  }
  PAGINATION.innerHTML = pages;
  document.getElementById("page_1").classList = "page page-clicked";
  paginationEvent();
}

function paginationEvent() {
  document.querySelectorAll(".page").forEach((pageNumber) => {
    pageNumber.addEventListener("click", function () {
      pageNo = pageNumber.innerHTML;
      clickedPageNo = pageNumber;
      callUserEndpointAndLoadData(removeClickedPagination);
    });
  });
}

function removeClickedPagination() {
  document.querySelectorAll(".page").forEach((page) => {
    if (page.classList.contains("page-clicked")) {
      console.log(page);
      page.classList.remove("page-clicked");
    }
  });
  clickedPageNo.classList = "page page-clicked";
  window.scrollTo(0, 0);
}


// OLD CODE

// const list = document.getElementById("friends");
// const pagination = document.getElementById("pagination");
// let perPage = 6;
// let pageNo = 1;
// let url = "https://reqres.in/api/users?per_page=" + perPage + "&page=" + pageNo;


// fetch(url)
// .then(resp => {
//   return resp.json();
// })
// .then((friends) => {
//   let html = "";
//   friends.data.forEach((friend) => {
//     html += `
//             <div>
//             <img class="avatar" src="${friend.avatar}" alt="Picture of ${friend.first_name} ${friend.last_name}"> 
//             <p class="name">${friend.first_name} ${friend.last_name}</p>
//             <p class="email">${friend.email}</p>
//             </div>
//             `;
//     list.innerHTML = html;
//   });
  
//   let pages = "";
//   for (let i = 0; i < friends.total_pages; i++) {
//     pages += `
//             <p class="page" id="page_${i + 1}">${i + 1}</p>
//         `;
//   }

//   pagination.innerHTML = pages;
//   document.getElementById("page_1").classList = "page page-clicked";

//   document.querySelectorAll(".page").forEach(item => {
//     item.addEventListener('click', function() {
//       pageNo = item.innerHTML;
//       url = "https://reqres.in/api/users?per_page=" + perPage + "&page=" + pageNo;
//       fetch(url)
//       .then(resp => {
//         return resp.json();
//       })
//       .then((friends) => {
//         let html = "";
//         friends.data.forEach((friend) => {
//           html += `
//                   <div>
//                   <img class="avatar" src="${friend.avatar}" alt="Picture of ${friend.first_name} ${friend.last_name}"> 
//                   <p class="name">${friend.first_name} ${friend.last_name}</p>
//                   <p class="email">${friend.email}</p>
//                   </div>
//                   `;
//           list.innerHTML = html;
//         });

//         elements = document.querySelectorAll(".page");
//         for(let i=0; i<friends.total_pages; i++){
//           elements[i].classList.remove("page-clicked");

//         }
//         item.classList = "page page-clicked";
//       });

//       window.scrollTo(0,0);
//     });
//   });
// });

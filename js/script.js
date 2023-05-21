const inpSearch = document.getElementById("inpSearch");
const btnSearch = document.getElementById("btn");
const myRow = document.getElementById("myMenu");
const links = [...document.getElementsByClassName("cate")];
const btnLightDark = document.querySelector(".btn-dark");
const secShowDetails = document.querySelector("#showDetails");
const btnLoadMore = document.getElementById("loadMore");
const carouselCaption = document.querySelector(".carousel-caption");

let countMeal = 10;


// using Typed.js in carousel caption
// var typed2 = new Typed('#typed2', {
//     // strings: ['<strong>fresh</strong>', '<strong>fast</strong>', '<strong>delicious</strong>'],
//     strings: ['<strong>come hungry  </strong>', '<strong>leave happy</strong>'],
//     typeSpeed: 100,
//     backSpeed: 100,
//     cursorChar: '',
//     shuffle: true,
//     loop: true
// });

// each click add 5 meals to menu's section
btnLoadMore.onclick = ()=> {
    countMeal += 5;
    displayRecipes();
    if (countMeal >= allRecipes.length) {btnLoadMore.style.display = "none"}
    else {btnLoadMore.style.display = "inline-block"}
    console.log(countMeal);
    console.log(allRecipes.length);
}

// to get categories of meals to show in menu
links.forEach((link)=> {
    link.addEventListener('click', ()=> {
        let val = (link.lastElementChild.innerHTML).toLowerCase();
        showRecipes(val);
        countMeal = 10;
        btnLoadMore.style.display = "inline-block";
    })
})


let allRecipes;

// set and add data in allRecipes variable
if (localStorage.getItem("foods") == null) allRecipes = [];
else {
    allRecipes = JSON.parse(localStorage.getItem("foods"));
    displayRecipes(allRecipes);
}


async function getRecipes(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${term}`);
        apiResponse = await apiResponse.json();
        allRecipes = apiResponse.recipes;
        localStorage.setItem("foods", JSON.stringify(allRecipes));
}

async function displayRecipes() {
    let product = ``,
        i;
        // <p>by<b> ${allRecipes [i].publisher}</b></p>
    for (i = 0; i < (allRecipes.slice(0, countMeal)).length; i++) {
        let myId = "'" + allRecipes[i].recipe_id + "'";
        product += `<div class="col-sm-3 col-md-3 col-lg-2 text-center position-relative meal">
                        <img src="${allRecipes[i].image_url}" class="w-100 rounded" style="height: 200px" alt="">
                        <div class="details"  onclick="getRid(${myId})">
                        <h4 class="h6">${allRecipes[i].title}</h4>
                        </div>
                    </div>`
    }
    myRow.innerHTML = product;
}

async function showRecipes(item) {
    await getRecipes(item);
    localStorage.setItem("foods", JSON.stringify(allRecipes));
    displayRecipes(allRecipes);
    
}

// getRid => get Recipe Id && rid => Recipe Id
async function getRid(rid) {
    let apiRecipId = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${rid}`);
        apiRecipId = await apiRecipId.json();
    let myItem = apiRecipId.recipe;
    showDetails(myItem);
}

function showDetails(item) {
    let listDetails = [];
    let cartoon = `
            <img src="${item.image_url}" alt="" class='col-sm-12 col-md-6 position-sticky top-0'>
            <div class="info py-5 col-sm-12 col-md-6">
                <h2>${item.title}</h2>
                <ul class="p-0">
        `;
    
    secShowDetails.classList.toggle("openSectoin");
    

    listDetails = item.ingredients;
    for (let i = 0; i < listDetails.length; i++) {
        cartoon += `<li>* ${listDetails[i]}</li>`
        // console.log(`${i}:: ${listDetails[i]}`);
    }

    cartoon += `
                </ul>
            </div>
    `;
    secShowDetails.lastElementChild.innerHTML = cartoon;
}

// Close section of Show Details
const iconClose = document.getElementById("icon_close");
iconClose.addEventListener("click", ()=> {
    secShowDetails.classList.toggle("openSectoin");
    console.log("close")
});


btnSearch.addEventListener("click", ()=> {
    showRecipes(inpSearch.value);
    inpSearch.value = '';
})
document.body.addEventListener("load", ()=> {
    showRecipes(inpSearch.value);
    inpSearch.value = '';
})


const cateLinks = document.querySelectorAll(".menu .categories2 .cate p")

cateLinks.forEach(cateLink => {
    cateLink.addEventListener("click", ()=> {
        cateLinks.forEach(cateLink => {
            cateLink.classList.remove("active")
        })
        cateLink.classList.add("active");
    })
})

const stars = document.querySelector(".stars");
const moon = document.querySelector(".moon2");
const boat = document.querySelector(".boat6");
const mountains3 = document.querySelector(".mountains3");
const mountains4 = document.querySelector(".mountains4");
const river5 = document.querySelector(".river5");
const mountains7 = document.querySelector(".mountains7");
const header = document.querySelector("header");
const h2 = document.querySelector("h2");
const rawda = document.querySelector("#header .contain_img");

window.addEventListener("scroll", function () {
    const scoTop = scrollY;
    stars.style.top = `${scoTop}px`;
    stars.style.left = `${scoTop}px`;
    moon.style.top = `${scoTop * 3}px`;
    rawda.style.bottom = `${scoTop * .9}px`;
    mountains3.style.top = `${scoTop * 1.2}px`;
    mountains4.style.top = `${scoTop * 1.2}px`;
    river5.style.top = `${scoTop}px`;
    boat.style.top = `${scoTop}px`;
    boat.style.left = `${scoTop * 3}px`;
    
         
        if (scoTop > 124) {
            header.style.background = `linear-gradient(#376281, #10001f)`;
        } else {
            header.style.background = "#130c1f";
        }
  
   

    
    

    // mountains7.style.top = `${scoTop * 2}px`;
    // console.log(scoTop);
});
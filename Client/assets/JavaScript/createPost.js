class Article {
    constructor(length, article, tag, title, gif){
        this.title = title;
        this.id = length + 1;
        this.tag = tag;
        this.article = article;
        this.date = new Date();
        this.comments = [];
        this.emoji1 = 0;
        this.emoji2 = 0;
        this.emoji3 = 0;
        this.gif = gif;
    }
}
const API_KEY = "MjgWi5LAv7OcAlh9hzV3qtIF8G9eb4o3";

window.onload = function() {
    getRadioButton();
    addCarouselItems();
};
let targetParagraph = document.getElementById("test");
let titleInput = document.getElementById("postTitle");
let formButton = document.getElementById('formSubmit');
formButton.addEventListener('click', getDataLength);
let textArea = document.getElementById('articleToSubmit');
textArea.addEventListener('keyup', countFunc);
let musicRadioButton = document.getElementById('music');
let sportRadioButton = document.getElementById('sport');
let lifestyleRadioButton = document.getElementById('lifestyle');
let filmRadioButton = document.getElementById('film');
let newsRadioButton = document.getElementById('news');
let otherRadioButton = document.getElementById('other');
let giphyButton = document.getElementById('giphSearch');
giphyButton.addEventListener('click', searchGif)
textArea.addEventListener('change', () => {
    if (textArea.value){
        if (musicRadioButton.checked || sportRadioButton.checked || otherRadioButton.checked || newsRadioButton.checked || filmRadioButton.checked || lifestyleRadioButton.checked){
            formButton.disabled = false;
        } 
    } else {
        formButton.disabled = true;
    }

})
musicRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
sportRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
otherRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
lifestyleRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
filmRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
newsRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})

function getRadioButton(){
    let id = localStorage.getItem("tag");
    console.log(id);
    if (id){
        let buttonToCheck = document.getElementById(id.toLowerCase());
        buttonToCheck.checked = true;
        localStorage.setItem("tag", "");
    }
}


async function getDataLength(e){
    e.preventDefault();
    let data = await fetch("http://localhost:3000/data");
    let dataJson = await data.json();
    addNewArticle(dataJson.length);
    
}

function addNewArticle(length){
    let textField = document.getElementById("articleToSubmit");
    let list = document.querySelectorAll('input[name="tag"]');
    let checkedButton;
    let titleToUse = "";
    console.log(list);
    for (const x of list){
        if (x.checked === true){
            checkedButton = x.value;
        }
    }
    console.log(checkedButton);
    if (titleInput){
        titleToUse = titleInput.value;
    } else {
        titleToUse = `Article ${length + 1}`;
    }
    let selectedGif = document.querySelector('button[class="selected"] img');
    let source = "";
    if (selectedGif){
        source = selectedGif.getAttribute("src");
    }
    

    let dataToSend = new Article(length, textField.value, checkedButton, titleToUse, source);
    console.log(dataToSend);
    postJsonData(dataToSend);
}

async function postJsonData(jsonObject) {
    const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    const actualResponse = await response.json();
}

async function searchGif(e){
    e.preventDefault();
    let searchQuery = document.getElementById('giphyFinder').value;
    let giphyAPIURL = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&rating=g&api_key=${API_KEY}&limit=15`;
    let fetchedData = await fetch(giphyAPIURL);
    let dataJson = await fetchedData.json();
    console.log(dataJson);
    console.log(dataJson.data[0].images.fixed_height.url);
    appendGifs(dataJson);
}

function appendGifs(json){
    let sectionToAppend = document.getElementById('gifSection');
    sectionToAppend.style.display = "block";
    document.getElementById('gifSection').innerHTML = "";
    for (let i=0; i<json.data.length; i++){
        let imgPath = json.data[i].images.fixed_height.url;
        let img = document.createElement('img');
        let imgButton = document.createElement('button'); 
        imgButton.id = `imgBtn${i+1}`;
        let id = imgButton.id;   
        imgButton.classList.add("removeBorder");
        imgButton.addEventListener('click', (e)=>{
            e.preventDefault();
            changeBorder(id, json);
        });
        img.setAttribute("src", imgPath);
        imgButton.append(img);
        sectionToAppend.append(imgButton);
    };
    
}

function changeBorder(id, json){
    for (let i=0; i<json.data.length; i++){
        let resetButton = document.getElementById(`imgBtn${i+1}`);
        resetButton.classList.remove("selected");
        resetButton.classList.add("removeBorder");
    }
    let selected = document.getElementById(id);
    selected.classList.remove("removeBorder");
    selected.classList.add("selected");
}

function countFunc(){
    let characterCounter = document.getElementById('counterDisplay');
    let characterNumber = textArea.value.length;
    characterCounter.textContent = `Character Count: ${characterNumber} (limit 700)`;
}

async function addCarouselItems(){
    let randomData = await fetch('http://localhost:3000/random')
    let dataJson = await randomData.json();
    buildArticles(dataJson);
}

function buildArticles(data){
    for (let i=0; i<data.length; i++){
        let sectionToAppend = document.getElementById(`carousel${i+1}`);
        let title = document.createElement('h2')
        title.textContent = data[i].title;
        sectionToAppend.append(title);
        let timeStamp = document.createElement('h4');
        let timeStampYear = data[i].date.slice(0,10);
        let timeStampTime = data[i].date.slice(11,16);
        timeStamp.textContent = `${timeStampYear}, ${timeStampTime}`
        sectionToAppend.append(timeStamp);
        let para = document.createElement('p');
        para.textContent = data[i].article;
        sectionToAppend.append(para);
        if (data[i].gif){
            let newGIF = document.createElement('img');
            newGIF.src = data[i].gif;
            newGIF.style.display = "block";
            newGIF.style.marginBottom = "8px";
            sectionToAppend.append(newGIF); 
        }
    }
}
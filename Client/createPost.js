class Article {
    constructor(length, article, tag, title){
        this.title = title;
        this.id = length + 1;
        this.tag = tag;
        this.article = article;
        this.date = new Date();
        this.comments = [];
        this.emoji1 = 0;
        this.emoji2 = 0;
        this.emoji3 = 0;
    }
}

let targetParagraph = document.getElementById("test");
let titleInput = document.getElementById("postTitle");
let formButton = document.getElementById('formSubmit');
formButton.addEventListener('click', getDataLength);
let textArea = document.getElementById('articleToSubmit');
let musicRadioButton = document.getElementById('music');
let sportRadioButton = document.getElementById('sport');
let lifestyleRadioButton = document.getElementById('lifestyle');
let filmRadioButton = document.getElementById('film');
let newsRadioButton = document.getElementById('news');
let otherRadioButton = document.getElementById('other');
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
    let dataToSend = new Article(length, textField.value, checkedButton, titleToUse);
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
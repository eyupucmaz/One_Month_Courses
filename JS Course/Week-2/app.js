/* 1. Grab the input */
var focus = "";
var apiKey = "N9xeouS1ZDYa2XKIW3QAav62V9mahDqJ";

document.querySelector(".js-go").addEventListener("click", function () {
    clearDOM();
    var input = document.querySelector("input");
    focus = input;
    getrequest(focus, apiKey);
});

document.querySelector(".js-userinput").addEventListener("keyup", function (e) {
    var input = document.querySelector("input").value;

    if (e.which === 13) {
        clearDOM();
        focus = input;
        getrequest(focus, apiKey);
    }
});

/* 2. do the data stuff with API */
//API KEY & URL

function getrequest(q, api_key) {
    var url = `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}`;
    var giphyAjaxCall = new XMLHttpRequest();
    giphyAjaxCall.open("GET", url);
    giphyAjaxCall.send();
    giphyAjaxCall.addEventListener("load", function (e) {
        var data = e.target.response;
        pushToDOM(data);
    });
}
function clearDOM() {
    var imgDOM = document.querySelectorAll("img");
    imgDOM.forEach((img) => {
        img.remove();
    });
}
//AJAX Request

/* 3. Show me th GIF's */
function pushToDOM(input) {
    var response = JSON.parse(input);
    var imgURL = response.data;
    imgURL.forEach(function (image) {
        var src = image.images.fixed_height.url;
        var container = document.querySelector(".js-container");
        container.innerHTML += `<img class=\"container-image\" src=\"${src}\" </img>`;
    });
}

/* 1. Search */
var UI = {};

UI.pressEnter = function () {
  document.querySelector(".js-search").addEventListener("keyup", function (e) {
    if (e.which === 13) {
      var input = e.target.value;
      //console.log(input);
      soundCloudAPI.getTrack(input);
      document.querySelector(".js-search").value = "";
    }
  });
};

UI.click = function () {
  document.querySelector(".js-submit").addEventListener("click", function (e) {
    var input = document.querySelector(".js-search").value;
    //console.log(input);
    soundCloudAPI.getTrack(input);
    document.querySelector(".js-search").value = "";
  });
};

UI.reset = function () {
  document.querySelector(".js-reset").addEventListener("click", function () {
    localStorage.clear();
    console.log("reset done");
    location.reload();
  });
};

/* 2. Query Soundcloud API */

var soundCloudAPI = {};

soundCloudAPI.init = function () {
  SC.initialize({
    client_id: "cd9be64eeb32d1741c17cb39e41d254d",
  });
};

soundCloudAPI.getTrack = function (inputValue) {
  SC.get("/tracks", {
    q: inputValue,
  }).then(function (tracks) {
    console.log(tracks);
    soundCloudAPI.renderTracks(tracks);
  });
};

/* 3. Display the Cards */

soundCloudAPI.renderTracks = function (tracks) {
  tracks.forEach(function (track) {
    //CARD
    var card = document.createElement("div");
    card.classList.add("card");
    var jsSearchResults = document.querySelector(".js-search-results");
    jsSearchResults.appendChild(card);

    //IMAGE
    var image = document.createElement("div");
    image.classList.add("image");
    card.appendChild(image);
    var image_img = document.createElement("img");
    image_img.classList.add("image_img");
    image_img.src =
      track.artwork_url || "http://www.lorempixel.com/100/100/abstract/";
    image.appendChild(image_img);

    //CONTENT

    var content = document.createElement("div");
    content.classList.add("content");
    card.appendChild(content);
    var header = document.createElement("div");
    header.classList.add("header");
    content.appendChild(header);
    var link = document.createElement("a");
    link.href = track.permalink_url;
    link.target = "_blank";
    link.innerHTML = track.title;
    header.appendChild(link);

    //BUTTON
    var button = document.createElement("div");
    button.classList.add("button", "js-button", "ui", "attached");
    card.appendChild(button);
    var icon = document.createElement("i");
    icon.classList.add("add", "icon");
    button.appendChild(icon);
    var buttonText = document.createElement("span");
    buttonText.innerHTML = "Add to Playlist";
    button.appendChild(buttonText);

    button.addEventListener("click", function () {
      soundCloudAPI.getEmbed(track.permalink_url);
    });
  });
};

/* 4. Add the playlist and play */
soundCloudAPI.getEmbed = function (trackURL) {
  SC.oEmbed(trackURL, {
    auto_play: true,
  }).then(function (embed) {
    console.log("oEmbed response: ", embed);
    var sideBar = document.querySelector(".js-playlist");

    var box = document.createElement("div");
    box.innerHTML = embed.html;
    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key", sideBar.innerHTML);
    //alert(sideBar.innerHTML);
  });
};
var sideBar = document.querySelector(".col-left");
sideBar.innerHTML = localStorage.getItem("key");

soundCloudAPI.init();

UI.reset();
UI.pressEnter();
UI.click();

/* 1. Search */

/* 2. Query Soundcloud API */

SC.initialize({
    client_id: "cd9be64eeb32d1741c17cb39e41d254d",
});

SC.get("/tracks", {
    q: "chill"
}).then(function (tracks) {
    console.log(tracks);
});

/* 3. Display the Cards */

/* 4. Add the playlist and play */

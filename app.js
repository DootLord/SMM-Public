const { Console } = require('console');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const topicSubjects = ["dog", "cat", "moose", "sports", "hamsters", "my learning cloud"]
const charLimit = 20;
let posts = [];
let users = []; // keep users low, as we're re-rendering the posts every time! D:
let topic = "";

topic = topicSubjects[Math.floor(Math.random() * topicSubjects.length)];

// Every minute there's a new round.
setInterval(() => {
    let currentWinner = { "name": "N/A", "score": 0 };
    for (let key in users) {
        if (users[key].score > currentWinner.score) {
            currentWinner = users[key];
        }
        users[key].score = 0;
    }

    io.emit("winner", currentWinner);

    topic = topicSubjects[Math.floor(Math.random() * topicSubjects.length)];

    io.emit("topic", topic);

}, 1000 * 60)

io.on("connection", socket => {
    socket.on("join", () => {
        let username = "steve";
        users[socket.id] = { "name": username, "score": 0 };
        socket.emit("gamestate", { "posts": posts, "topic": topic, "name": username});

        console.log(users);
        console.log(topic);
    });

    console.log(`Socket ${socket.id} has connected`);

    socket.on("newPost", post => {
        console.log("New Post: " + JSON.stringify(post));
        if (post.text.length > charLimit) {
            socket.emit("badPost");
            console.log("Text too long!");
        }

        let lowerCasePost = post.text.toLowerCase();
        if (!lowerCasePost.includes(topic)) {
            socket.emit("badPost");
            console.log("Non topic string!");
        }

        for (let i = 0; posts.length > i; i++) {
            if (posts[i].text === post.text) {
                // Duplicate Text!
                socket.emit("badPost");
                users[socket.id].score--;
                socket.emit("score", users[socket.id].score);
                console.log("Duplicate text!")
            }
        }

        // Successful Post
        users[socket.id].score++;
        posts.push(post);

        socket.emit("score", users[socket.id].score);
        io.emit("posts", posts);

    });
});

http.listen(4444, () => {
    console.log("Listening on port 4444");
});
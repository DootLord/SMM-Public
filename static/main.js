
/**
 * Create a populated post item
 * @param {string} avatarSrc url of avatar
 * @param {string} username Poster's Username
 * @param {string} content Content of the post 
 * @param {boolean} validPost Did this post award points or not? 
 * @returns 
 */
function buildPost(avatarSrc = "test.gif", username = "testuser", content = "This is a test post", validPost = true){
    // Parent post
    let post = document.createElement("li");
    post.classList.add("collection-item", "avatar");

    // Create avatar
    let img = document.createElement("img");
    img.classList.add("circle");
    img.setAttribute("src", "img/" + avatarSrc);

    // Post's Owner
    let span = document.createElement("span");
    span.classList.add("title");
    span.innerText = username;

    // Post's Content
    let p = document.createElement("p");
    p.innerText = content;

    // Make symbol if valid or not
    let a = document.createElement("a");
    let i = document.createElement("i");
    a.setAttribute("href", "#!");
    a.classList.add("secondary-content");

    i.classList.add("material-icons");
    if(validPost) {
        i.innerText = "thumb_up";
    } else {
        i.innerText = "thumb_down";
    }
    i.innerText = "grade";

    a.appendChild(i);

    post.appendChild(img);
    post.appendChild(span);
    post.appendChild(p);
    post.appendChild(a);

    return post;
}
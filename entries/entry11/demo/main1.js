// If you use a <button> tag you can query the button directly.
//Otherwise, you can use a CSS class on the element you click, and querySelector that class.

// let button = document.querySelector(".button");
// let wrapper = document.querySelector(".wrapper");
// button.addEventListener("click", function (event) {
//   console.log(event, event.target);
//   let newItem = document.createElement("div");
//   newItem.classList.add("new-content");
//   newItem.innerHTML = "But wait, theres more ";
//   wrapper.appendChild(newItem);
// });


// let blobs = document.querySelectorAll(".blob");
// let container = document.querySelector(".wrapper");
// // place our blobs randomly
// blobs.forEach(function (blob) {
//   blob.style.right = (100 * Math.random()) + '%';
//   blob.style.top = (100 * Math.random()) + '%';
// });
// container.addEventListener("click", function (event) {
//   if (event.target.classList.contains("blob")) {
//     event.target.remove();
//   }
// });


let button = document.querySelector(".button");
let colors = ["#255c34", "#726756", "#703a56", "#953e00"];
let body = document.querySelector("body");

function newColor() {
  let randIndex = Math.floor(Math.random() * colors.length);
  let randColor = colors[randIndex];
  body.style.backgroundColor = randColor;
}

button.addEventListener("click", newColor);
let body = document.body;
let headline = document.querySelector("h1");
let headlines = document.querySelectorAll("h1");

console.log(headline);
console.log(headlines);

headlines.forEach(function (headline) {
  // add an event listener to each individual headline
  headline.addEventListener("click", function (event) {
    // toggle the red class on this headline
    headline.classList.toggle("red");
  });
});

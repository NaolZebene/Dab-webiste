// const dashboard = document.querySelector("#dashboard");
const blog = document.querySelector("#blog");
const events = document.querySelector("#events");
const portfolio = document.querySelector("#portfolio");
const testimonial = document.querySelector("#testimonial");
const team = document.querySelector("#team");
const user = document.querySelector("#user");
const setting = document.querySelector("#setting");
const sidebartogglebtn = document.querySelector("#sidebarToggle");

// events

blog.firstElementChild.addEventListener("click", () => {
  selectnav(blog);
});
events.firstElementChild.addEventListener("click", () => {
  selectnav(events);
});
portfolio.firstElementChild.addEventListener("click", () => {
  selectnav(portfolio);
});
testimonial.firstElementChild.addEventListener("click", () => {
  selectnav(testimonial);
});
team.firstElementChild.addEventListener("click", () => {
  selectnav(team);
});
user.firstElementChild.addEventListener("click", () => {
  selectnav(user);
});
setting.firstElementChild.addEventListener("click", () => {
  selectnav(setting);
});
sidebartogglebtn.addEventListener("click", () => {
  hidenavchild();
});

//functions
//definations
function selectnav(nav) {
  if (nav.children[1].classList.contains("hide")) {
    hidenavchild();
    nav.children[1].classList.toggle("hide");
  } else nav.children[1].classList.toggle("hide");
}
function hidenavchild() {
  blog.children[1].classList.add("hide");
  portfolio.children[1].classList.add("hide");
  events.children[1].classList.add("hide");
  team.children[1].classList.add("hide");
  testimonial.children[1].classList.add("hide");
  user.children[1].classList.add("hide");
  setting.children[1].classList.add("hide");
}
function initialize() {
  hidenavchild();
}

//initialize
//set default condition for the page
initialize();

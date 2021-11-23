window.addEventListener('wheel', onScroll);
function onScroll(e) {
  // console.log(window.scrollY);
  if (window.scrollY > 700) $('.portfolio .menu').slideDown();
  else $('.portfolio .menu').slideUp();
}

document.querySelector('.navi1').addEventListener('click', moveHome);
document.querySelector('.navi2').addEventListener('click', moveAbout);
document.querySelector('.navi3').addEventListener('click', function () {
  window.scrollTo(0, 1300);
});
document.querySelector('.navi4').addEventListener('click', function () {
  window.scrollTo(0, 1500);
});
document.querySelector('.menu .fa-arrow-right').addEventListener('click', function (e) {
  $(this).addClass('hide');
  $(this).siblings().removeClass('hide');
  $('.sub-menu').slideUp();
});
document.querySelector('.menu .fa-arrow-down').addEventListener('click', function (e) {
  $(this).addClass('hide');
  $(this).siblings().removeClass('hide');
  $('.sub-menu').slideDown();
});
document.querySelector('.sub-menu1').addEventListener('click', function () {
  window.scrollTo(0, 1500);
});
document.querySelector('.sub-menu2').addEventListener('click', function () {
  window.scrollTo(0, 6600);
});
document.querySelector('.sub-menu3').addEventListener('click', function () {
  window.scrollTo(0, 9700);
});
document.querySelector('.sub-menu4').addEventListener('click', function () {
  window.scrollTo(0, 11700);
});
document.querySelector('.sub-menu5').addEventListener('click', function () {
  window.scrollTo(0, 13700);
});

function moveHome() {
  window.scrollTo(0, 0);
}
function moveAbout() {
  window.scrollTo(0, 900);
}

window.addEventListener('wheel', onScroll);
function onScroll(e) {
  // console.log(window.scrollY);
  if (window.scrollY > 700) $('.portfolio .menu').slideDown();
  else $('.portfolio .menu').slideUp();
}

document.querySelector('.navi1').addEventListener('click', moveHome);
document.querySelector('.navi2').addEventListener('click', moveAbout);
document.querySelector('.navi3').addEventListener('click', function () {
  window.scrollTo(0, 1750);
});
document.querySelector('.navi4').addEventListener('click', moveContact);
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
  $('.wrapper3 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  window.scrollTo(0, 2000);
});
document.querySelector('.sub-menu2').addEventListener('click', function () {
  $('.wrapper3 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  window.scrollTo(0, 3000);
});
document.querySelector('.sub-menu3').addEventListener('click', function () {
  $('.wrapper3 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  window.scrollTo(0, 3900);
});
document.querySelector('.sub-menu4').addEventListener('click', function () {
  $('.wrapper3 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  window.scrollTo(0, 4800);
});
document.querySelector('.sub-menu5').addEventListener('click', function () {
  $('.wrapper3 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  $('.wrapper7 .detail').slideUp();
  window.scrollTo(0, 6800);
});

function moveHome() {
  window.scrollTo(0, 0);
}
function moveAbout() {
  window.scrollTo(0, 900);
}
function moveContact() {
  window.scrollTo(0, 100000);
}

document.querySelector('.wrapper3 .btn-detail').addEventListener('click', function (e) {
  $('.wrapper3 .detail').slideDown('1000');
});
document.querySelector('.wrapper7 .btn-detail').addEventListener('click', function (e) {
  $('.wrapper7 .detail').slideDown('1000');
});
document.querySelector('.wrapper4 .btn-detail').addEventListener('click', function (e) {
  $('.wrapper4 .detail').slideDown('1000');
});

document.querySelector('.bt-wrap i').addEventListener('click', moveHome);

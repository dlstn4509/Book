window.addEventListener('wheel', onScroll);
function onScroll(e) {
  // console.log(window.scrollY);
  if (window.scrollY > document.querySelector('.wrapper2').offsetTop - 250)
    $('.portfolio .menu').slideDown();
  else $('.portfolio .menu').slideUp();
}

document.querySelector('.navi1').addEventListener('click', moveHome);
document.querySelector('.navi2').addEventListener('click', moveAbout);
document.querySelector('.navi3').addEventListener('click', function () {
  window.scrollTo(0, document.querySelector('.title-last').offsetTop - 100);
});
document.querySelector('.navi4').addEventListener('click', moveContact);
document.querySelector('.port').addEventListener('click', function () {
  $('.sub-menu').removeClass('hide');
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
  window.scrollTo(0, document.querySelector('.wrapper3').offsetTop);
});
document.querySelector('.sub-menu2').addEventListener('click', function () {
  window.scrollTo(0, document.querySelector('.wrapper7').offsetTop);
});
document.querySelector('.sub-menu3').addEventListener('click', function () {
  window.scrollTo(0, document.querySelector('.wrapper4').offsetTop);
});
document.querySelector('.sub-menu4').addEventListener('click', function () {
  window.scrollTo(0, document.querySelector('.wrapper5').offsetTop);
});
document.querySelector('.sub-menu5').addEventListener('click', function () {
  window.scrollTo(0, document.querySelector('.wrapper6').offsetTop);
});

function moveHome() {
  window.scrollTo(0, 0);
}
function moveAbout() {
  window.scrollTo(0, document.querySelector('.wrapper2').offsetTop - 100);
}
function moveContact() {
  window.scrollTo(0, 100000);
}

document.querySelector('.bt-wrap i').addEventListener('click', moveHome);

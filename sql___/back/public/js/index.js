window.addEventListener('wheel', onScroll);
function onScroll(e) {
  console.log(e.deltaY);
  console.log(window.scrollY);
}

document.querySelector('.navi1').addEventListener('click', function () {
  window.scrollTo(0, 0);
});
document.querySelector('.navi2').addEventListener('click', function () {
  window.scrollTo(0, 900);
});
document.querySelector('.navi3').addEventListener('click', function () {
  window.scrollTo(0, 1300);
});
document.querySelector('.navi4').addEventListener('click', function () {
  window.scrollTo(0, 1500);
});

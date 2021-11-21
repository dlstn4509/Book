window.addEventListener('wheel', onScroll);
function onScroll(e) {
  console.log(e.deltaY);
  console.log(window.innerHeight);
}

document.querySelector('.navi').addEventListener('click', function () {
  window.scrollTo(0, window.innerHeight);
});

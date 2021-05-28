const open = document.querySelector('.burger');
const btn = document.querySelector('.burger__inner');

open.addEventListener('click', function () {
	btn.classList.toggle('open');
});
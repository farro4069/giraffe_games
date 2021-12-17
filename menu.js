const giraffe = document.querySelector('.nav__logo');
const nav = document.querySelector('.nav__items');
const toggleLogo = document.getElementById('logo');

toggleLogo.addEventListener('click', showMenu);
toggleLogo.checked = false;


function showMenu() {
	if (toggleLogo.checked) {
		nav.classList.add('active')
	} else {
		nav.classList.remove('active')
	}
}

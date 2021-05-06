prompt("funciono")

// Function Nav-Burger Responsive
const burgerMenu = document.getElementById('navbar-burger')
const navbarBasicExample = document.getElementById('navbarBasicExample')

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('is-active')
    navbarBasicExample.classList.toggle('is-active')
})

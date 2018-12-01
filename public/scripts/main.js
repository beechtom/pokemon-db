function openNav() {
    let burger = document.querySelector('[data-target=navbar]');
    let navbar = document.querySelector('#navbar');

    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        navbar.classList.toggle('is-active');
    });
}

function modal() {
    let buttons = document.querySelectorAll('[data-toggle=modal]');

    buttons.forEach(function(btn) {
        let modal = document.getElementById(btn.getAttribute("aria-controls"));

        btn.addEventListener('click', function() {
            modal.classList.toggle('is-active');
        });
    });
}

function fireWhenReady(func) {
    document.addEventListener('DOMContentLoaded', func);
}

fireWhenReady(openNav);
fireWhenReady(modal);
// fireWhenReady(editForm);
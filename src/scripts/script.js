document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('welcome-form');
    const welcomeMessage = document.getElementById('welcome-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        welcomeMessage.textContent = `Bem-vindo, ${name}!`;
    });
});

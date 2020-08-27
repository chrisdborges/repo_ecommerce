var usersArray = [];

function validateUser(array, userIn, passwordIn) {
    for (let i = 0; i < array.length; i++) {
        let usuario = array[i];
        if (usuario.email == userIn && usuario.password == passwordIn) {
            return true;
        }
    }

    return false;
}

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("submitBtn").addEventListener("click", function (e) {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {

            localStorage.setItem('User-Logged', JSON.stringify({ email: inputEmail.value }));

            window.location = 'inicio.html';

        } else {
            alert("Debes ingresar los datos!");
        }
    })
})
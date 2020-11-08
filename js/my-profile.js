
function loadProfile() {
    if (localStorage.getItem('Profile') != null || localStorage.getItem('Profile') != undefined) {
        let profile = JSON.parse(localStorage.getItem('Profile'));
        $('#names').val(profile.name);
        $('#surnames').val(profile.surname);
        $('#date').val(profile.date);
        $('#email').val(profile.email);
        $('#phoneNumber').val(profile.phoneNumber);
    };
}


function saveChanges() {
    let profile = {};
    profile.name = $('#names').val();
    profile.surname = $('#surnames').val();
    profile.date = $('#date').val();
    profile.email = $('#email').val();
    profile.phoneNumber = $('#phoneNumber').val();

    localStorage.setItem('Profile', JSON.stringify(profile));
};

function showSuccessAlert() {
    document.getElementById("resultSpan").innerHTML = "Ha guardado los cambios con éxito! (Cierre esta alerta para actualizar la página)";
    document.getElementById("alertResult").classList.add("show");
}


document.addEventListener("DOMContentLoaded", function (e) {


    loadProfile();

    let form = document.getElementById('needs-validation');

    form.addEventListener('submit', function (event) {
        console.log("hola");
        if (form.checkValidity() === true) {
            saveChanges();
            showSuccessAlert();
        };
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
    });

    $('#alertDismiss').on('click', function (e) {
        location.reload();
    });

});
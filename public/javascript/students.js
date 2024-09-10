    document.getElementById('addStudentBtn').addEventListener('click', function () {
    Swal.fire({
        title: 'Ajouter un etudiant',
        html: `
                <form id="studentForm">
                <div class="row mb-3">
                    <div class="col-6">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" id="firstName" name="fisrtname" class="form-control" placeholder="Enter first name">
                    </div>
                    <div class="col-6">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" id="lastName" name="lasttname" class="form-control" placeholder="Enter last name">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="email" class="form-control" placeholder="Enter email">
                    </div>
                    <div class="col-6">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" name="password" class="form-control" placeholder="Enter password">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <label for="birthDate" class="form-label">Date de naissance</label>
                        <input type="date" id="birthDate" name="date_de_naissance" class="form-control" placeholder="Enter birth date">
                    </div>
                    <div class="col-6">
                        <label for="enrollDate" class="form-label">Date d'inscription</label>
                        <input type="date" id="enrollDate" name="date_inscription" class="form-control" placeholder="Enter enrollment date">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <label for="adresse" class="form-label">Adresse</label>
                        <input type="text" id="adresse" name="adresse" class="form-control" placeholder="Enter address">
                    </div>
                </div>
        </form>


        `,
        confirmButtonText: 'Ajouter',
        confirmButtonColor: '#232e53',
        customClass: {
            popup: 'popup-class',
            title: 'title-class',
            confirmButton: 'confirm-button-class'
        },
        preConfirm: () => {
    const fisrtname = document.getElementById('firstName').value;
    const lasttname = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const date_de_naissance = document.getElementById('birthDate').value;
    const date_inscription = document.getElementById('enrollDate').value;
    const adresse = document.getElementById('adresse').value;

    if (!fisrtname || !lasttname || !email || !password || !date_de_naissance || !date_inscription || !adresse) {
        Swal.showValidationMessage('Please fill out all fields');
        return false;
    }

    return {
        fisrtname: fisrtname, 
        lasttname: lasttname,
        email: email,
        password: password,
        date_de_naissance: date_de_naissance,
        date_inscription: date_inscription,
        adresse: adresse
    };
}
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Student data:', result.value);

            fetch('/add_etudiant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    etudaints: [result.value]
                })
            }).then(response => {
                if (response.ok) {
                    Swal.fire('Success', 'Student added successfully!', 'success');
                } else {
                    Swal.fire('Error', 'Failed to add student.', 'error');
                }
            }).catch(error => {
                Swal.fire('Error', 'An unexpected error occurred.', 'error');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const putona = document.getElementById('putona');
    if (putona) {
        putona.addEventListener('click', function () {
            const addStudentModal = new bootstrap.Modal(document.getElementById('addStudentModal'));
            addStudentModal.show();
        });
    }
});

const addStudentForm = document.getElementById('addStudentForm');
if (addStudentForm) {
    addStudentForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get form values
        const firstname = document.getElementById('firstName').value.trim();
        const lastname = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const date_de_naissance = document.getElementById('birthDate').value;
        const date_inscription = document.getElementById('enrollDate').value;
        const address = document.getElementById('address').value.trim();
        const classeId = document.getElementById('classeId').value.trim();


        
        if (!firstname || !lastname || !email || !password || !date_de_naissance || !date_inscription || !address || !classeId) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all fields!',
            });
            return;
        }

        try {
            const response = await fetch('/add_etudiant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    etudiants: [{
                        firstname,
                        lastname,
                        email,
                        password,
                        date_de_naissance,
                        date_inscription,
                        address,
                        classe_id: classeId
                    }]
                })
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Student added successfully!',
                }).then(() => {
                    const addStudentModal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
                    addStudentModal.hide();
                    window.location.reload(); 
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Failed to add student.',
                });
            }
        } catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred.',
            });
        }
    });
}





document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.deleteStudentBtn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const studentId = this.getAttribute('data-id');
            const studentRow = this.closest('tr');

            // Show confirmation alert
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this student record!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!'
            });

            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/delete_student/${studentId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const result = await response.json();

                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: result.message,
                        }).then(() => {
                            studentRow.remove();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: result.message,
                        });
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An unexpected error occurred.',
                    });
                }
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.editStudentBtn');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const student = JSON.parse(button.getAttribute('data-student'));

            document.getElementById('studentId').value = student.id;
            document.getElementById('firstname').value = student.firstname;
            document.getElementById('lastname').value = student.lastname;
            document.getElementById('email').value = student.email;
            document.getElementById('date_de_naissance').value = new Date(student.date_de_naissance).toISOString().split('T')[0];
            document.getElementById('date_inscription').value = new Date(student.date_inscription).toISOString().split('T')[0];
            document.getElementById('adresse').value = student.adresse;

            const editModal = document.getElementById('editStudentModal');
            editModal.style.display = 'block';
            editModal.classList.add('show');
            editModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        });
    });

    const closeModal = () => {
        const editModal = document.getElementById('editStudentModal');
        editModal.style.display = 'none';
        editModal.classList.remove('show');
        editModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    document.querySelector('.modal .close').addEventListener('click', closeModal);

    document.getElementById('editStudentForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const studentData = {};
        formData.forEach((value, key) => studentData[key] = value);

        try {
            const response = await fetch(`/add_etudiant/${studentData.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });

            if (!response.ok) {
                throw new Error('Error updating student');
            }

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Student updated successfully!',
            }).then(() => {
                window.location.reload();
            });

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update student.',
            });
        }
    });
});

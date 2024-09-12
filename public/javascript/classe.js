const buttonAddClasse = document.getElementById('addClassBtn');

buttonAddClasse.addEventListener('click', function() {
    Swal.fire({
        title: 'Create New Class',
        input: 'text',
        inputLabel: 'Class Name',
        inputPlaceholder: 'Enter the name of the class',
        showCancelButton: true,
        confirmButtonText: 'Create',
        preConfirm: (className) => {
            if (!className) {
                Swal.showValidationMessage('Please enter a class name');
                return false; 
            }
            return className;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const className = result.value;

            fetch('/create-class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ className: className })
            }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: `Class "${className}" has been created!`,
                        icon: 'success'
                    }).then(() => {
                        setTimeout(() => {
                            window.location.href = '/statique'; 
                        }, 1000); 
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: data.message || 'Failed to create class.',
                        icon: 'error'
                    });
                }
            }).catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while creating the class.',
                    icon: 'error'
                });
            });
        }
    });
});

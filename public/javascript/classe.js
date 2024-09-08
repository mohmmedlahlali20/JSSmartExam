const buttonAddClasse = document.getElementById('addClassBtn')
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
            }
            return className;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const className = result.value;
            Swal.fire(`Class "${className}" has been created!`);

            // Send the class name to the server using fetch API
            fetch('/create-class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ className: className })
            }).then(response => {
                if (response.ok) {
                    console.log('Class added successfully');
                } else {
                    console.log('Failed to add class');
                }
            }).catch(error => console.error('Error:', error));
        }
    });
});
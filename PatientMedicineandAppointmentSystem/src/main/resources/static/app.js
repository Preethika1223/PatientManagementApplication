function registerPatient() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const medicalHistory = document.getElementById('medicalHistory').value;

    axios.post('/api/patients/register', {
        name: name,
        contact: contact,
        medicalHistory: medicalHistory
    })
    .then(response => {
        alert('Patient registered successfully!');
        document.getElementById('registrationForm').reset();
        fetchPatients();
    })
    .catch(error => {
        alert('Error registering patient: ' + error.response.data.message);
    });
}

function fetchPatients() {
    axios.get('/api/patients')
    .then(response => {
        const patientsList = document.getElementById('patientsList');
        patientsList.innerHTML = '';
        response.data.forEach(patient => {
            const li = document.createElement('li');
            li.textContent = `${patient.name} - ${patient.contact} - ${patient.medicalHistory}`;
            patientsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching patients:', error);
    });
}

// Fetch patients on page load
window.onload = fetchPatients;

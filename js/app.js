// Variables fields form
const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const symptomsInput = document.querySelector('#sintomas');

// UI
const form = document.querySelector('#nueva-cita');
const containerAppointment = document.querySelector('#citas');

let editing;

class Appointments {
    constructor() {
        this.appointments = [];
    }

    addAppointment(appointment) {
        this.appointments = [...this.appointments, appointment];
        // console.log(this.appointments); Test
    }

    deleteAppointment(id) {
        this.appointments = this.appointments.filter( appointment => appointment.id !== id );
    }

    editAppointment(updatedAppointment) {
        this.appointments = this.appointments.map( appointment => appointment.id === updatedAppointment.id ? updatedAppointment : appointment );
    }
}

class UI {

    printAlert(message, type) {
        // Create div
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center','alert', 'd-block', 'col-12');

        // Add class based on error type
        if(type === 'error'){
            divMessage.classList.add('alert-danger');
        } else {
            divMessage.classList.add('alert-success');
        }

        // Message error
        divMessage.textContent = message;

        // Add the DOM
        document.querySelector('#contenido').insertBefore(divMessage, document.querySelector('.agregar-cita'));

        // Remove alert after 5 seconds
        setTimeout(() => {
            divMessage.remove();
        },5000 );
    }

    // Apply unstructuring from the parentheses you use for the parameters of your functions
    printAppointments({appointments}){
        // console.log(appointments); Test

        this.cleanHTML();

        appointments.forEach( appointment => {
            // Extract the information from the appointmentObj
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = appointment;
            const divAppointment = document.createElement('div');
            divAppointment.classList.add('cita', 'p-3');
            divAppointment.dataset.id = id;

            // Scripting of citation elements
            const petParagraph = document.createElement('h2');
            petParagraph.classList.add('card-title', 'font-weight-bolder');
            petParagraph.textContent = mascota;

            const ownerParagraph = document.createElement('p');
            ownerParagraph.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const phoneParagraph = document.createElement('p');
            phoneParagraph.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const dateParagraph = document.createElement('p');
            dateParagraph.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const hourParagraph = document.createElement('p');
            hourParagraph.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const symptomsParagraph = document.createElement('p');
            symptomsParagraph.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            // Button for delete appointment
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
            btnDelete.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

            btnDelete.onclick = () => deleteAppointment(id);

            // Add a button to edit
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn', 'btn-info');
            btnEdit.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

            btnEdit.onclick = () => loadEdition(appointment);

            // Add paragraphs to divAppointment
            divAppointment.appendChild(petParagraph);
            divAppointment.appendChild(ownerParagraph);
            divAppointment.appendChild(phoneParagraph);
            divAppointment.appendChild(dateParagraph);
            divAppointment.appendChild(hourParagraph);
            divAppointment.appendChild(symptomsParagraph);
            divAppointment.appendChild(btnDelete);
            divAppointment.appendChild(btnEdit);

            // Add appointments to HTML
            containerAppointment.appendChild(divAppointment);
        });
    }

    cleanHTML() {
        while(containerAppointment.firstChild){
            containerAppointment.removeChild(containerAppointment.firstChild);
        }
    }
}

// Instantiate
const ui = new UI();
const manageAppointments = new Appointments();

// Log events
eventListeners();
function eventListeners() {
    petInput.addEventListener('input', appointmentData);
    ownerInput.addEventListener('input', appointmentData);
    phoneInput.addEventListener('input', appointmentData);
    dateInput.addEventListener('input', appointmentData);
    hourInput.addEventListener('input', appointmentData);
    symptomsInput.addEventListener('input', appointmentData);

    form.addEventListener('submit', newAppointment);
}

// Object with appointment information
const appointmentObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Functions

// Add data to the appointment object
function appointmentData(e) {
    appointmentObj[e.target.name] = e.target.value;
    // console.log(appointmentObj); Test
}

// Valid and add a new appointment to the appointment class
function newAppointment(e) {
    e.preventDefault();

    // Extract the information from the appointmentObj
    const { mascota, propietario, telefono, fecha, hora, sintomas } = appointmentObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        // console.log('Todos los campos son obligatorios'); Test
        ui.printAlert('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editing) {
        // console.log('Modo edición'); Test
        // Message success
        ui.printAlert('Se edito correctamente la cita');

        // Pass the object of the appointment to edit
        manageAppointments.editAppointment({...appointmentObj});

        // Change button text to its original state
        form.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Remove edit mode
        editing = false;

    } else {
        // console.log('Modo nueva cita'); Test
        // Generate a unique ID
        appointmentObj.id = Date.now();

        // Create a new appointment
        manageAppointments.addAppointment({...appointmentObj}); 

        // Message success
        ui.printAlert('Se agrego correctamente la cita');
    }

    // Restart the object for validation
    resetObject();

    // Restart form
    form.reset();

    // Show the HTML of appointments
    ui.printAppointments(manageAppointments);

}

function resetObject() {
    appointmentObj.mascota = '';
    appointmentObj.propietario = '';
    appointmentObj.telefono = '';
    appointmentObj.fecha = '';
    appointmentObj.hora = '';
    appointmentObj.sintomas = '';
}

function deleteAppointment(id) {
    // console.log(id); Test

    // Delete appointment
    manageAppointments.deleteAppointment(id);

    // Show a message
    ui.printAlert('La cita se elimino correctamente');

    // Refresh appointment
    ui.printAppointments(manageAppointments);
}

// Load data and edit mode 
function loadEdition(appointment) {
    // console.log(appointment); Test
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = appointment;

    petInput.value = mascota;
    ownerInput.value = propietario;
    phoneInput.value = telefono;
    dateInput.value = fecha;
    hourInput.value = hora;
    symptomsInput.value = sintomas;

    // Fill object
    appointmentObj.mascota = mascota;
    appointmentObj.propietario = propietario;
    appointmentObj.telefono = telefono;
    appointmentObj.fecha = fecha;
    appointmentObj.hora = hora;
    appointmentObj.sintomas = sintomas;
    appointmentObj.id = id;

    // Change button text
    form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editing = true;
}
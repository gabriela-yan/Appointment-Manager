import Appointments from './classes/Appointments.js';
import UI from './classes/UI.js';

import { 
    petInput, 
    ownerInput, 
    phoneInput,
    dateInput, 
    hourInput, 
    symptomsInput, 
    form 
} from './selectors.js';

// Instantiate
const ui = new UI();
const manageAppointments = new Appointments();

let editing;

// Object with appointment information
const appointmentObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Add data to the appointment object
export function appointmentData(e) {
    appointmentObj[e.target.name] = e.target.value;
    // console.log(appointmentObj); Test
}

// Valid and add a new appointment to the appointment class
export function newAppointment(e) {
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

export function resetObject() {
    appointmentObj.mascota = '';
    appointmentObj.propietario = '';
    appointmentObj.telefono = '';
    appointmentObj.fecha = '';
    appointmentObj.hora = '';
    appointmentObj.sintomas = '';
}

export function deleteAppointment(id) {
    // console.log(id); Test

    // Delete appointment
    manageAppointments.deleteAppointment(id);

    // Show a message
    ui.printAlert('La cita se elimino correctamente');

    // Refresh appointment
    ui.printAppointments(manageAppointments);
}

// Load data and edit mode 
export function loadEdition(appointment) {
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
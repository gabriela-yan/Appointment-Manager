import { deleteAppointment, loadEdition } from '../functions.js';
import { containerAppointment } from '../selectors.js';

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

export default UI;
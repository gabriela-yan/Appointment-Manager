import { appointmentData, newAppointment } from '../functions.js'
import { 
    petInput, 
    ownerInput, 
    phoneInput,
    dateInput, 
    hourInput, 
    symptomsInput, 
    form 
} from '../selectors.js';

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        petInput.addEventListener('input', appointmentData);
        ownerInput.addEventListener('input', appointmentData);
        phoneInput.addEventListener('input', appointmentData);
        dateInput.addEventListener('input', appointmentData);
        hourInput.addEventListener('input', appointmentData);
        symptomsInput.addEventListener('input', appointmentData);

        form.addEventListener('submit', newAppointment);
    }
}

export default App;
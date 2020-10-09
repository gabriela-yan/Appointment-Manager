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

export default Appointments;
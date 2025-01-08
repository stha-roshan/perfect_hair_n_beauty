

const appointments = document.getElementById('appointments')

appointments.addEventListener('change', (event) => {
    const selectedValue = event.target.value
    if(selectedValue === 'all-appointments'){
        window.location.href = '/appointments/allAppointments';
    }

    if(selectedValue === 'confirmed-appointments'){
        window.location.href = '/appointments/confirmed';
    }

    if(selectedValue === 'cancelled-appointements'){
        window.location.href = '/appointments/cancelled';
    }
})
import sql from "../config/db.js";


async function getAllAppointments(req,res) {
    if (!req.query.type) {
        const appointments = await sql`
            select *
            from appointments
        `;
        res.status(200).send(appointments);
    }
    if (req.query.type) {
        const queryVal = req.query.type;
        switch(queryVal) {
            case 'upcoming': {
                const upcomingAppointments = await sql`
                    select *
                    from appointments
                    where status='UPCOMING'
                `
                res.status(200).send(upcomingAppointments);
                break;
            }
            case 'cancelled': {
                const cancelledAppointments = await sql`
                    select *
                    from appointments
                    where status='CANCELLED'
                `
                res.status(200).send(cancelledAppointments);
                break;
            }
            case 'completed': {
                const completedAppointments = await sql`
                    select *
                    from appointments
                    where status='COMPLETED'
                `
                res.status(200).send(completedAppointments);
                break;
            }
            default: 
                break;
        }
    }
}

async function createAppointment(req, res) {
    const {appointment_date_time} = req.body;
    const newAppointment = await sql`
        insert into appointments (appointment_date_time)
        values (${appointment_date_time})
        returning *
    `
    res.status(201).send({
        status: "success",
        message: "Appointment created successfully",
        data: newAppointment
    })
}

export {
    getAllAppointments,
    createAppointment
}
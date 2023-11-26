import React from "react"


const list = [
    { id: 'Upcoming', value: 'Upcoming' },
    { id: 'Cancelled', value: 'Cancelled' },
    { id: 'Completed', value: 'Completed' },
    { id: 'Under Approval', value: 'Can be Approve' },
    { id: 'Reschedule', value: 'Reschedule approved' },
    { id: 'Pending', value: 'Pending' },
    { id: 'Cancel Request', value: 'Pending Cancellation' },
]

const name = (key) => {
    let value = list.find(itm => itm.id === key)
    value = value ? value.value : key
    return value
}

const html = (key, language = '') => {
    let value = list.find(itm => itm.id === key)
    let html = <><span className="status">
        <span className="material-symbols-outlined">calendar_month</span> {key}
    </span>
    </>

    if (value) {
        if (key === 'Upcoming') html = <span className="status status-blue">
            <span className="material-symbols-outlined">event_upcoming</span> {value.value}
        </span>

        if (key === 'Reschedule') html = <span className="status status-blue">
            <span className="material-symbols-outlined">edit_calendar</span> {value.value}
        </span>

        if (key === 'Pending' || key === 'Cancel Request') html = <span className="status status-yellow">
            <span className="material-symbols-outlined">pending</span> {value.value}
        </span>

        if (key === 'Cancelled') html = <span className="status status-blue">
            <span className="material-symbols-outlined">cancel</span> {value.value}
        </span>

        if (key === 'Cancelled') html = <span className="status status-red">
            <span className="material-symbols-outlined">cancel</span> {value.value}
        </span>

        if (key === 'Completed') html = <span className="status status-green">
            <span className="material-symbols-outlined"> check_circle</span> {value.value}
        </span>
    }

    return html
}

const statusModel = { list, name, html }
export default statusModel
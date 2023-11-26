import datepipeModel from "./datepipemodel"

const list = [
    { key: 'ic_number', value: 'IC/Passport Number', pipe: '' },
    { key: 'mobileNo', value: 'Phone Number', pipe: 'mobile', codeKey: 'dialCode' },
    { key: 'fullName', value: 'Name', pipe: '' },
    { key: 'role', value: 'Role', pipe: '' },
    { key: 'email', value: 'Email', pipe: '', className: 'ext-lowercase' },
    { key: 'firstName', value: 'First Name', pipe: '' },
    { key: 'lastName', value: 'Last Name', pipe: '' },
    { key: 'createdAt', value: 'Created At', pipe: 'dateNtime' },
    { key: 'nationality', value: 'Nationality', pipe: '' },
    { key: 'dob', value: 'Date of Birth', pipe: 'date' },
    { key: 'gender', value: 'gender', pipe: '' },
    { key: 'healthClinicId', value: 'Health Clinic', pipe: '', includes: ['name'], onClick: true },
    { key: 'language', value: 'Language', pipe: 'arraystring' },
    { key: 'expertise', value: 'Expertise', pipe: 'arraystring' },
    { key: 'recentAppointmentDate', value: 'Recent Consultation Session', pipe: 'dateNtime' },
    { key: 'recentAssessmentDate', value: 'Recent Assessment', pipe: 'dateNtime' },
    { key: 'lastLoginAt', value: 'Last Login', pipe: 'dateNtime' },
    { key: 'recentRiskLevel', value: 'Recent Risk Level', includes: ['en'] },
]

const find = (key) => {
    let value = list.find(itm => itm.id == key)
    return value
}

const colView = (col, item) => {
    let value = item[col.key]

    if (col.includes && value) {
        col.includes.map(itm => {
            value = value[itm]
        })
    }

    if (col.pipe == 'date') {
        value = value ? `${datepipeModel.date(value)}` : ''
    }
    else if (col.pipe == 'dateNtime') {
        value = value ? `${datepipeModel.date(value)} | ${datepipeModel.time(value)}` : ''
    }
    else if (col.pipe == 'mobile') {
        value = value ? `${item[col && col.codeKey]} ${value}` : ''
    }
    return value
}

const userTableModel = { list, find, colView }
export default userTableModel
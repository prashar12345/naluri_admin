const userpermissions = {
    icNo: { add: false, edit: false, delete: false, read: false, title: 'IC Number', cat: 'user' },
    name: { add: false, edit: false, delete: false, read: false, title: 'Name', cat: 'user' },
    dob: { add: false, edit: false, delete: false, read: false, title: 'Date of Birth', cat: 'user' },
    phone: { add: false, edit: false, delete: false, read: false, title: 'Phone Number', cat: 'user' },
    email: { add: false, edit: false, delete: false, read: false, title: 'Email', cat: 'user' },
    occupation: { add: false, edit: false, delete: false, read: false, title: 'Occupation', cat: 'user' },
    ush: { add: false, edit: false, delete: false, read: false, title: 'Users consultation history', cat: 'user' },
    uah: { add: false, edit: false, delete: false, read: false, title: 'Users assessment history', cat: 'user' },
    ucn: { add: false, edit: false, delete: false, read: false, title: 'Users case note', cat: 'user' },
}

const counsellorpermissions = {
    userId: { add: false, edit: false, delete: false, read: false, title: 'User ID / employee ID (unique identifier)', cat: 'counsellor' },
    cPhone: { add: false, edit: false, delete: false, read: false, title: 'Personal Phone number', cat: 'counsellor' },
    cEmail: { add: false, edit: false, delete: false, read: false, title: 'Email', cat: 'counsellor' },
    kk: { add: false, edit: false, delete: false, read: false, title: 'Based at which KK', cat: 'counsellor' },
    whatapp: { add: false, edit: false, delete: false, read: false, title: 'Whatsapp Number in use', cat: 'counsellor' },
    tenure: { add: false, edit: false, delete: false, read: false, title: 'Tenure', cat: 'counsellor' },
    cch: { add: false, edit: false, delete: false, read: false, title: 'Counsellors’ consultation history', cat: 'counsellor' },
    cca: { add: false, edit: false, delete: false, read: false, title: 'Counsellors’ Calendar availability', cat: 'counsellor' }
}

const adminpermissions = {
    auserId: { add: false, edit: false, delete: false, read: false, title: 'User ID (unique identifier)', cat: 'admin' },
    aPhone: { add: false, edit: false, delete: false, read: false, title: 'Personal Phone number', cat: 'admin' },
    aEmail: { add: false, edit: false, delete: false, read: false, title: 'Email', cat: 'admin' }
}


const coulumsaccess = {
    coluserId: { add: false, edit: false, delete: false, read: false, title: 'User ID (unique identifier)', cat: 'coulums' },
    colPhone: { add: false, edit: false, delete: false, read: false, title: 'Personal Phone number', cat: 'coulums' },
    colEmail: { add: false, edit: false, delete: false, read: false, title: 'Email', cat: 'coulums' },
    colRole: { add: false, edit: false, delete: false, read: false, title: 'Role', cat: 'coulums' },
    colName: { add: false, edit: false, delete: false, read: false, title: 'Name', cat: 'coulums' },
    colAction: { add: false, edit: false, delete: false, read: false, title: 'Action', cat: 'coulums' },
}

const permissions = {
    titlea: 'User information',
    ...userpermissions,
    titleb: 'Counsellor Information in Counsellors profile',
    ...counsellorpermissions,
    titlec: 'Admin information in Users / Counsellors profile',
    ...adminpermissions,
    // titled: 'Column Access',
    // ...coulumsaccess
}

let pobjArr = Object.keys(permissions)
const permissionArr = pobjArr.map(itm => {
    if (itm.includes('title')) {
        return { title: permissions[itm] }
    } else {
        return { name: permissions[itm].title, key: itm }
    }
})


const permissionModel = { permissions, permissionArr }

export default permissionModel
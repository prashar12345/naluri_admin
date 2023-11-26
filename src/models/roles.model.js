const list = [
    { key: 'admin', name: 'Web Admin' },
    { key: 'admin', name: 'Web Admin' },
    { key: 'admin', name: 'Web Admin' },
]

const find = (key) => {
    let ext = list.find(itm.key == key)
    return ext
}

const rolesModel = { list, find }
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import AddEditUser from './AddEditUser';
import InviteModal from './inviteModal';
import { Link } from 'react-router-dom';
import userTableModel from '../../models/userTable.model';

const Allusers = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '', role: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [form, setform] = useState({ role: 'user', firstName: '', addAvailability: false, lastName: '', email: '', ic_number: '', password: '', mobileNo: '', dialCode: '+60', nationality: '' })
    const [formData, setFormData] = useState({ email: '', ic_number: '' })
    const [submitted, setSubmitted] = useState(false)
    const [inviteForm, setInviteForm] = useState({ email: '' })
    const [emailErr, setEmailErr] = useState('')
    const [icErr, setIcErr] = useState('')
    const [tableCols, setTableCols] = useState([])

    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 4; i++) {
            cols.push(userTableModel.list[i])
        }
        setTableCols(cols)
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])


    const uTableCols = () => {
        let exp = []
        if (tableCols) exp = tableCols
        let value = []
        userTableModel.list.map(itm => {
            if (itm != exp.find(it => it.key == itm.key)) {
                value.push(itm)
            }
        })
        return value
    }

    const addCol = (itm) => {
        setTableCols([...tableCols, itm])
    }


    const removeCol = (index) => {
        let exp = tableCols
        exp.splice(index, 1);
        setTableCols([...exp])
    }

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('user/listing', filter).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }


    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('soft/delete', { model: 'users', status: 'deactive', id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData({ page: 1 })
    }


    const openModal = (itm = {}) => {
        setSubmitted(false)
        setEmailErr('')
        setIcErr('')
        setform({ role: 'user', firstName: '', lastName: '', email: '', ic_number: '', password: '', mobileNo: '', dialCode: '+60', nationality: '', ...itm })
        setFormData({ ...formData, ...itm })
        if (itm.id) {
            setform({ ...form, ...itm, password: '********' })
        }
        document.getElementById("openuserModal").click()
    }

    const ChangeRole = (e) => {
        setFilter({ ...filters, role: e, page: 1 })
        getData({ role: e, page: 1 })
    }

    const invite = (role) => {
        document.getElementById("openInviteModal").click()
        setInviteForm({ email: '', role: role })
        setSubmitted(false)
        setEmailErr('')
    }

    const exportCsv = () => {
        loader(true)
        ApiClient.get('user/csv').then(res => {
            if (res.success) {
                let url = res.path
                let downloadAnchor = document.getElementById("downloadJS")
                downloadAnchor.href = url
                downloadAnchor.click()
            }
            loader(false)
        })
    }

    const colClick = (col, itm) => {
        if (col.key == 'healthClinicId') {
        }
    }

    return (
        <Layout>
            <div className="d-flex justify-content-between mb-3">
                <h3 className="hedding">
                    All Accounts
                </h3>

                <article className="d-flex">
                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Invite
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {user.role == 'Owner' && <a className="dropdown-item" onClick={() => invite('admin')}>Admin</a>}
                            {user.role == 'Owner' && <a className="dropdown-item" onClick={() => invite('Owner')}>Owner</a>}
                            <a className="dropdown-item" onClick={() => invite('Clinic Admin')}>Clinic Admin</a>
                            <a className="dropdown-item" onClick={() => invite('Counsellor')}>Counsellor</a>
                            <a className="dropdown-item" onClick={() => invite('user')}>User</a>
                            <a className="dropdown-item" onClick={() => invite('translater')}>Translater</a>
                        </div>
                    </div>
                    <button className="btn btn-primary mr-2" onClick={() => openModal({ role: 'user' })}>
                        Add User
                    </button>
                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Role: {filters.role ? filters.role : 'All'}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className={filters.role == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('')}>All</a>
                            {user.role == 'Owner' && <a className={filters.role == 'admin' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('admin')}>Admin</a>}
                            {user.role == 'Owner' && <a className={filters.role == 'Owner' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('Owner')}>Owner</a>}
                            <a className={filters.role == 'Clinic Admin' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('Clinic Admin')}>Clinic Admin</a>
                            <a className={filters.role == 'user' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('user')}>User</a>
                            <a className={filters.role == 'Counsellor' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('Counsellor')}>Counsellor</a>

                        </div>
                    </div>

                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuColumns" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add Columns
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuColumns">
                            {uTableCols().map(itm => {
                                return <a className="dropdown-item" onClick={() => addCol(itm)} key={itm.value}>{itm.value}</a>
                            })}

                        </div>
                    </div>

                    <button onClick={exportCsv} className="btn btn-primary" type="button">
                        Export
                    </button>
                </article>


            </div>
            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            {tableCols && tableCols.map((itm, i) => {
                                return <th key={itm.key} className="nowrap">{itm.value}
                                    <i className="fa fa-times cursor-pointer ml-2 text-danger" onClick={() => removeCol(i)}></i>
                                </th>
                            })}
                            <th className="nowrap"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaging && data && data.map((itm, i) => {
                            return <tr key={i}>
                                {tableCols && tableCols.map(titm => {
                                    return <td key={titm.key} className={`nowrap ${titm.className ? titm.className : ''}`}>
                                        {titm.onClick ? <a className="" onClick={e => colClick(titm, itm)}>{userTableModel.colView(titm, itm)}</a> : userTableModel.colView(titm, itm)}
                                    </td>
                                })}
                                <td className="nowrap">
                                    <Link className="linkclass mx-2" title="View" to={'/profiledetail/' + itm.id}>
                                        <i className="fa fa-eye"></i></Link> |
                                    <a className="linkclass mx-2" title="Edit" onClick={() => openModal(itm)}><i className="fa fa-pen"></i></a> |
                                    <a className="linkclass mx-2" title="Delete" onClick={() => deleteItem(itm.id)}><i className="fa fa-trash"></i></a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {loaging ? <div className="text-center py-4">
                    <img src="./assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}
            </div>

            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

            {
                !loaging && total > filters.count ? <div>
                    {/* <Pagination
                        activePage={filters.page}
                        itemsCountPerPage={filters.count}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={pageChange}
                    /> */}
                    <Pagination
                        currentPage={filters.page}
                        totalSize={total}
                        sizePerPage={filters.count}
                        changeCurrentPage={pageChange}
                    />
                </div> : <></>
            }

            <AddEditUser formData={formData} form={form} submitted={submitted} emailErr={emailErr} setIcErr={setIcErr} icErr={icErr} setEmailErr={setEmailErr} setSubmitted={setSubmitted} setform={setform} modalClosed={modalClosed} />
            <InviteModal form={inviteForm} setform={setInviteForm} submitted={submitted} emailErr={emailErr} setEmailErr={setEmailErr} setSubmitted={setSubmitted} modalClosed={modalClosed} />
        </Layout>
    );
};

export default Allusers;

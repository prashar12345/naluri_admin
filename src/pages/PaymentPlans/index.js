import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import datepipeModel from '../../models/datepipemodel';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import AddEditPlans from './AddEditPlans';
import InviteModal from './inviteModal';
import { Link } from 'react-router-dom';

const PaymentPlans = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '', role: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [form, setform] = useState({ role: 'user', firstName: '', lastName: '', email: '', ic_number: '', password: '', mobileNo: '', dialCode: '+60', nationality: '' })
    const [submitted, setSubmitted] = useState(false)
    const [inviteForm, setInviteForm] = useState({ email: '' })
    const [emailErr, setEmailErr] = useState('')
    const [icErr, setIcErr] = useState('')

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

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
        if (itm.id) {
            setform({ ...form, ...itm, password: '********' })
        }
        // if (itm.role == 'Owner') document.getElementById("openPOModal").click()
        // if (itm.role == 'Clinic Admin' || itm.role == 'clinic-sub-admin') document.getElementById("openCAModal").click()
        // if (itm.role == 'user' || itm.role == 'Counsellor') document.getElementById("openuserModal").click()
        document.getElementById("openuserModal").click()
    }

    const ChangeRole = (e) => {
        setFilter({ ...filters, role: e, page: 1 })
        getData({ role: e, page: 1 })
    }

    const invite = () => {
        document.getElementById("openInviteModal").click()
        setInviteForm({ email: '' })
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

    return (
        <Layout>
            <div className="d-flex justify-content-between mb-3">
                <h3 className="hedding">
                    Payment Plans
                </h3>

                <article className="d-flex">
                    <button className="btn btn-secondary mr-2" onClick={() => invite()}>
                        Invite Counsellor
                    </button>
                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Role: {filters.role ? filters.role : 'All'}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className={filters.role == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('')}>All</a>
                            <a className={filters.role == 'Owner' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('Owner')}>Owner</a>
                            <a className={filters.role == 'Clinic Admin' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('Clinic Admin')}>Clinic Admin</a>
                            {/* <a className={filters.role == 'clinic-sub-admin' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('clinic-sub-admin')}>Clinic Sub Admin</a> */}
                            <a className={filters.role == 'user' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('user')}>User</a>
                            <a className={filters.role == 'Counsellor' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('Counsellor')}>Counsellor</a>

                        </div>
                    </div>
                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add Plans
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={() => openModal({ role: 'Owner' })}>Owner</a>
                            <a className="dropdown-item" onClick={() => openModal({ role: 'Clinic Admin' })}>Clinic Admin</a>
                            <a className="dropdown-item" onClick={() => openModal({ role: 'user' })}>User</a>
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
                            <th scope="col" >Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Interval</th>
                            {/* <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th> */}
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaging && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td>{itm.ic_number}</td>
                                <td>{itm.dialCode + itm.mobileNo}</td>
                                <td>{datepipeModel.date(itm.createdAt)} | {datepipeModel.time(itm.createdAt)}</td>
                                {/* <td>{itm.fullName}</td>
                                <td>{itm.role}</td>
                                <td>{itm.email}</td> */}
                                <td>
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

            <AddEditPlans form={form} submitted={submitted} emailErr={emailErr} setIcErr={setIcErr} icErr={icErr} setEmailErr={setEmailErr} setSubmitted={setSubmitted} setform={setform} modalClosed={modalClosed} />
            <InviteModal form={inviteForm} setform={setInviteForm} submitted={submitted} emailErr={emailErr} setEmailErr={setEmailErr} setSubmitted={setSubmitted} modalClosed={modalClosed} />
        </Layout>
    );
};







export default PaymentPlans;

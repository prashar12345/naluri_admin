import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import datepipeModel from '../../models/datepipemodel';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import AddEditRole from './AddEditRole';
import ViewRole from './viewRole';
import permissionModel from '../../models/permisstion.model';

const RolesList = (p) => {
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 5, search: '' })
    const [data, setData] = useState([])
    var permissions = permissionModel.permissions
    const [total, setTotal] = useState(0)
    const [loader, setLoader] = useState(true)
    const [form, setform] = useState({ role: '', permissions: permissions })
    const searchState = useSelector((state) => state.search);

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('roles', filter).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const openModal = (itm = '') => {
        setform({ ...form, id: '', role: '' })
        if (itm) {
            let pms = permissions
            if (itm.permissions) pms = { ...permissions, ...itm.permissions }
            setform({ ...form, id: itm.id, role: itm.role, permissions: pms })
        }
        document.getElementById("openRoleModal").click()
    }

    const openViewModal = (itm = '') => {
        setform({ ...form, id: '', role: '' })
        if (itm) {
            let pms = permissions
            if (itm.permissions) pms = { ...permissions, ...itm.permissions }
            setform({ ...form, id: itm.id, role: itm.role, permissions: pms })
        }
        document.getElementById("openViewRoleModal").click()
    }

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData()
    }

    return (
        <Layout>
            <div className="mb-3">
                <h3 className="hedding">
                    Roles Access
                </h3>

                {/* <button className="btn btn-primary" onClick={() => openModal()}>Add Role</button> */}
            </div>

            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">Role</th>
                            <th scope="col" className="dateTh">Date & Time</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loader && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td>{itm.role}</td>
                                <td>{datepipeModel.date(itm.updatedAt)} | {datepipeModel.time(itm.updatedAt)}</td>
                                <td>
                                    <a className="linkclass mx-1" onClick={() => openModal(itm)}>Edit Role Access</a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {loader ? <div className="text-center py-4">
                    <img src="./assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}
            </div>

            {!loader && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

            {!loader && total > filters.count ? <div>
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
            </div> : <></>}
            <AddEditRole rolForm={form} setform={setform} modalClosed={modalClosed} />
            <ViewRole rolForm={form} setform={setform} />
        </Layout>
    );
};







export default RolesList;

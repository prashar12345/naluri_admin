import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import datepipeModel from '../../models/datepipemodel';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import AddEdit from './AddEdit';
import { ToastsStore } from 'react-toasts';
import ViewModal from './View';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';
import { useHistory } from 'react-router';

const Categories = (p) => {
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 5, search: '', type: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(true)
    const [form, setform] = useState({})
    const [type, setType] = useState()
    const searchState = useSelector((state) => state.search);
    const history = useHistory()

    useEffect(() => {
        if (user && user.loggedIn) {
            let type = methodModel.getPrams('type')
            getType(type)
        }
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            let type = methodModel.getPrams('type')
            setFilter({ ...filters, search: searchState.data, type })
            getData({ search: searchState.data, page: 1, type: type })
        }
    }, [searchState])

    const getType = (id) => {
        loader(true)
        ApiClient.get("category/type", { id: id }).then(res => {
            if (res.success) {
                setType(res.data)
            }
            loader(false)
        })
    }

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('categories', filter).then(res => {
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
        let ratio = [
            { min: 0, max: 4, level_risk: 'Normal' },
            { min: 5, max: 6, level_risk: 'Mild' },
            { min: 7, max: 10, level_risk: 'Moderate' },
            { min: 11, max: 13, level_risk: "Severe" },
            { min: 14, max: 14, level_risk: "Extremely severe" },
        ]
        setform({ name: '', type: '', ratio, type: type.id })
        if (itm) {
            setform({ ...form, ...itm, type: itm.type.id, ratio: itm.ratio ? itm.ratio : ratio })
        }
        document.getElementById("openEditModal").click()
    }

    const openViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById("openViewModal").click()
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('soft/delete', { model: 'category', status: 'deactive', id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData()
    }

    return (
        <Layout>
            <div className='text-right mb-3'>
                <i className="fa fa-arrow-left text-primary backBtn" title="Back" onClick={e => { history.goBack() }}></i>

            </div>
            <div className="mb-3 d-flex justify-content-between">
                <h3 className="hedding text-capitalize">

                    {type && type.name} Categories
                </h3>
                {methodModel.isTranslatePage() ? <></> : <button className="btn btn-primary" onClick={() => openModal()}>Add Category</button>}
            </div>

            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">Category</th>
                            <th scope="col">Assessment Type</th>
                            <th scope="col">Date & time</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td>{itm.name}</td>
                                <td>{itm.type.name}</td>
                                <td>{datepipeModel.date(itm.createdAt)} | {datepipeModel.time(itm.createdAt)}</td>
                                <td className='text-nowrap'>
                                    <a className="linkclass mx-2" onClick={() => openViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>|
                                    <a className="linkclass mx-2" onClick={() => openModal(itm)} title="Edit"><i className="fas fa-pen"></i></a>
                                    {methodModel.isTranslatePage() ? <></> : <>
                                        |  <a className="linkclass mx-2" onClick={() => deleteItem(itm.id)} title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                    </>}

                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {loading ? <div className="text-center py-4">
                    <img src="/assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}
            </div>

            {!loading && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

            {!loading && total > filters.count ? <div>
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
            <AddEdit form={form} setform={setform} modalClosed={modalClosed} />
            <ViewModal form={form} setform={setform} />
        </Layout>
    );
};







export default Categories;

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
import TranslationTabs from '../Translation/TranslationTabs';
import methodModel from '../../methods/methods';

const CustomField = (p) => {
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(true)
    const [form, setform] = useState({ label: '', fieldType: '', options: [{ name: '' }] })
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
        ApiClient.get('custom/fields', filter).then(res => {
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
        let blank = { label: '', fieldType: '', options: [{ name: '' }] }
        setform(blank)
        if (itm) {
            setform({ ...blank, ...itm })
        }
        document.getElementById("openEditModal").click()
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            ApiClient.delete('custom/field', { id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
            })
        }
    }

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData()
    }

    return (
        <Layout>
            <TranslationTabs page="categorytype" />

            <div className="Assessment mb-3 d-flex justify-content-between">
                <h3 className="hedding">
                    Case Note Custom Field
                </h3>
                {methodModel.isTranslatePage() ? <></> : <button className="btn btn-primary" onClick={() => openModal()}>Add Case Note Custom Field</button>}
            </div>

            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">Label</th>
                            <th scope="col">Type</th>
                            <th scope="col">Required</th>
                            <th scope="col">Date & time</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td>{itm.label}</td>
                                <td className='text-capitalize'>{itm.fieldType}</td>
                                <td>{itm.required ? 'Yes' : 'No'}</td>
                                <td>{datepipeModel.date(itm.createdAt)} | {datepipeModel.time(itm.createdAt)}</td>
                                <td>
                                    <a className="linkclass mx-2" onClick={() => openModal(itm)}><i title="Edit" className="fas fa-pen"></i></a>
                                    |
                                    {methodModel.isTranslatePage() ? <></> : <>
                                        <a className="linkclass mx-2" onClick={() => deleteItem(itm.id)}><i title="Delete" className="fa fa-trash" aria-hidden="true"></i></a>
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
        </Layout>
    );
};
export default CustomField;

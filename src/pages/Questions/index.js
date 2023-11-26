import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import datepipeModel from '../../models/datepipemodel';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import AddEditQuestion from './AddEditQuestion';
import { ToastsStore } from 'react-toasts';
import ViewQuestion from './ViewQuestion';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';

const Questions = (p) => {
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 5, search: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(true)
    const [type, setType] = useState()
    const [form, setform] = useState({})
    const searchState = useSelector((state) => state.search);

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
            getTypes()
        }
    }, [searchState])

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('questions', filter).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }

    const getTypes = () => {
        // setLoader(true)
        ApiClient.get('category/types', { page: 1, count: 100 }).then(res => {
            if (res.success) {
                setType(res.data)
            }
            // setLoader(false)
        })
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const openModal = (itm = '') => {
        let id = new Date().getTime()
        let options = [
            {
                id: `${id}a`,
                option: 'Never',
                weightage: '0'
            },
            {
                id: `${id}b`,
                option: 'Sometimes',
                weightage: '1'
            },
            {
                id: `${id}c`,
                option: 'Often',
                weightage: '2'
            },
            {
                id: `${id}d`,
                option: 'Almost always',
                weightage: '3'
            }
        ]

        let ratio = [
            { min: 0, max: 4, level_risk: 'Normal' },
            { min: 5, max: 6, level_risk: 'Mild' },
            { min: 7, max: 10, level_risk: 'Moderate' },
            { min: 11, max: 13, level_risk: "Severe" },
            { min: 14, max: 14, level_risk: "Extremely severe" },
        ]

        setform({ question: '', options: options, ratio, category: '' })
        if (itm) {
            setform({
                ...form, ...itm, type: itm.type?.id,
            })
        }
        document.getElementById("openQuestionModal").click()
    }

    const openViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById("openViewQuestionModal").click()
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('soft/delete', { model: 'questions', status: 'deactive', id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }


    const ChangeType = (e) => {
        setFilter({ ...filters, type: e, page: 1, })
        getData({ type: e, page: 1 })
    }

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData()
    }

    return (
        <Layout>
            <h3 className="hedding">
                Questions
            </h3>
            <div className="mb-3 d-flex justify-content-end">
                <div className="dropdown addDropdown mr-3">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {filters.type ? methodModel.find(type, filters.type, 'id').name : 'Assessment Type'}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className={filters.type == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeType('')}>All</a>
                        {type && type.map(itm => {
                            return <a className={filters.type == itm.id ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeType(itm.id)} key={itm.id}>{itm.name
                            }</a>
                        })}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={() => openModal()}>Add Question</button>
            </div>

            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">Question</th>
                            <th scope="col">Date & time</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td><span className=' tuncketcls'>{itm.question}</span></td>
                                <td>{datepipeModel.date(itm.createdAt)} | {datepipeModel.time(itm.createdAt)}</td>
                                <td>
                                    <a className="linkclass mx-2" onClick={() => openViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>|
                                    <a className="linkclass mx-2" onClick={() => openModal(itm)} title="Edit"><i className="fas fa-pen"></i></a>|
                                    <a className="linkclass mx-2" onClick={() => deleteItem(itm.id)} title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {loading ? <div className="text-center py-4">
                    <img src="./assets/img/loader.gif" className="pageLoader" />
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
            <AddEditQuestion form={form} setform={setform} modalClosed={modalClosed} />
            <ViewQuestion form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};







export default Questions;

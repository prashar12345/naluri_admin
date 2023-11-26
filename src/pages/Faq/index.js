import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import AddEditFaq from './AddEditFaq';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import ViewFaq from './ViewFaq';
import TranslationTabs from '../Translation/TranslationTabs';
import methodModel from '../../methods/methods';

const Faq = (p) => {
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 100, search: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(true)
    const [form, setform] = useState({})
    const searchState = useSelector((state) => state.search);



    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    const dragEnter = (e, position) => {
        console.log("e", e)
        console.log("position", position)
        dragOverItem.current = position;
    };

    const drop = () => {
        const copyListItems = [...data];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setData(copyListItems);

        ApiClient.put('faq/order', {
            faqs: copyListItems.map((itm, i) => {
                return { ...itm, order: i + 1 }
            })
        }).then(res => {
            ToastsStore.success(res.message)
        })
    };


    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })

        }
    }, [searchState])

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('faqs', filter).then(res => {
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
        let id = new Date().getTime()

        setform({ question: '', answer: '' })
        if (itm) {
            setform({
                ...form, ...itm, question: itm.question, answer: itm.answer,
            })
        }
        document.getElementById('openFaqModal').click()
    }

    const openViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById('openViewFaqModal').click()
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }


    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('faq', { model: 'questions', status: 'deactive', id: id }).then(res => {
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
            <TranslationTabs page="faq" />
            <h3 className="hedding">
                FAQ
            </h3>
            <div className="mb-3 d-flex justify-content-end">
                {methodModel.isTranslatePage() ? <></> : <button className="btn btn-primary" onClick={() => openModal()}>Add FAQ</button>}
            </div>

            <div className="table-responsive">

                <div className='c_ths border-bottom'>
                    <div className='question'>Question</div>
                    <div className='answer'>Answer</div>
                    <div className='action'></div>
                </div>
                {!loading && data && data.map((itm, i) => {
                    return <div className='c_tds border-bottom'
                        onDragStart={(e) => dragStart(e, i)}
                        onDragEnter={(e) => dragEnter(e, i)}
                        onDragEnd={drop}
                        key={i}
                        draggable
                    >
                        <div className=''>
                            <i className='fa fa-list'></i>
                        </div>
                        <div className='question text-truncate'>{itm.question}</div>
                        <div className='answer text-truncate'>{itm.answer}</div>
                        <div className='action'>
                            <a className="linkclass mx-2" onClick={() => openViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>|
                            <a className="linkclass mx-2" onClick={() => openModal(itm)} title="Edit"><i className="fas fa-pen"></i></a>
                            {methodModel.isTranslatePage() ? <></> : <>
                                |<a className="linkclass mx-2" onClick={() => deleteItem(itm.id)} title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                            </>}
                        </div>
                    </div>
                })}


                {/* <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">Question</th>
                            <th scope="col">Answer</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td><span className=' tuncketcls'>{itm.question}</span></td>
                                <td><span className="answere text-truncate">{itm.answer}</span></td>
                                <td className="nowrap">
                                    <a className="linkclass mx-2" onClick={() => openViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>|
                                    <a className="linkclass mx-2" onClick={() => openModal(itm)} title="Edit"><i className="fas fa-pen"></i></a>
                                    {methodModel.isTranslatePage() ? <></> : <>
                                        |<a className="linkclass mx-2" onClick={() => deleteItem(itm.id)} title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                    </>}

                                </td>
                            </tr>
                        })}
                    </tbody>
                </table> */}

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
            <AddEditFaq form={form} setform={setform} modalClosed={modalClosed} />
            <ViewFaq form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};


export default Faq;

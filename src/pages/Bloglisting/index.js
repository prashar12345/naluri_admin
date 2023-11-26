import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import methodModel from "../../methods/methods";
import AddEditBloglisting from "./AddEditBloglisting";
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import ViewBloglisting from './ViewBloglisting';
import datepipeModel from '../../models/datepipemodel'
import TranslationTabs from '../Translation/TranslationTabs';

const Bloglisting = (p) => {
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 5, search: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(true)
    const [form, setform] = useState({})
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
        ApiClient.get('blogs', filter).then(res => {
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
        setform({ title: '', image: '', description: '', createdAt: '', category: '' })
        if (itm) {
            let category = ''
            if (itm.category) category = itm.category.id
            setform({
                ...form, ...itm, category: category
            })
        }
        document.getElementById('openBloglistingModal').click()
    }

    const openViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById('openViewBlog').click()
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }


    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('soft/delete', { model: 'blogs', id: id }).then(res => {
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
            <TranslationTabs page="blogs" />
            <h3 className="hedding">
                Blogs
            </h3>
            <div className="mb-3 d-flex justify-content-end">
                {!methodModel.isTranslatePage() ? <button className="btn btn-primary" onClick={() => openModal()}>Add </button> : <></>}
            </div>

            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">title</th>
                            <th scope="col">Category</th>
                            <th scope="col">createdAt</th>
                            <th scope="col">image</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td><span className=' tuncketcls'>{itm.title}</span></td>
                                <td><span className=' tuncketcls'>{itm.category && itm.category.name}</span></td>
                                <td><span className=' tuncketcls'>{datepipeModel.datetime(itm.createdAt)}</span></td>
                                <td> <img src={methodModel.noImg(form && itm.image)} onClick={() => openViewModal(itm)} className="categoryImage" /></td>

                                <td className='text-nowrap'>
                                    <a className="linkclass mx-2" onClick={() => openViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>|
                                    <a className="linkclass mx-2" onClick={() => openModal(itm)} title="Edit"><i className="fas fa-pen"></i></a>
                                    {methodModel.isTranslatePage() ? <></> : <>
                                        |<a className="linkclass mx-2" onClick={() => deleteItem(itm.id)} title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
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



            {!loading && total > filters.count ? <div className="text-right mt-2">
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
            <AddEditBloglisting form={form} setform={setform} modalClosed={modalClosed} />
            <ViewBloglisting form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};







export default Bloglisting;

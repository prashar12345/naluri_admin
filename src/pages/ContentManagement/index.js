import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import AddEditContent from './AddEditContent';
import ViewContent from './ViewContent';
import TranslationTabs from '../Translation/TranslationTabs';

const ContentManagement = (p) => {
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
        }
    }, [searchState])

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('contents', filter).then(res => {
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
        setform({ title: '', slug: '', description: '', meta_title: '', meta_description: '', meta_keyword: '' })
        if (itm) {
            setform({
                ...form, ...itm, title: itm.title, slug: itm.slug, description: itm.description, meta_title: itm.meta_title, meta_description: itm.meta_description, meta_keyword: itm.meta_keyword,
            })
        }
        document.getElementById('openContentModal').click()
    }

    const openViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById("openViewContantModal").click()
    }




    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData()
    }

    return (
        <Layout>
            <TranslationTabs page="contentmanagment" />
            <h3 className="hedding">
                Content Management
            </h3>


            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">title</th>
                            {/* <th scope="col">slug</th> */}
                            <th scope="col">meta_description</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td><span className=' tuncketcls'>{itm.title}</span></td>
                                {/* <td><span className=' tuncketcls'>{itm.slug}</span></td> */}
                                <td><span className=' tuncketcls'>{itm.meta_description}</span></td>
                                <td className="nowrap">
                                    <a className="linkclass mx-2" onClick={() => openViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>|
                                    <a className="linkclass mx-2" onClick={() => openModal(itm)} title="Edit"><i className="fas fa-pen"></i></a>
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
            <AddEditContent form={form} setform={setform} modalClosed={modalClosed} />
            <ViewContent form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};







export default ContentManagement;

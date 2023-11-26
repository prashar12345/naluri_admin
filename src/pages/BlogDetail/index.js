import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import methodModel from "../../methods/methods";
import ViewBlogdetail from './ViewBlogdetail';
import { useParams } from 'react-router-dom';

const BlogDetail = (p) => {
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 5, search: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(true)
    const [form, setform] = useState({})
    let { id } = useParams();
    const searchState = useSelector((state) => state.search);

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])


    const getData = (p = {}) => {
        setLoader(true)
        let filter = { id }
        ApiClient.get('blog', filter).then(res => {
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



    const openViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById('openViewBlogdetail').click()
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }





    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData()
    }



    return (
        <Layout>
            <h3 className="hedding">
                Blog Detail
            </h3>
            {/* <div className="mb-3 d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => openModal()}>Add Detail</button>
            </div> */}

            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">title</th>
                            <th scope="col">description</th>
                            <th scope="col">createdAt</th>
                            <th scope="col">image</th>


                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td><span className=' tuncketcls'>{itm.title}</span></td>
                                <td><span className=' tuncketcls'>{itm.description}</span></td>
                                <td><span className=' tuncketcls'>{itm.createdAt}</span></td>
                                <td> <img src={methodModel.noImg(form && itm.image)} className="categoryImage" /></td>
                                <td>
                                    <a className="linkclass mx-2" onClick={() => openViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>|
                                    {/* <a className="linkclass mx-2" onClick={() => openModal(itm)} title="Edit"><i className="fas fa-pen"></i></a>|
                                    <a className="linkclass mx-2" onClick={() => deleteItem(itm.id)} title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></a> */}
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

            <ViewBlogdetail form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};







export default BlogDetail;

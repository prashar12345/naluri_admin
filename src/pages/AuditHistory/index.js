import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import { useHistory } from 'react-router';
import AuditViewModal from './View';
import datepipeModel from '../../models/datepipemodel';
import { Link } from 'react-router-dom';

const AuditHistory = (p) => {
    const history = useHistory()
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
        ApiClient.get("audit/trails", filter).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal()
            }

            setLoader(false)
        })
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const openAuditViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById('openAuditViewModal').click()
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
            <div className="Assessment mb-3 d-flex justify-content-between">
                <h3 className="hedding">
                    Audit History
                </h3>
            </div>

            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">Counsellor Name
                            </th>
                            <th scope="col">Updated Text
                            </th>
                            <th scope="col">Created At
                            </th>

                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>

                                <td>
                                    <span className="text-truncate td-text">{itm.counsellorId ? <Link to={'/profiledetail/' + itm.counsellorId.id}>{itm.counsellorId.fullName}</Link > : <></>}</span>
                                </td>
                                <td>
                                    <span className="text-truncate td-text">{itm.updatedText}</span>
                                </td>
                                <td>{datepipeModel.date(itm.createdAt)} | {datepipeModel.time(itm.createdAt)}</td>
                                <td>
                                    <a className="linkclass mx-2" onClick={() => openAuditViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>
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

            <AuditViewModal form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};
export default AuditHistory;

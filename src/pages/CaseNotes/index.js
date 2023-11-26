import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import loader from '../../methods/loader';
// import AuditViewModal from './View';
import datepipeModel from '../../models/datepipemodel';

const CaseNotes = (p) => {
    let user = useSelector(state => state.user)
    const [casenotes, setCaseNotes] = useState([])
    const searchState = useSelector((state) => state.search);
    const [cfilters, setCfilter] = useState({ page: 1, count: 10 })
    const [ctotal, setCTotal] = useState(0)

    useEffect(() => {
        if (user && user.loggedIn) {
            setCfilter({ ...cfilters, search: searchState.data })
            getCaseNotes()
        }
    }, [searchState])

    const editAccess = (p) => {
        loader(true)
        ApiClient.put("case/note", p).then(res => {
            if (res.success) {
                getCaseNotes()
            }

            loader(false)
        })

    }

    const getCaseNotes = (p = {}) => {

        let filter = {
            ...cfilters,
            ...p
        }

        loader(true)
        ApiClient.get('case/notes', filter).then(res => {
            if (res.success) {
                setCaseNotes(res.data)
                setCTotal(res.total)
                loader(false)
            }
        })
    }


    const pageChange = (e) => {
        setCfilter({ ...cfilters, page: e })
        getCaseNotes({ page: e })
    }

    return (
        <Layout>
            <h3 className="Profilehedding mt-3">
                Case Notes
            </h3>


            <div className="bgtable ">
                <div className="table-responsive">
                    <table className="table table-striped ">
                        <thead className="theadclss">
                            <tr className="tblclas">
                                <th scope="col" >Date & Time</th>
                                <th scope="col">Counsellor</th>
                                <th scope="col">Title</th>
                                {/* <th scope="col">Body</th>
                                        <th scope="col"></th> */}
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {casenotes && casenotes.map(itm => {
                                return <tr key={itm.id}>
                                    <th scope="row">{datepipeModel.datetime(itm.createdAt)}</th>
                                    <td>{itm.counsellorId.fullName}</td>
                                    <td>{itm.note}</td>
                                    {/* <td>Burnout & Stress</td>
                                            <td>Work has been busy...</td> */}
                                    <td>
                                        {itm.counsellorEditAccess ? 'true' : 'false'}
                                        <div className="button-cover">
                                            <div className="button r" id="button-1">
                                                <input type="checkbox" className={itm.counsellorEditAccess ? 'checkbox checked' : 'checkbox'} value={itm.counsellorEditAccess} checked={itm.counsellorEditAccess} onChange={e => editAccess({ counsellorEditAccess: e.target.checked, id: itm.id })} />
                                                <div className="knobs"></div>
                                                <div className="layer"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                {ctotal > cfilters.count ? <div>
                    {/* <Pagination
                        activePage={cfilters.page}
                        itemsCountPerPage={cfilters.count}
                        totalItemsCount={ctotal}
                        pageRangeDisplayed={5}
                        onChange={e => pageChange(e)}
                    /> */}
                    <Pagination
                        currentPage={cfilters.page}
                        totalSize={ctotal}
                        sizePerPage={cfilters.count}
                        changeCurrentPage={pageChange}
                    />
                </div> : <></>}
            </div>
        </Layout>
    );
};
export default CaseNotes;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import AddEditkeyModal from './AddEditkey';
// import Pagination from 'react-js-pagination';
import Pagination from "react-pagination-js";
import methodModel from '../../methods/methods';
import modalModel from '../../models/modal.model';
import AddEditOptions from './AddEditOptions';
import TranslationTabs from './TranslationTabs';

const QuestionsTranslation = (p) => {
    let user = useSelector(state => state.user)
    const [data, setData] = useState([])
    const [question, setquestion] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(false)
    const [addkey, setaddkey] = useState({ key: '', translation: '' })
    const [keys, setKeys] = useState([])
    const [filters, setFilters] = useState({ page: 1, count: 100, language: 'bm' })
    const [qfilters, setQFilters] = useState({ page: 1, count: 10, type: '' })
    const [option, setOption] = useState({})
    const [type, setType] = useState()

    useEffect(() => {
        if (user && user.loggedIn) {
            getData()
            getquestion()
            getTypes()
        }
    }, [])


    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('languages', filter).then(res => {
            if (res.success) {
                setData(res.data)
                let resKeys
                if (res.data) {
                    res.data.map(itm => {
                        if (itm.value) {
                            resKeys = { ...resKeys, ...itm.value }
                        }
                    })
                }

                let objArr = []
                if (resKeys) objArr = Object.keys(resKeys)
                setKeys(objArr)
            }
            setLoader(false)
        })
    }


    const getquestion = (p = {}) => {
        setLoader(true)
        let filter = { ...qfilters, ...p }
        ApiClient.get('questions', filter).then(res => {
            if (res.success) {
                setquestion(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }

    const clear = () => {
        setKeys([])
        let filter = {
            search: '',
            page: 1,
        }
        setFilters({ ...filters, ...filter })
        getData(filter)
    }

    const modalClosed = (p) => {
        if (p == 'key') {
            getData()
        } else {
            clear()
        }
    }

    const languageChange = (id) => {
        setFilters({ ...filters, language: id })
    }

    const pageChange = (e) => {
        setQFilters({ ...qfilters, page: e })
        getquestion({ page: e })
    }

    const geyKeyValue = (itm) => {
        let value = itm.question
        if (filters.language) {
            let ext = methodModel.find(data, filters.language, 'code')
            if (ext && ext.value && ext.value[`question_${itm.id}`]) {
                value = ext.value[`question_${itm.id}`]
            }
        }
        return value
    }

    const openKeyModal = (itm) => {
        let value = geyKeyValue(itm)
        let ext = methodModel.find(data, filters.language, 'code')
        setaddkey({ id: ext.id, value: ext.value, key: `question_${itm.id}`, translation: value, type: 'question' })
        modalModel.open('keyModal')
    }

    const openOptionModal = (itm) => {
        let value = geyKeyValue(itm)
        let ext = methodModel.find(data, filters.language, 'code')
        setOption({ ...itm, language: ext })
        modalModel.open('optionModal')
    }

    const ChangeType = (e) => {
        setQFilters({ ...qfilters, type: e, page: 1, })
        getquestion({ type: e, page: 1 })
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


    return (
        <Layout>

            <TranslationTabs page="questions" />
            <div className="Assessment mb-3 d-flex justify-content-between">
                <h3 className="hedding">
                    Questions
                </h3>

                <div>
                    <div className="dropdown addDropdown mr-3">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {qfilters.type ? methodModel.find(type, qfilters.type, 'id').name : 'Assessment Type'}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className={qfilters.type == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeType('')}>All</a>
                            {type && type.map(itm => {
                                return <a className={qfilters.type == itm.id ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeType(itm.id)} key={itm.id}>{itm.name
                                }</a>
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table mb-0 trnsalationTable">
                    <thead className="theadclss thead">
                        <tr className="tblclas">
                            <th scope="col">Questions</th>

                            <th scope="col">
                                <select name="cars" id="cars" className='selectclss form-control' value={filters.language} onChange={e => languageChange(e.target.value)}>
                                    <option className={`dropdown-item active `} value="">Select Language</option>
                                    {data && data.map(itm => {
                                        if (itm.code != 'en')
                                            return <option value={itm.code} key={itm.id}>{itm.name}</option>
                                    })}
                                </select>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {!loading && question && question.map((itm, i) => {
                            return <tr key={i}>
                                <td>{itm.question}</td>
                                <td>
                                    <span className="text-truncate td-label">{geyKeyValue(itm)}</span>
                                    {filters.language ? <>
                                        <a title="Edit Question" className="linkclass mx-2" onClick={() => openKeyModal(itm)}><i className="fas fa-pen editicon"></i></a>
                                        <a title="Edit Option" className="linkclass mx-2" onClick={() => openOptionModal(itm)}><i className="fa fa-ellipsis-h editicon"></i></a>
                                    </> : <></>}

                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {loading ? <div className="text-center py-4">
                    <img src="/assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}

                {!loading && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

                {!loading && total > qfilters.count ? <div>
                    <Pagination
                        currentPage={qfilters.page}
                        totalSize={total}
                        sizePerPage={qfilters.count}
                        changeCurrentPage={pageChange}
                    />
                </div> : <></>}
            </div>
            <AddEditkeyModal form={addkey} setform={setaddkey} modalClosed={modalClosed} />
            <AddEditOptions form={option} setform={setOption} modalClosed={modalClosed} />
        </Layout>
    );
};

export default QuestionsTranslation;

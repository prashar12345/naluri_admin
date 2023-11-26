import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import AddEditkeyModal from './AddEditkey';
import AddLanguage from './AddLanguage';
import modalModel from '../../models/modal.model';
import translationModel from '../../models/translation.model';
import TranslationTabs from './TranslationTabs';

const Translation = (p) => {
    let user = useSelector(state => state.user)
    const [data, setData] = useState([])
    const [loading, setLoader] = useState(false)
    const [addkey, setaddkey] = useState({ key: '', translation: '' })
    const [tab, setTab] = useState('')
    const [form, setform] = useState({})
    const [keys, setKeys] = useState([])
    const [filters, setFilters] = useState({ page: 1, count: 100, language: 'bm', category: '', pannel: '' })
    const searchState = useSelector((state) => state.search);

    useEffect(() => {
        if (user && user.loggedIn) {
            getData()
            setKeys(translationModel.keys)
        }
    }, [])

    useEffect(() => {
        if (searchState) search(searchState.data)
    }, [searchState])

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('languages', filter).then(res => {
            if (res.success) {
                setData(res.data)
            }
            setLoader(false)
        })
    }

    const clear = () => {
        let filter = {
            search: '',
            page: 1,
            language: ''
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

    const openKeyModal = (key, itm) => {
        let value = geyKeyValue(key, itm.code)
        let edit = false
        if (key) edit = true
        setaddkey({ id: itm.id, value: itm.value, key: key, translation: value, edit })
        modalModel.open('keyModal')
    }

    const languageChange = (id) => {
        setFilters({ ...filters, language: id })
    }

    const geyKeyValue = (key, code) => {
        let ext = data.find(itm => itm.code == code)
        let value = ''
        if (ext && ext.value && ext.value[key]) value = ext.value[key]
        if (!value) {
            let ext = translationModel.keys.find(itm => itm.key == key)
            value = ext.english
        }

        return value
    }


    const pannelChange = (pannel) => {
        setFilters({ ...filters, pannel: pannel })
        let arr = translationModel.keys
        if (pannel) {
            let ext = []
            ext = arr.filter(itm => !itm.pannel || (itm.pannel && itm.pannel.includes(pannel)))
            setKeys(ext)
        } else {
            setKeys(arr)
        }
    }

    const catChange = (cat) => {
        setFilters({ ...filters, category: cat })
        let arr = translationModel.keys
        if (cat) {
            let ext = []
            if (cat == 'common') {
                ext = arr.filter(itm => !itm.cat)
            } else {
                ext = arr.filter(itm => itm.cat == cat)
            }

            setKeys(ext)
        } else {
            setKeys(arr)
        }
    }

    const search = (p = '') => {
        let arr = translationModel.keys
        let list = arr
        if (p) {
            list = []
            arr.map(itm => {
                if (itm.english.toLocaleLowerCase().search(p.toLocaleLowerCase()) > -1 ||
                    itm.key.toLocaleLowerCase().search(p.toLocaleLowerCase()) > -1 ||
                    geyKeyValue(itm.key, 'bm').toLocaleLowerCase().search(p.toLocaleLowerCase()) > -1
                ) {
                    list.push(itm)
                }
            })
        }

        setKeys(list)
    }

    const addLanguage = () => {
        setform({ name: '', code: '' })
        modalModel.open('languageModal')
    }

    return (
        <Layout>
            <TranslationTabs page="translation" />


            <div className='d-flex justify-content-between flex-wrap mb-3'>
                {/* tabs */}
                <h3 className='hedding'>Update Language key</h3>
                {/* end tabs */}
                <div className='right-btn'>
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.pannel ? translationModel.pannelName(filters.pannel) : 'Pannel'}
                        </button>
                        <div className="dropdown-menu">
                            <a className={`dropdown-item ${filters.pannel == '' ? 'active' : ''}`} href="#" onClick={e => pannelChange('')}>All</a>
                            {translationModel.pannel.map(itm => {
                                return <a className={`dropdown-item ${filters.pannel == itm.id ? 'active' : ''}`} href="#" onClick={e => pannelChange(itm.id)} key={itm.id}>{itm.name}</a>
                            })}
                        </div>
                    </div>
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.category ? translationModel.catName(filters.category) : 'Category'}
                        </button>
                        <div className="dropdown-menu">
                            <a className={`dropdown-item ${filters.category == '' ? 'active' : ''}`} href="#" onClick={e => catChange('')}>All</a>
                            <a className={`dropdown-item ${filters.category == 'common' ? 'active' : ''}`} href="#" onClick={e => catChange('common')}>Common</a>
                            {translationModel.category.map(itm => {
                                return <a className={`dropdown-item ${filters.category == itm.id ? 'active' : ''}`} href="#" onClick={e => catChange(itm.id)} key={itm.id}>{itm.name}</a>
                            })}
                        </div>
                    </div>
                    <button className='btn btn-primary' onClick={e => addLanguage()}>Add New Language</button>
                </div>
            </div>

            <div className="table-responsive over-flow">
                <table className="table mb-0 trnsalationTable">
                    <thead className="theadclss thead">
                        <tr className="tblclas">
                            <th scope="col">Key</th>
                            {data && data.map(itm => {
                                if (itm.code == 'en')
                                    return <th scope="col" key={itm.id}>{itm.name}</th>
                            })}
                            <th scope="col">
                                <select name="cars" id="cars" className='selectclss form-control' value={filters.language} onChange={e => languageChange(e.target.value)}>
                                    <option className={`dropdown-item active `}>Select Language</option>
                                    {data && data.map(itm => {
                                        if (itm.code != 'en')
                                            return <option value={itm.code} key={itm.id}>{itm.name}</option>
                                    })}
                                </select>
                            </th>
                        </tr>
                    </thead>


                    <tbody>
                        {!loading && keys.map((kitm, i) => {
                            return <tr key={i}>
                                <td>{kitm.key}</td>
                                {data && data.map(itm => {
                                    if (itm.code == 'en')
                                        return <td key={itm.id}>
                                            <span className="text-truncate td-label">{geyKeyValue(kitm.key, itm.code)}</span>
                                            <a className="linkclass mx-2" onClick={() => openKeyModal(kitm.key, itm)}><i title="Edit" className="fas fa-pen editicon"></i></a>
                                        </td>
                                })}
                                {data && data.map(itm => {
                                    if (itm.code == filters.language)
                                        return <td key={itm.id}>
                                            <span className="text-truncate td-label">{geyKeyValue(kitm.key, itm.code)}</span>
                                            <a className="linkclass mx-2" onClick={() => openKeyModal(kitm.key, itm)}><i title="Edit" className="fas fa-pen editicon"></i></a>
                                        </td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>

                {loading ? <div className="text-center py-4">
                    <img src="/assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}

            </div>
            <AddEditkeyModal form={addkey} setform={setaddkey} modalClosed={modalClosed} />
            <AddLanguage form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};

export default Translation;

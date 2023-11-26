import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from '../../methods/methods';

const AddEdit = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [types, setTypes] = useState([])
    const [languages, setLanguages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            name: form.name,
            type: form.type,
            ratio: form.ratio,
        }

        if (form.translate) value.translate = form.translate

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi('category', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeEditModal').click()
                modalClosed()
            }
            loader(false)
        })
    }

    const translate = (value, lng) => {
        setform({ ...form, translate: { ...form.translate, [lng.code]: value } })
    }

    const translateRatio = (i, value, lng) => {
        let ratio = form.ratio
        ratio[i]['translate'] = { ...ratio[i]['translate'], [lng.code]: value }
        setform({ ...form, ratio })
    }



    const getLaguages = (p = {}) => {
        // setLoader(true)
        let filter = { page: 1, count: 100, ...p }
        ApiClient.get('languages', filter).then(res => {
            if (res.success) {
                setLanguages(res.data)
            }
            // setLoader(false)
        })
    }

    const getTypes = () => {
        ApiClient.get('category/types', { page: 1, count: 100 }).then(res => {
            if (res.success) {
                setTypes(res.data)
            }
        })
    }

    const changeRatio = (i, key, value) => {
        let ratio = form.ratio
        ratio[i][key] = value
        setform({ ...form, ratio })
    }

    const deleteRatio = (index) => {
        let ratio = form.ratio
        ratio = ratio.filter((itm, i) => i != index)
        setform({ ...form, ratio })
    }

    const addRatio = () => {
        let ratio = form.ratio
        ratio.push({ min: '', max: '', level_risk: '' })
        setform({ ...form, ratio })
    }


    useEffect(() => {
        if (user && user.loggedIn) {
            getTypes()
            getLaguages()
        }
    }, [])

    return <>
        <a id="openEditModal" data-toggle="modal" data-target="#editModal"></a>
        <div className="modal fade" id="editModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Category</h5>
                        <button type="button" id="closeEditModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">

                                {methodModel.isTranslatePage() ? <>
                                    <div className="col-md-12 mb-3">
                                        <label>Translate Name</label>
                                        <div className="form-row">
                                            {languages && languages.map(itm => {
                                                return <div className="col-md-6 mb-3">
                                                    <input type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.translate ? form.translate[itm.code] ? form.translate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm)} />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="col-md-6 mb-3">
                                        <label>Name<span className='star'>*</span></label>
                                        <input type="text" className="form-control textcpitlize" value={form.name ? form.name : ''} onChange={e => setform({ ...form, name: e.target.value })} required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Assessment Type<span className='star'>*</span></label>
                                        <select className="form-control textcpitlize" value={form.type} onChange={e => setform({ ...form, type: e.target.value })} disabled required>
                                            <option value="">Select Option</option>
                                            {types && types.map(itm => {
                                                return <option key={itm.id} value={itm.id}>{itm.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </>}


                                <div className="col-md-12 mb-3">
                                    <label>Ratio<span className='star'>*</span></label>
                                    <div className='form-row'>
                                        {form && form.ratio && form.ratio.map((itm, i) => {
                                            return <div className='col-md-6 mb-3' key={i}>
                                                <div className='form-row mx-0 shadow p-2'>
                                                    {form.ratio.length > 3 && !methodModel.isTranslatePage() ? <div className="col-md-12 mb-3 text-right">
                                                        <i className="fa fa-times deleteOption" onClick={() => deleteRatio(i)} />
                                                    </div> : <></>}

                                                    <div className='col-md-12 mb-3'>
                                                        <input type="text" disabled={methodModel.isTranslatePage()} value={itm.level_risk} onChange={e => changeRatio(i, 'level_risk', e.target.value)} placeholder='Risk Level*' className='form-control' required />
                                                    </div>

                                                    {languages && methodModel.isTranslatePage() && languages.map(lng => {
                                                        return <div className='col-md-12 mb-3'>
                                                            <input type="text" value={itm.translate ? itm.translate[lng.code] ? itm.translate[lng.code] : '' : ''} onChange={e => translateRatio(i, e.target.value, lng)} placeholder={lng.name} className='form-control' />
                                                        </div>
                                                    })}

                                                    {methodModel.isTranslatePage() ? <></> : <>
                                                        <div className='col-md-6 mb-3'>
                                                            <input type="text" value={itm.min} maxLength={5} onChange={e => changeRatio(i, 'min', methodModel.isNumber(e))} placeholder='Min*' className='form-control' required />
                                                        </div>
                                                        <div className='col-md-6 mb-3'>
                                                            <input type="text" value={itm.max} maxLength={5} onChange={e => changeRatio(i, 'max', methodModel.isNumber(e))} placeholder='Max*' className='form-control' required />
                                                        </div>
                                                    </>}
                                                </div>
                                            </div>
                                        })}
                                    </div>

                                    {form && form.ratio && form.ratio.length < 5 && !methodModel.isTranslatePage() ? <div className="text-right">
                                        <button className="btn btn-primary" type="button" onClick={addRatio}>Add Ratio</button>
                                    </div> : <></>}


                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">{form && form.id ? 'Update' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddEdit
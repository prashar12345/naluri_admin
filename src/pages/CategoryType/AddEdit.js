import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from '../../methods/methods';

const AddEdit = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [languages, setLanguages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            name: form.name,
            description: form.description
        }

        if (form.translate) value.translate = form.translate
        if (form.descriptionTranslation) value.descriptionTranslation = form.descriptionTranslation

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi('category/type', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeEditModal').click()
                modalClosed()
            }
            loader(false)
        })
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


    useEffect(() => {
        if (user && user.loggedIn) {
            getLaguages()
        }
    }, [])


    const translate = (value, lng, key = 'translate') => {
        setform({ ...form, [key]: { ...form[key], [lng.code]: value } })
    }

    return <>
        <a id="openEditModal" data-toggle="modal" data-target="#editModal"></a>
        <div className="modal fade" id="editModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Assessment Type</h5>
                        <button type="button" id="closeEditModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                {methodModel.isTranslatePage() ? <>
                                    <div className="col-md-12">
                                        <label>Name Translation<span className='star'>*</span></label>
                                        <div className="form-row">
                                            {languages && languages.map(itm => {
                                                return <div className="col-md-6 mb-3" key={itm.id}>
                                                    <input type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.translate ? form.translate[itm.code] ? form.translate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm)} required />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Description Translation <span className='star'>*</span></label>
                                        <div className="form-row">
                                            {languages && languages.map(itm => {
                                                return <div className="col-md-12 mb-3" key={itm.id}>
                                                    <textarea type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.descriptionTranslation ? form.descriptionTranslation[itm.code] ? form.descriptionTranslation[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'descriptionTranslation')} required />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="col-md-12 mb-3">
                                        <label>Name<span className='star'>*</span></label>
                                        <input type="text" className="form-control textcpitlize" value={form.name ? form.name : ''} onChange={e => setform({ ...form, name: e.target.value })} required />
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <label>Description<span className='star'>*</span></label>
                                        <textarea className="form-control textcpitlize" value={form.description ? form.description : ''} onChange={e => setform({ ...form, description: e.target.value })} required />
                                    </div>

                                </>}


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
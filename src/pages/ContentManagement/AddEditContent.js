import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Editor } from '@tinymce/tinymce-react';

const AddEditContent = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [type, setType] = useState()
    const [languages, setLanguages] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            title: form.title,
            slug: form.slug,
            description: form.tiny_description ? form.tiny_description : form.description,
            meta_title: form.meta_title,
            meta_description: form.meta_description,
            meta_keyword: form.meta_keyword,
            descriptionTranslate: form.descriptionTranslate
        }
        if (form.titleTranslate) value.titleTranslate = form.titleTranslate

        languages.map(itm => {
            value['descriptionTranslate'] = { ...value['descriptionTranslate'], [itm.code]: itm['descriptionTranslate'] }
        })

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }



        loader(true)
        ApiClient.allApi('content', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closecontantModal').click()
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
            // getCategories()
            getLaguages()
        }
    }, [])


    const translate = (value, lng, key = 'titleTranslate') => {
        setform({ ...form, [key]: { ...form[key], [lng.code]: value } })
    }

    const langTranslate = (value, lng, key = 'titleTranslate', i) => {
        languages[i] = { ...languages[i], [key]: value }
        setLanguages([...languages])
    }

    return <>
        <a id="openContentModal" data-toggle="modal" data-target="#contentModal"></a>
        <div className="modal fade" id="contentModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Content</h5>
                        <button type="button" id="closecontantModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-12 mb-3">
                                    <label>title <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" disabled={methodModel.isTranslatePage()} value={form.title ? form.title : ''} onChange={e => setform({ ...form, title: e.target.value })} required />
                                    {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                        return <div className="mt-3" key={itm.id}>
                                            <input type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.titleTranslate ? form.titleTranslate[itm.code] ? form.titleTranslate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'titleTranslate')} />
                                        </div>
                                    })}
                                </div>


                                <div className="col-md-12 mb-3">
                                    <label>description <span className="text-danger">*</span></label>

                                    <Editor textareaName='content' initialValue={form.description ? form.description : ''} disabled={methodModel.isTranslatePage()} className='tuncketcls'
                                        onEditorChange={(newValue, editor) => {
                                            setform({ ...form, tiny_description: newValue })
                                        }}
                                        required
                                    />

                                    {languages && methodModel.isTranslatePage() && languages.map((itm, i) => {
                                        return <div className="mt-3" key={itm.id}>
                                            <label>{itm.name}</label>
                                            <Editor textareaName='content' initialValue={form.descriptionTranslate ? form.descriptionTranslate[itm.code] ? form.descriptionTranslate[itm.code] : '' : ''} className='tuncketcls'
                                                onEditorChange={(newValue, editor) => {
                                                    langTranslate(newValue, itm, 'descriptionTranslate', i)
                                                }}
                                            />
                                        </div>
                                    })}
                                </div>

                                {!methodModel.isTranslatePage() ? <>
                                    <div className="col-md-6 mb-3">
                                        <label>meta_title <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" value={form.meta_title ? form.meta_title : ''} onChange={e => setform({ ...form, meta_title: e.target.value })} required />

                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>meta_description <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" value={form.meta_description ? form.meta_description : ''} onChange={e => setform({ ...form, meta_description: e.target.value })} required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>meta_keyword <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" value={form.meta_keyword ? form.meta_keyword : ''} onChange={e => setform({ ...form, meta_keyword: e.target.value })} required />
                                    </div>
                                </> : <></>}
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

export default AddEditContent
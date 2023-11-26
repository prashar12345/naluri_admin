import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import methodModel from "../../methods/methods";
import { Editor } from '@tinymce/tinymce-react';

const AddEditBloglisting = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [blog, setblog] = useState([])
    const [categories, setCategories] = useState([])
    const [loader, setLoder] = useState(false)
    const [languages, setLanguages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        let value = {
            id: form.id,
            title: form.title,
            description: form.tiny_description ? form.tiny_description : form.description,
            descTranslate: form.descTranslate,
            titleTranslate: form.titleTranslate,
            image: form.image,
            category: form.category,
            createdAt: form.createdAt,
        }

        languages.map(itm => {
            value['descTranslate'] = { ...value['descTranslate'], [itm.code]: itm['descTranslate'] }
        })

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }


        setLoder(true)
        ApiClient.allApi('blog', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closebloglistingModal').click()
                modalClosed()
            }
            setLoder(false)
        })
    }
    const uploadImage = (e) => {
        setform({ ...form, baseImg: e.target.value })
        let files = e.target.files
        let file = files.item(0)
        setLoder(true)
        ApiClient.postFormData('image/upload?modelName=blogs', { file: file, modelName: 'blogs' }).then(res => {
            if (res.success) {
                let image = res.data.fullpath
                setform({ ...form, image: image, description: '', baseImg: '', category: '' })
            } else {
                setform({ ...form, baseImg: '' })
            }
            setLoder(false)
        })
    }

    const getblog = () => {
        ApiClient.get('blogs', { page: 1, count: 100 }).then(res => {
            if (res.success) {
                setblog(res.data)
            }
        })
    }

    const getCategories = () => {
        ApiClient.get('blog/categories', { page: 1, count: 100 }).then(res => {
            if (res.success) {
                setCategories(res.data)
            }
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
            getblog()
            getCategories()
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
        <a id="openBloglistingModal" data-toggle="modal" data-target="#bloglistingModal"></a>
        <div className="modal fade" id="bloglistingModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Blog</h5>
                        <button type="button" id="closebloglistingModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-6 mb-3">
                                    <label className=''>title <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control text-capitalize" disabled={methodModel.isTranslatePage()} value={form.title ? form.title : ''} onChange={e => setform({ ...form, title: e.target.value })} required />
                                    {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                        return <div className="mt-3" key={itm.id}>
                                            <input type="text" className="form-control text-capitalize" placeholder={itm.name} value={form.titleTranslate ? form.titleTranslate[itm.code] ? form.titleTranslate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'titleTranslate')} />
                                        </div>
                                    })}
                                </div>




                                <div className="col-md-6  mb-3">
                                    <label className='lablefontcls'>Upload image <span className="text-danger">*</span></label><br></br>
                                    <div className='maininutcls'>

                                        {/* <i className="fa fa-times imagcros" aria-hidden="true" onClick={e => setform({ ...form, image: "" })}></i> */}
                                        <label className="profileImageLabel">
                                            <img src={methodModel.noImg(form && form.image)} className="blogImage" />
                                            <input
                                                id="bannerImage"
                                                type="file"
                                                className="d-none"
                                                accept="image/*"
                                                disabled={methodModel.isTranslatePage()}
                                                value={form.baseImg ? form.baseImg : ''}
                                                onChange={(e) => { uploadImage(e); }}
                                            />
                                            {methodModel.isTranslatePage() ? <></> : <i className="fa fa-edit" title='Upload Image'></i>}
                                        </label>
                                    </div>

                                    {loader && !methodModel.isTranslatePage() ? <div className="text-success mt-2">Uploading...</div> : <></>}

                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Category <span className="text-danger">*</span></label>
                                    <select className="form-control" disabled={methodModel.isTranslatePage()} value={form.category ? form.category : ''} onChange={e => setform({ ...form, category: e.target.value })} required>
                                        <option value="">Add Category</option>
                                        {categories && categories.map(itm => {
                                            return <option key={itm.id} value={itm.id}>{itm.name} ({itm.name})</option>
                                        })}

                                    </select>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>description <span className="text-danger">*</span></label>
                                    {/* <input type="text" className="form-control" value={form.description ? form.description : ''} onChange={e => setform({ ...form, description: e.target.value })} required /> */}

                                    <Editor textareaName='content' disabled={methodModel.isTranslatePage()} initialValue={form.description ? form.description : ''} className='tuncketcls'
                                        onEditorChange={(newValue, editor) => {
                                            setform({ ...form, tiny_description: newValue })
                                        }}
                                        required />


                                    {languages && methodModel.isTranslatePage() && languages.map((itm, i) => {
                                        return <div className="mt-3" key={itm.id}>
                                            <label>{itm.name}</label>
                                            <Editor textareaName='content' initialValue={form.descTranslate ? form.descTranslate[itm.code] ? form.descTranslate[itm.code] : '' : ''} className='tuncketcls'
                                                onEditorChange={(newValue, editor) => {
                                                    langTranslate(newValue, itm, 'descTranslate', i)
                                                }}
                                            />
                                        </div>
                                    })}
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={loader}>{loader ? 'Loading...' : form && form.id ? 'Update' : 'Add'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddEditBloglisting
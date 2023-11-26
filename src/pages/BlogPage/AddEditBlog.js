import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import methodModel from "../../methods/methods";

const AddEditBlog = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [loader, setLoader] = useState(false)
    const [languages, setLanguages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            name: form.name,
            nameTranslate: form.nameTranslate,
            image: form.image,
        }

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }


        setLoader(true)
        ApiClient.allApi('blog/category', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeblogModal').click()
                modalClosed()
            }
            setLoader(false)
        })
    }
    const uploadImage = (e) => {
        setform({ ...form, baseImg: e.target.value })
        let files = e.target.files
        let file = files.item(0)
        setLoader(true)
        ApiClient.postFormData('image/upload?modelName=blogs', { file: file, modelName: 'blogs' }).then(res => {
            if (res.success) {
                let image = res.data.fullpath
                setform({ ...form, image: image, baseImg: '' })
            } else {
                setform({ ...form, baseImg: '' })
            }
            setLoader(false)
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
        <a id="openBlogModal" data-toggle="modal" data-target="#blogModal"></a>
        <div className="modal fade" id="blogModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Category</h5>
                        <button type="button" id="closeblogModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-12 mb-3">
                                    <label className=''>name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" disabled={methodModel.isTranslatePage()} value={form.name ? form.name : ''} onChange={e => setform({ ...form, name: e.target.value })} required />
                                    {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                        return <div className="mt-3" key={itm.id}>
                                            <input type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.nameTranslate ? form.nameTranslate[itm.code] ? form.nameTranslate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'nameTranslate')} required />
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
                                            {!methodModel.isTranslatePage() ? <i className="fa fa-edit" title='Upload Image'></i> : <></>}

                                        </label>
                                    </div>
                                    {loader && !methodModel.isTranslatePage() ? <div className="text-success mt-2">Uploading...</div> : <></>}
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={loader}>{loader ? 'Loading...' : form && form.id ? 'Update' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddEditBlog
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link } from 'react-router-dom';

const AddEditBlogdetail = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [blog, setblog] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            title: form.title,
            description: form.description,
            image: form.image,
            createdAt: form.createdAt,
        }

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }


        loader(true)
        ApiClient.allApi('blog', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeblogdetailModal').click()
                modalClosed()
            }
            loader(false)
        })
    }
    const uploadImage = (e) => {
        setform({ ...form, baseImg: e.target.value })
        let files = e.target.files
        let file = files.item(0)
        loader(true)
        ApiClient.postFormData('image/upload?modelName=blogs', { file: file, modelName: 'blogs' }).then(res => {
            if (res.success) {
                let image = res.data.fullpath
                setform({ ...form, image: image, baseImg: '' })
            } else {
                setform({ ...form, baseImg: '' })
            }
            loader(false)
        })
    }

    const getblog = () => {
        ApiClient.get('blog', { page: 1, count: 100 }).then(res => {
            if (res.success) {
                setblog(res.data)
            }
        })
    }

    useEffect(() => {
        if (user && user.loggedIn) {

            getblog()
        }
    }, [])

    return <>
        <a id="openBlogdetailModal" data-toggle="modal" data-target="#blogdetailModal"></a>
        <div className="modal fade" id="blogdetailModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Detail</h5>
                        <button type="button" id="closeblogdetailModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-6 mb-3">
                                    <label className=''>title <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value={form.title ? form.title : ''} onChange={e => setform({ ...form, title: e.target.value })} required />
                                </div>




                                <div className="col-md-6  mb-3">
                                    <label className='lablefontcls'>Upload image <span className="text-danger">*</span></label><br></br>
                                    <div className='maininutcls'>

                                        <i className="fa fa-times imagcros" aria-hidden="true" onClick={e => setform({ ...form, image: "" })}></i>
                                        <label className="profileImageLabel">
                                            <img src={methodModel.noImg(form && form.image)} className="blogImage" />
                                            <input
                                                id="bannerImage"
                                                type="file"
                                                className="d-none"
                                                accept="image/*"
                                                value={form.baseImg ? form.baseImg : ''}
                                                onChange={(e) => { uploadImage(e); }}
                                            />
                                            <i className="fa fa-edit" title='Upload Image'></i>
                                        </label>
                                    </div>
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

export default AddEditBlogdetail
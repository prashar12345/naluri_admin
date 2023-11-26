import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";

const AddLanguage = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [types, setTypes] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            name: form.name,
            code: form.code
        }
        let method = 'post'

        loader(true)
        ApiClient.allApi('language', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeEditModal').click()
                modalClosed()
            }
            loader(false)
        })
    }



    return <>
        <div className="modal fade" id="languageModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Language</h5>
                        <button type="button" id="closeEditModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className='form-row' >
                                <div className="col-md-6 mb-3">
                                    <label>Name<span className='star'>*</span></label>
                                    <input type="text" className="form-control" value={form.name ? form.name : ''} onChange={e => setform({ ...form, name: e.target.value })} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Code<span className='star'>*</span></label>
                                    <input type="text" className="form-control" value={form.code ? form.code : ''} onChange={e => setform({ ...form, code: e.target.value })} required />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" >Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddLanguage
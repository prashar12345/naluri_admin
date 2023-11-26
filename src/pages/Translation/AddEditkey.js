
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";

const AddEditkeyModal = ({ form, setform, modalClosed }) => {

    const user = useSelector(state => state.user)
    const handleSubmit = (e) => {
        e.preventDefault()

        let key = form.key
        let values = { ...form.value, [key]: form.translation }

        let value = {
            id: form.id,
            value: values
        }


        let method = 'put'
        loader(true)
        ApiClient.allApi('language', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closekeyModal').click()
                modalClosed('key')
            }
            loader(false)
        })
    }

    return <>
        <a id="openKeyModal" data-toggle="modal" data-target="#keyModal"></a>
        <div className="modal fade" id="keyModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Key</h5>
                        <button type="button" id="closekeyModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className="lablecls">Key</label>
                                    <input className="form-control" type="text" disabled value={form && form.key} onChange={e => setform({ ...form, key: e.target.value })} required />
                                </div>
                                <div className="col-md-12">
                                    <label className="lablecls">Translation</label>
                                    <textarea className="form-control" value={form && form.translation} onChange={e => setform({ ...form, translation: e.target.value })}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    </>
}

export default AddEditkeyModal
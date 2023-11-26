import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from '../../methods/api/apiClient';
import methodModel from '../../methods/methods';


const AddEdit = ({ form, setForm, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [loader, setLoader] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            clinicId: user.id,
            hours: form.hours
        }
        let method = 'post'
        if (value.id) {
            // method = 'put'
        } else {
            delete value.id
        }


        setLoader(true)
        ApiClient.allApi('add/update/remindertime', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeEditModal').click()
                modalClosed()
            }
            setLoader(false)
        })
    }


    useEffect(() => {
        if (user && user.loggedIn) {
        }
    }, [])

    return <>
        <a id="openEditModal" data-toggle="modal" data-target="#editModal"></a>
        <div className="modal fade" id="editModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Reminder</h5>
                        <button type="button" id="closeEditModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-12 mb-3">
                                    <label className="lableclss">Hours</label>

                                    <input
                                        type="number"
                                        className="form-control mt-2"
                                        value={form && form.hours}
                                        maxLength={2}
                                        onChange={e => { setForm({ ...form, hours: methodModel.isNumber(e) }) }}
                                        required
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={loader}>{loader ? 'Loading...' : <>{form && form.id ? 'Update' : 'Create'}</>}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddEdit
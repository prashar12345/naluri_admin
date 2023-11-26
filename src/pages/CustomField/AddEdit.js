import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";

const AddEdit = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            label: form.label,
            fieldType: form.fieldType,
            options: form.options,
            required: form.required
        }

        if (form.translate) value.translate = form.translate

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi('custom/field', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeEditModal').click()
                modalClosed()
            }
            loader(false)
        })
    }


    const addOption = () => {
        let option = form && form.options
        if (option) {
            option.push({ name: '' })
        } else {
            option = [{ name: '' }]
        }

        setform({ ...form, options: option })
    }

    const updateOption = (i, value) => {
        let option = form && form.options
        option[i].name = value
        setform({ ...form, options: option })
    }

    const removeOption = (index) => {
        let option = form && form.options
        let exist = option.filter((itm, i) => i != index)
        setform({ ...form, options: exist })
    }

    useEffect(() => {
        if (user && user.loggedIn) {
        }
    }, [])


    return <>
        <a id="openEditModal" data-toggle="modal" data-target="#editModal"></a>
        <div className="modal fade" id="editModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Case Note Custom Field</h5>
                        <button type="button" id="closeEditModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-12 mb-3">
                                    <label>Label<span className='star'>*</span></label>
                                    <input type="text" className="form-control" value={form.label ? form.label : ''} onChange={e => setform({ ...form, label: e.target.value })} required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label>Type<span className='star'>*</span></label>
                                    <select className="form-control" value={form.fieldType ? form.fieldType : ''} onChange={e => setform({ ...form, fieldType: e.target.value, options: !form.options.length ? [{ name: '' }] : form.options })} required>
                                        <option value="">Select Option</option>
                                        <option value="text">Text</option>
                                        <option value="textarea">Textarea</option>
                                        <option value="number">Number</option>
                                        <option value="select">Select</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="time">Time</option>
                                        <option value="date">Date</option>
                                    </select>
                                </div>
                                {form.fieldType == 'select' || form.fieldType == 'checkbox' || form.fieldType == 'radio' ? <>
                                    <div className="col-md-12 mb-3">
                                        <label>Options<span className='star'>*</span></label>
                                        {form && form.options && form.options.map((itm, i) => {
                                            return <div className='mb-2 customOption' key={i}>
                                                {i != 0 ? <i className='fa fa-times cursor-pointer text-danger' title='Remove' onClick={e => removeOption(i)}></i> : <></>}

                                                <input type="text" className='form-control' value={itm.name} onChange={e => { updateOption(i, e.target.value) }} required />
                                            </div>
                                        })}

                                        <div className='text-right'>
                                            <b className='text-primary cursor-poniter' onClick={addOption}>Add More Option</b>
                                        </div>
                                    </div>
                                </> : <></>}

                                <div className="col-md-12">
                                    <label>Required<span className='star'>*</span></label>
                                    <div>
                                        <div className="button-cover">
                                            <div className="button r" id="button-1">
                                                <input type="checkbox"
                                                    value={form.required ? true : false} checked={form.required ? true : false} onChange={e => setform({ ...form, required: e.target.checked })}
                                                    className="checkbox" />
                                                <div className="knobs"></div>
                                                <div className="layer"></div>
                                            </div>
                                        </div>
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

export default AddEdit
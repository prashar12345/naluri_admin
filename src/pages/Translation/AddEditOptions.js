
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import modalModel from '../../models/modal.model';

const AddEditOptions = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const handleSubmit = () => {
        let values = { ...form.language.value, [`option_q${form.id}_o${keyform.optionId}`]: keyform.option }

        let value = {
            id: form.language.id,
            value: values
        }

        let method = 'put'
        loader(true)
        ApiClient.allApi('language', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                // modalModel.close('optionModal')
                modalClosed('option')
            }
            loader(false)
        })
    }

    const [keyform, setkeyForm] = useState({})

    const edit = (itm) => {
        let option = geyKeyValue(itm)
        setkeyForm({ option: option, optionId: itm.id })
    }

    const geyKeyValue = (itm) => {
        let value = itm.option
        if (form.language && form.language.value && form.language.value[`option_q${form.id}_o${itm.id}`]) {
            value = form.language.value[`option_q${form.id}_o${itm.id}`]
        }
        return value
    }


    return <>
        <div className="modal fade" id="optionModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Option</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>English</th>
                                    <th>{form && form.language && form.language.name}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {form.options && form.options.map(itm => {
                                    return <tr key={itm.id}>
                                        <td>
                                            {itm.option}
                                        </td>
                                        <td>
                                            {keyform.optionId == itm.id ? <input type="text" value={keyform.option} onChange={e => setkeyForm({ ...keyform, option: e.target.value })} className="form-control" /> :
                                                <>{geyKeyValue(itm)}</>
                                            }

                                        </td>
                                        <td>
                                            {keyform.optionId == itm.id ? <i className="fa fa-paper-plane cursor-pointer" title="Submit" onClick={e => handleSubmit(itm)}></i> : <i className="fa fa-pen cursor-pointer" title="Edit" onClick={e => edit(itm)}></i>}
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default AddEditOptions
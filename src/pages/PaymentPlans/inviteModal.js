import React, { useState } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";

const InviteModal = ({ form, setform, modalClosed, setSubmitted, submitted, emailErr, setEmailErr }) => {
    const [loading, setLoading] = useState(false)

    const formValidation = []

    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid || emailErr) return
        let url = 'invite'
        let value = { email: form.email }

        loader(true)
        ApiClient.post(url, value).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeinviteModal').click()
                modalClosed()
            }
            loader(false)
        })
    }

    const checkEmail = (e) => {
        setEmailErr('')
        setLoading(true)
        ApiClient.get('check/email', { email: e }).then(res => {
            if (!res.success) {
                setEmailErr(res.error.message)
            }
            setLoading(false)
        })
    }



    return <>
        <a id="openInviteModal" data-toggle="modal" data-target="#inviteModal"></a>
        <div className="modal fade" id="inviteModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Invite Counsellor</h5>
                        <button type="button" id="closeinviteModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="col-md-12 mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={e => { setform({ ...form, email: e.target.value }); checkEmail(e.target.value) }}
                                        required
                                        disabled={form.id ? true : false}
                                    />
                                    {emailErr ? <div className="invalid-feedback d-block">{emailErr}</div> : <></>}
                                </div>
                            </div>

                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default InviteModal
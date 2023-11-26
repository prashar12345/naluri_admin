import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";

const InviteModal = ({ form, setform, modalClosed, setSubmitted, submitted, emailErr, setEmailErr }) => {
    const [loading, setLoading] = useState(false)
    const [cas, setCas] = useState([])
    const user = useSelector(state => state.user)
    const [data, setData] = useState([])
    const [loaging, setLoader] = useState(true)
    const [total, setTotal] = useState(0)
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '', role: '' })
    const formValidation = []

    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
    }
    const emailisValid = (mail) => {
        return methodModel.emailvalidation(mail)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid || emailErr) return
        let url = 'invite'
        let value = { email: form.email, role: form.role }

        if (form.role == 'Counsellor') {
            value.clinicId = form.clinicId
            let ext = methodModel.find(cas, form.clinicId, 'id')
            value.healthClinicId = ext.healthClinicId.id
        }

        if (form.role == 'Clinic Admin') {
            value.healthClinicId = form.healthClinicId
        }

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
    const clinicdata = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get("health/clinics", filter,).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal()
            }

            setLoader(false)
        })
    }


    const getCAs = () => {
        ApiClient.get('user/listing', { page: 1, count: 100, role: 'Clinic Admin' }).then(res => {
            if (res.success) {
                setCas(res.data)
            }
        })
    }


    useEffect(() => {
        if (user && user.loggedIn) {
            getCAs()
            clinicdata()
        }
    }, [])

    return <>
        <a id="openInviteModal" data-toggle="modal" data-target="#inviteModal"></a>
        <div className="modal fade" id="inviteModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Invite {form && form.role}</h5>
                        <button type="button" id="closeinviteModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row">
                                {form && form.role == 'Counsellor' ? <div className="col-md-12 mb-3">
                                    <label>Clinic</label>
                                    <select
                                        value={form.clinicId}
                                        onChange={e => { setform({ ...form, clinicId: e.target.value }) }}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        {cas && cas.map(itm => {
                                            return <option value={itm.id} key={itm.id}>{itm.fullName}/{itm.email}</option>
                                        })}
                                    </select>
                                </div> : <></>}

                                {form && form.role == 'Clinic Admin' ? <div className="col-md-12 mb-3">
                                    <label>Health Clinic</label>
                                    <select
                                        value={form.healthClinicId}
                                        onChange={e => { setform({ ...form, healthClinicId: e.target.value }) }}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        {data && data.map(itm => {
                                            return <option value={itm.id} key={itm.id}>{itm.name}</option>
                                        })}

                                    </select>
                                </div> : <></>}

                                <div className="col-md-12 mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control text-lowercase"
                                        value={form.email}
                                        onChange={e => { setform({ ...form, email: e.target.value }); checkEmail(e.target.value); }}
                                        required
                                        maxLength={27}
                                        disabled={form.id ? true : false}
                                    />
                                    {form.email && !emailisValid(form.email) ? <div className="invalid-feedback d-block">Invalid Email</div> : <></>}
                                    {emailErr ? <div className="invalid-feedback d-block">{emailErr}</div> : <></>}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {emailisValid(form.email) ? <button type="submit" className="btn btn-primary" disabled={loading ? true : false}>Invite</button> : <button type="submit" className="btn btn-primary" disabled={'true'}>Invite</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default InviteModal
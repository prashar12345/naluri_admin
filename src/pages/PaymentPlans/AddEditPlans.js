import React, { useState } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";

const AddEditPlans = ({ form, setform, modalClosed, setSubmitted, submitted, emailErr, setEmailErr, icErr, setIcErr }) => {
    const [loading, setLoading] = useState(false)

    const formValidation = [
        { key: 'mobileNo', minLength: 9 },
        { key: 'ic_number', minLength: 6 },
    ]

    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid || emailErr || icErr) return
        let method = 'post'
        let url = 'add/plans'
        let value = { role: form.role, dialCode: form.dialCode, firstName: form.firstName, lastName: form.lastName, email: form.email, nationality: form.nationality, ic_number: form.ic_number, id: form.id, mobileNo: form.mobileNo }
        if (!value.ic_number) delete value.ic_number
        if (value.id) {
            method = 'put'
            url = 'plans'
            delete value.password
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeplansModal').click()
                modalClosed()
            }

            loader(false)
        })
    }

    const checkEmail = (e) => {
        setEmailErr('')
        setLoading(true)
        ApiClient.get('check/email', { email: e }, '', true).then(res => {
            if (!res.success) {
                if (res.error.message == 'Email already taken') {
                    setEmailErr(res.error.message)
                }
            }
            setLoading(false)
        })
    }

    const checkIc = (e) => {
        setIcErr('')
        setLoading(true)
        ApiClient.get('check/icnumber', { ic_number: e }, '', true).then(res => {
            if (!res.success) {
                setIcErr(res.error.message)
            }
            setLoading(false)
        })
    }

    return <>
        <a id="openuserModal" data-toggle="modal" data-target="#plansModal"></a>
        <div className="modal fade" id="plansModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Plans</h5>
                        <button type="button" id="closeplansModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row">
                                {/* <div className="col-md-12 text-center mb-3">
                                    <label className="profileImageLabel">
                                        <img src={methodModel.plansImg(form && form.image)} className="profileImage" />
                                        <input
                                            id="bannerImage"
                                            type="file"
                                            className="d-none"
                                            accept="image/*"
                                            onChange={(e) => uploadImage(e)}
                                        />

                                        <i className="fa fa-edit"></i>
                                    </label>
                                </div> */}
                                <div className="col-md-6 mb-3">
                                    <label> Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.name}
                                        onChange={e => setform({ ...form, name: e.target.value })}
                                        required
                                    />


                                </div>
                                {/* {/* <div className="col-md-6 mb-3">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.lastName}
                                        onChange={e => setform({ ...form, lastName: e.target.value })}
                                        required
                                    />
                                </div> */}
                                <div className="col-md-6 mb-3">
                                    <label>Price {form.price == 'Owner' ? <></> : '(Optional)'}</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={form.price}
                                        onChange={e => { setform({ ...form, price: e.target.value }); checkEmail(e.target.value) }}
                                        disabled={form.price == 'Owner' && form.id ? true : false}
                                        required={form.price == 'Owner' ? true : false}
                                    />
                                    {emailErr ? <div className="invalid-feedback d-block">{emailErr}</div> : <></>}
                                </div>
                                {/* <div className="col-md-6 mb-3">
                                    <label>Interval</label>
                                    <div className="phoneInput">
                                        <input
                                            type="text"
                                            className="form-control" placeholder='+60'
                                            value={form && form.dialCode}
                                            maxLength={4}
                                            onChange={e => setform({ ...form, dialCode: e.target.value })}
                                            required
                                        />
                                        <input
                                            type="text"
                                            className="form-control" placeholder='Mobile No.'
                                            value={form && form.mobileNo}
                                            maxLength={12}
                                            onChange={e => setform({ ...form, mobileNo: methodModel.isNumber(e) })}
                                            required
                                        />
                                    </div> */}
                                {/* {submitted && getError('mobileNo').invalid ? <div className="invalid-feedback d-block">Min Length is 9</div> : <></>}
                            </div> */}

                                {form.role != 'Owner' ? <>
                                    {/* <div className="col-md-6 mb-3">
                                        <label>Interval</label>
                                        <select className="form-control"
                                            value={form && form.nationality}
                                            onChange={e => { setform({ ...form, nationality: e.target.value, ic_number: '' }); }}
                                            disabled={form.id ? true : false}
                                            required
                                        >
                                            <option value="">Select Option</option>
                                            <option value="Malaysian">Malaysian</option>
                                            <option value="Non-Malaysian">Non-Malaysian</option>
                                        </select>
                                    </div> */}
                                    <div className="col-md-6 mb-3">
                                        <label>Interval</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={form && form.ic_number}
                                            maxLength={form.interval == 'Malaysian' ? 12 : 16}
                                            onChange={e => { setform({ ...form, ic_number: e.target.value }); checkIc(e.target.value) }}
                                            required
                                        // disabled={form.id ? true : false}
                                        />
                                        {submitted && !icErr && getError('ic_number').invalid ? <div className="invalid-feedback d-block">Min Length is 6</div> : <></>}
                                        {icErr ? <div className="invalid-feedback d-block">{icErr}</div> : <></>}
                                    </div> </> : <></>}


                                {/* <div className="col-md-6 mb-3">
                                    <label>Interval</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.role}

                                    />
                                </div> */}
                            </div>

                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    </>
}

export default AddEditPlans;
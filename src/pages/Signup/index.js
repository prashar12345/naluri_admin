import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    ToastsStore,
} from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { Link } from 'react-router-dom';
import './style.scss';
import methodModel from '../../methods/methods';
import OTPModal from './OTOModal';

const Signup = () => {
    const history = useHistory();
    const user = useSelector(state => state.user)
    useEffect(() => {
        if (user && user.loggedIn) {
            history.push('/dashboard')
        }
        if (methodModel.getPrams('inviteId')) {
            let role = 'user'
            if (methodModel.getPrams('role')) role = methodModel.getPrams('role')
            setForm({ ...form, email: methodModel.getPrams('email'), inviteId: methodModel.getPrams('inviteId'), role: role })
        }

    }, [])

    const [form, setForm] = useState({ confirmPassword: '', password: '', firstName: '', lastName: '', email: '', dialCode: '+60', mobileNo: '', role: 'user', })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [otpForm, setOtpForm] = useState({ otp: '', id: '' })
    const [icErr, setIcErr] = useState('')

    const formValidation = [
        { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'password'] },
        { key: 'password', password: true },
        { key: 'ic_number', minLength: 6 },
        { key: 'mobileNo', minLength: 9 },
    ]
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });

    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
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

    const hendleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid || icErr || emailErr) return
        loader(true)
        let value = form
        ApiClient.post('register', value).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                // history.push('/login');
                setOtpForm({ ...otpForm, id: res.data.id })
                document.getElementById("openOTPModal").click()
            }
            loader(false)
        })
    };


    const checkIc = (e) => {
        setIcErr('')
        setLoading(true)
        ApiClient.get('check/icnumber', { ic_number: e }, '', true).then(res => {
            if (!res.success) {
                if (form.role != 'user' && res.error.message === "Ic number already exist in application.") {
                    setIcErr(res.error.message)
                }
                setIcErr(res.error.message)
            }
            setLoading(false)
        })
    }


    return (
        <>
            <div className="login-wrapper">
                <div className="mainfromclss">
                    <div className="row">
                        <div className="col-md-6  px-0">
                            <form
                                className="p-5 rounded shadow"
                                onSubmit={hendleSubmit}
                            >
                                <div className="mb-3">
                                    <Link to="/"><img src="/assets/img/Naluri Colour Vector.png" className="logimg" /></Link>
                                </div>

                                <div className="text-center mb-3">
                                    <h3 className="text-left lgtext">Registration</h3>
                                    <p className="text-left paraclss">Create Your Account</p>
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control mb-0 bginput" placeholder='First Name*'
                                        value={form && form.firstName}
                                        onChange={e => setForm({ ...form, firstName: e.target.value })}
                                        required
                                    />
                                </div>


                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control mb-0 bginput" placeholder='Last Name*'
                                        value={form && form.lastName}
                                        onChange={e => setForm({ ...form, lastName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control mb-0 bginput" placeholder={`Email ${methodModel.emailRequiredFor(form.role) ? '*' : ''}`}
                                        value={form && form.email}
                                        disabled={form && form.inviteId}
                                        onChange={e => { setForm({ ...form, email: e.target.value }); checkEmail(e.target.value) }}
                                    />
                                    {emailErr ? <div className="invalid-feedback d-block">{emailErr}</div> : <></>}
                                </div>

                                <div className="mb-3">

                                </div>

                                <div className="mb-3">
                                    <div className="phoneInput">
                                        <input
                                            type="text"
                                            className="form-control mb-0 bginput" placeholder='+60*'
                                            value={form && form.dialCode}
                                            maxLength={4}
                                            onChange={e => setForm({ ...form, dialCode: e.target.value })}
                                            required
                                        />

                                        <input
                                            type="text"
                                            className="form-control mb-0 bginput" placeholder='Mobile No.*'
                                            value={form && form.mobileNo}
                                            maxLength={12}
                                            onChange={e => setForm({ ...form, mobileNo: methodModel.isNumber(e) })}
                                            required
                                        />
                                    </div>

                                    {submitted && getError('mobileNo').invalid ? <div className="invalid-feedback d-block">Min Length is 9</div> : <></>}
                                </div>
                                <div className="mb-3">
                                    <div className="inputWrapper">
                                        <input
                                            type={eyes.password ? 'text' : 'password'}
                                            className="form-control mb-0 bginput"
                                            value={form.password}
                                            placeholder="Password*"
                                            maxLength={20}
                                            onChange={e => setForm({ ...form, password: e.target.value })}
                                            required
                                        />
                                        <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                                    </div>

                                    {submitted && getError('password').invalid ? <div className="invalid-feedback d-block">Input Password and Submit [8 to 20 characters which contain at least one numeric digit, one uppercase, one lowercase letter and  a special character</div> : <></>}
                                </div>

                                <div className="mb-3">
                                    <div className="inputWrapper">
                                        <input
                                            type={eyes.confirmPassword ? 'text' : 'password'}
                                            className="form-control mb-0 bginput"
                                            placeholder="Confirm Password*"
                                            value={form.confirmPassword}
                                            maxLength={20}
                                            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                            required
                                        />
                                        <i className={eyes.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
                                    </div>
                                    {submitted && getError('confirmPassword').err.confirmMatch ? <div className="invalid-feedback d-block">Comfirm Password is not matched with New Password</div> : <></>}
                                </div>

                                <div className="text-center">
                                    <button type="submit" disabled={loading} className="btn btn-primary loginclass mb-4">
                                        Register
                                    </button>
                                </div>
                                <div className="text-center">
                                    <Link to="/login" className="text-primary Allready">Already a member? <span className="loglink">Login</span></Link>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-6 px-0">
                            <img src="./assets/img/login_Img.png" className="loginimg w-100" />
                        </div>
                    </div>
                </div>
            </div>

            <OTPModal form={otpForm} setform={setOtpForm} />
        </>
    );
};

export default Signup;

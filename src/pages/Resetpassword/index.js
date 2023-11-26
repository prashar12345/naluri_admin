
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    ToastsStore,
} from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';
import './style.scss';
import { Link } from 'react-router-dom';

const Resetpassword = () => {
    const history = useHistory();

    const user = useSelector(state => state.user)
    useEffect(() => {
        if (user && user.loggedIn) {
            history.push('/dashboard')
        }
    }, [])

    const formValidation = [
        { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'newPassword'] },
        { key: 'newPassword', minLength: 8 },
    ]

    const [form, setForm] = useState({ id: '', email: '', confirmPassword: '', newPassword: '', code: '' });
    const [submitted, setSubmitted] = useState(false)
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false });

    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
    }

    useEffect(() => {
        let prm = {
            email: methodModel.getPrams('email'),
            id: methodModel.getPrams('id'),
        }

        setForm({ ...form, ...prm })
    }, [])

    const hendleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        loader(true)
        ApiClient.put('reset/password', form).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push('/login');
            }
            loader(false)
        })
    };


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
                                    <Link to={''}>
                                        <img src="/assets/img/Naluri Colour Vector.png" className="logimg pt-4" />
                                    </Link>
                                </div>
                                <div className="text-center mb-3">

                                    <h3 className="text-left">Reset Password<span className="start">*</span></h3>
                                </div>
                                <label>Code</label>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control mb-0 bginput"
                                        value={form.code}
                                        onChange={e => setForm({ ...form, code: e.target.value })}
                                        required
                                    />
                                </div>

                                <label>New Password<span className="start">*</span></label>

                                <div className="mb-3">
                                    <div className="inputWrapper">
                                        <input
                                            type={eyes.password ? 'text' : 'password'}
                                            className="form-control mb-0 bginput"
                                            value={form.newPassword}
                                            min="12"
                                            onChange={e => setForm({ ...form, newPassword: e.target.value })}
                                            required
                                        />
                                        <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                                    </div>

                                    {submitted && getError('newPassword').invalid ? <div className="invalid-feedback d-block">Min Length must be 8 characters long</div> : <></>}
                                </div>

                                <label>Confirm Password<span className="start">*</span></label>

                                <div className="mb-3">
                                    <div className="inputWrapper">
                                        <input
                                            type={eyes.confirmPassword ? 'text' : 'password'}
                                            className="form-control mb-0 bginput"
                                            value={form.confirmPassword}
                                            maxLength={50}
                                            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                            required
                                        />
                                        <i className={eyes.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
                                    </div>

                                    {submitted && getError('confirmPassword').err.confirmMatch ? <div className="invalid-feedback d-block">Comfirm Password is not matched with New Password</div> : <></>}
                                </div>



                                <div className="text-right">
                                    <button type="submit" className="btn btn-primary loginclass">
                                        Submit
                                    </button>

                                </div>
                            </form>
                        </div>
                        <div className="col-md-6 px-0">
                            <img src="./assets/img/login_Img.png" className="loginimg w-100" />
                        </div>
                    </div>


                </div>
            </div>

        </>
    );
};

export default Resetpassword;

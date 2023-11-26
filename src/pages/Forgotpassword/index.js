import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    ToastsStore,
} from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss';
import { Link } from 'react-router-dom';


const Forgotpassword = () => {
    const history = useHistory();

    const user = useSelector(state => state.user)
    useEffect(() => {
        if (user && user.loggedIn) {
            history.push('/dashboard')
        }
    }, [])

    const [form, setForm] = useState({ email: '' });

    useEffect(() => {

    }, [])

    const hendleSubmit = (e) => {
        e.preventDefault();
        loader(true)

        ApiClient.post('forgot/password', form).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push('/resetpassword?id=' + res.id + '&email=' + form.email);
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
                                <a href="/login"><i class="fa fa-arrow-left" title='Back' aria-hidden="true"></i></a>
                                <div className="mb-3">
                                    <Link to={''}>
                                        <img src="/assets/img/Naluri Colour Vector.png" className="logimg pt-4" />
                                    </Link>
                                </div>
                                <div className="text-center mb-3">
                                    <h3 className="text-left lgtext">Forgot Password</h3>
                                </div>
                                <label></label>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control  mb-0 bginput" placeholder='Email*'
                                        value={form.email}
                                        required
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                    />

                                </div>

                                <div className="text-right">
                                    <button type="submit" className="btn btn-primary loginclass">Send</button>
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

export default Forgotpassword;

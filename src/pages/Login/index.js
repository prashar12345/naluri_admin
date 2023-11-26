import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  ToastsStore,
} from 'react-toasts';
import { login_success } from '../../actions/user';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { Link } from 'react-router-dom';
import './style.scss';

const Login = () => {
  const history = useHistory();
  const user = useSelector(state => state.user)
  useEffect(() => {
    if (user && user.loggedIn) {
      history.push('/dashboard')
    }
  }, [])

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });

  useEffect(() => {
    loader(true)
    setTimeout(() => {
      loader(false)
    }, 500);
  }, [])

  const hendleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: username,
      password
    };

    loader(true)

    ApiClient.post('admin/signin', data).then(res => {
      loader(false)
      if (res.success) {
        ToastsStore.success(res.message)
        localStorage.setItem('token', res.data.access_token)
        dispatch(login_success(res.data))
        history.push('/dashboard');
      }
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

                <div className="text-center mb-4">
                  <h3 className="text-left lgtext">Login</h3>
                  <p className="text-left paraclss">Your Account</p>
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control mb-0 bginput" placeholder='Email'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>



                <div className="mb-3">
                  <div className="inputWrapper">
                    <input
                      type={eyes.password ? 'text' : 'password'}
                      className="form-control mb-0 bginput"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary loginclass mb-4">
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <Link to="/forgotpassword" className="text-primary">Forgot Password</Link>

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

export default Login;

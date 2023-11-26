import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ToastsStore } from 'react-toasts';
import { logout } from '../../../actions/user';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import methodModel from '../../../methods/methods';

const ChangePassword = p => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [form, setForm] = useState({ confirmPassword: '', currentPassword: '', newPassword: '' })
  const [submitted, setSubmitted] = useState(false)
  const formValidation = [
    { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'newPassword'] },
    { key: 'currentPassword', minLength: 8 },
    { key: 'newPassword', minLength: 8 },
  ]
  const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });
  const getError = (key) => {
    return methodModel.getError(key, form, formValidation)
  }

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true)
    let invalid = methodModel.getFormError(formValidation, form)
    if (invalid) return

    loader(true)
    ApiClient.put('change/password', form).then(res => {
      if (res.success) {
        ToastsStore.success(res.message)
        dispatch(logout())
        history.push('/login');
      }
      loader(false)
    })
  };

  return (
    <>
      <form
        className="pprofile1 form-row py-3 "
        onSubmit={handleSubmit}
      >
        <div className="col-md-12 mb-3">
          <label>Currrent Password<span className="start">*</span></label>
          <div className="inputWrapper">
            <input
              type={eyes.currentPassword ? 'text' : 'password'}
              className="form-control"
              value={form.currentPassword}
              maxLength="20"
              onChange={e => setForm({ ...form, currentPassword: e.target.value })}
              required
            />
            <i className={eyes.currentPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, currentPassword: !eyes.currentPassword })}></i>
          </div>
          {submitted && getError('currentPassword').invalid ? <div className="invalid-feedback d-block">Min Length must be 8 characters long</div> : <></>}
        </div>

        <div className="col-md-12 mb-3">
          <label>New Password<span className="start">*</span></label>

          <div className="inputWrapper">
            <input
              type={eyes.password ? 'text' : 'password'}
              className="form-control"
              value={form.newPassword}
              maxLength="20"
              onChange={e => setForm({ ...form, newPassword: e.target.value })}
              required
            />
            <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
          </div>
          {submitted && getError('newPassword').invalid ? <div className="invalid-feedback d-block">Min Length must be 8 characters long</div> : <></>}
        </div>

        <div className="col-md-12 mb-3">
          <label>Confirm Password<span className="start">*</span></label>

          <div className="inputWrapper">
            <input
              type={eyes.confirmPassword ? 'text' : 'password'}
              className="form-control"

              value={form.confirmPassword}
              maxLength="20"
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
            <i className={eyes.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
          </div>
          {submitted && getError('confirmPassword').invalid ? <>

            {/* {getError('confirmPassword').err.minLength ? <div>Min Length must be 8 characters long</div> : <></>} */}
            {getError('confirmPassword').err.confirmMatch ? <div className="invalid-feedback d-block">Comfirm Password is not matched with New Password</div> : <></>}

          </> : <></>}




        </div>

        <div className="col-md-12 text-right">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;

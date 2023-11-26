import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import { ToastsStore } from 'react-toasts';
import methodModel from '../../../methods/methods';
import { login_success } from '../../../actions/user';
import { Link } from 'react-router-dom';
import './style.scss';

const EditProfile = p => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', mobileNo: '', image: '', dialCode: '+60' });
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const formValidation = [
    { key: 'ic_number', minLength: 6 },
    { key: 'mobileNo', minLength: 9 },
    { key: 'dialCode', dialCode: true },
  ]

  const gallaryData = () => {
    loader(true)
    ApiClient.get(`user`, { id: user.id }).then(res => {
      if (res.success) {
        setForm(res.data)
        setData(res.data)
      }
      loader(false)

    })
  };

  const getError = (key) => {
    return methodModel.getError(key, form, formValidation)
  }

  const handleSubmit = e => {

    e.preventDefault();
    setSubmitted(true)
    let invalid = methodModel.getFormError(formValidation, form)
    if (invalid || emailErr) return

    let value = { firstName: form.firstName, lastName: form.lastName, dialCode: form.dialCode, mobileNo: form.mobileNo, image: form.image, id: form.id }

    loader(true)
    ApiClient.put('user', value).then(res => {
      if (res.success) {
        let uUser = { ...user, ...value }
        dispatch(login_success(uUser))
        ToastsStore.success(res.message)
      }
      loader(false)
    })
  };

  const checkEmail = (e) => {
    setEmailErr('')
    setLoading(true)
    ApiClient.get('check/email', { email: e }, '', true).then(res => {
      if (!res.success) {
        if (res.error.message == 'Email already taken' && data.email != e) {
          setEmailErr(res.error.message)
        }
      }
      setLoading(false)
    })
  }

  const uploadImage = (e) => {
    setForm({ ...form, baseImg: e.target.value })
    let files = e.target.files
    let file = files.item(0)
    loader(true)
    ApiClient.postFormData('image/upload?modelName=users', { file: file, modelName: 'users' }).then(res => {
      if (res.success) {
        let image = res.data.fullpath
        setForm({ ...form, image: image, baseImg: '' })
      } else {
        setForm({ ...form, baseImg: '' })
      }
      loader(false)
    })
  }

  useEffect(
    () => {
      if (user && user.loggedIn) {
        gallaryData();
      }
    },
    []
    // here '[]' is used for, loop se bachne k liye
  );

  return (
    <>
      <div className='pprofile1'>
        <form
          className="py-3 form-row"
          onSubmit={handleSubmit}
        >

          <div className="col-md-12 text-center mb-3">
            <div className='text-right'><Link to="/profile"><i className="fa fa-arrow-left" title='Back' aria-hidden="true"></i></Link></div>
            <div className='maininutcls'>

              <i className="fa fa-times" aria-hidden="true" onClick={e => setForm({ ...form, image: "" })}></i>
              <label className="profileImageLabel">
                <img src={methodModel.userImg(form && form.image)} className="profileImage" />

                <input
                  id="bannerImage"
                  type="file"
                  className="d-none"
                  accept="image/*"
                  value={form.baseImg ? form.baseImg : ''}
                  onChange={(e) => { uploadImage(e); }}
                />

                <i className="fa fa-edit" title='Upload Image'></i>
              </label>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label>First Name<span className='star'>*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={form.firstName ? form.firstName : ''}
              onChange={e => setForm({ ...form, firstName: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Last Name<span className='star'>*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={form.lastName ? form.lastName : ''}
              onChange={e => setForm({ ...form, lastName: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email{methodModel.emailRequiredFor(form.role) ? <span className="text-danger">*</span> : <></>}</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Name"
              value={form.email ? form.email : ''}
              disabled
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Mobile No<span className='star'>*</span></label>
            <div className="phoneInput">
              <input
                type="text"
                className="form-control" placeholder='+60'

                value={form && form.dialCode}
                // pattern="[0-9]{3}[+]"
                title="Phone number with + and remaing 9 digit with 0-9"
                maxLength={4}
                onChange={e => setForm({ ...form, dialCode: e.target.value })}
                required
              />
              <input
                type="text"
                className="form-control" placeholder='Mobile No.'
                value={form && form.mobileNo}
                maxLength={12}
                onChange={e => setForm({ ...form, mobileNo: methodModel.isNumber(e) })}
                required
              />
            </div>

            {submitted && getError('dialCode').invalid ? <div className="invalid-feedback d-block">invalid country code</div> : <></>}
            {submitted && getError('mobileNo').invalid && !getError('dialCode').invalid ? <div className="invalid-feedback d-block">Min Length is 10</div> : <></>}
          </div>

          <div className="col-md-6 mb-3">
            <label>Role</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={form.role}
              disabled
            />
          </div>

          <div className="col-md-12 text-right">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>


    </>
  );
};

export default EditProfile;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './profile.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';


const Profile = () => {

  const user = useSelector((state) => state.user);
  const [data, setData] = useState('');

  const gallaryData = () => {
    loader(true)
    ApiClient.get(`user`, { id: user.id }).then(res => {
      if (res.success) {
        setData(res.data)
      }
      loader(false)

    })
  };

  useEffect(
    () => {
      if (user && user.loggedIn) {
        gallaryData();
      }
    },
    []
  );

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className='ViewUser'>View User</h3>
        <Link to="/settings" className="btn btn-primary">
          <i className="fa fa-edit" title='Edit Profile' />
        </Link>
      </div>
      <div className='pprofile1'>
        <div className="form-row">
          <div className="col-md-12 text-center mb-3">
            <label className="profileImageLabel">
              <img src={methodModel.userImg(data && data.image)} className="profileImage" />
            </label>
          </div>
          <div className="col-md-6">
            <label>First Name</label>
            <p className="bg-light rounded px-3 py-2 fieldcls">{data && data.firstName}</p>
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <p className="bg-light rounded px-3 py-2 fieldcls">{data && data.lastName}</p>
          </div>

          {/* <div className="col-md-6">
          <label>Role</label>
          <p className="bg-light rounded px-3 py-2">{data && data.role}</p>
        </div> */}

          <div className="col-md-6">
            <label>Email</label>
            <p className="bg-light rounded px-3 py-2 fieldcls">{data && data.email}</p>
          </div>


          <div className="col-md-6">
            <label>Mobile No</label>
            <p className="bg-light rounded px-3 py-2 fieldcls">{data && data.dialCode + data.mobileNo}</p>
          </div>

          {/* <div className="col-md-12">
            <label>Created At</label>
            <p className="bg-light rounded px-3 py-2">{data && data.createdAt}</p>
          </div> */}
        </div>
      </div>

    </Layout>
  );
};

export default Profile;

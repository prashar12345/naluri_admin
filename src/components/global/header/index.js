import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import './style.scss';
import Sidebar from '../sidebar';
import { useDispatch, useSelector } from 'react-redux';
import methodModel from '../../../methods/methods';
import { search_success } from '../../../actions/search';
import { logout } from '../../../actions/user';


const Header = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen1, setIsOpen1] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const history = useHistory();

  const searchState = useSelector((state) => state.search);

  const Logout = () => {
    dispatch(logout())
    history.push('/login');
  };

  const user = useSelector((state) => state.user);

  useEffect(
    () => {
      if (searchState.data) {
        dispatch(search_success(''))
      }

    },
    []
  );

  useEffect(() => {
    setSearch(searchState.data)
  }, [searchState])

  const [search, setSearch] = useState('')

  const searchHandle = (e) => {
    e.preventDefault()
    dispatch(search_success(search))
  }

  const searchChange = (e) => {
    setSearch(e)
    if (!e) {
      dispatch(search_success(''))
    }
  }


  const clear = () => {
    setSearch('')
    dispatch(search_success(''))
  }

  return (
    <nav
      className={
        isOpen
          ? 'navbar navbar-expand-lg main-navbar min-sidebar'
          : 'navbar navbar-expand-lg main-navbar'
      }
    >

      <a
        onClick={toggle}
        className={
          isOpen
            ? 'btn barlink text-primary active'
            : 'btn barlink  text-primary'
        }
      >
        <i className="fas fa-bars" />
      </a>

      <form className='headerSearch' onSubmit={searchHandle}>
        <input type="text" placeholder="Search.." value={search} onChange={e => searchChange(e.target.value)} className="Searchbar"></input>
        <i className="fa fa-search" onClick={searchHandle} aria-hidden="true"></i>
        {search ? <i className="fa fa-times" onClick={clear} aria-hidden="true"></i> : <></>}
      </form>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav w-100 flex-row">
          <li className="dropdown ml-auto">
            <Link
              to="/"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-user text-dark"
            >
              <img alt="image" src={methodModel.userImg(user.image)} className="rounded-circle mr-1" /> {user.fullName}

            </Link>
            <div className="dropdown-menu dropdown-menu-right position-absolute">
              <Link to="/settings" className="dropdown-item has-icon">
                <i className="fa fa-cog" aria-hidden="true"></i> Settings
              </Link>

              <Link to="/profile" className="dropdown-item has-icon">
                <i className="far fa-user" /> Profile
              </Link>

              <a onClick={() => Logout()} className="dropdown-item has-icon">
                <i className="fas fa-sign-out-alt" /> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>

      {
        isOpen1 ? (
          <div className="w-100 mobi-dropdown">
            <Sidebar />
          </div>
        ) : (
          <></>
        )
      }
    </nav >
  );
};

export default Header;

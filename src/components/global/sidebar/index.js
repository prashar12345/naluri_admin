import React from 'react';
import './style.scss';
import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const user = useSelector(state => state.user)
  const ListItemLink = ({ to, ...rest }) => {
    return (
      <Route
        path={to}
        children={({ match }) => (
          <li className={match ? 'nav-item active' : 'nav-item'}>
            <Link to={to} {...rest} className="nav-link hoverclass" />
          </li>
        )}
      />
    );
  };

  return (
    <ul className="nav flex-column">

      <ListItemLink to="/dashboard">
        <i className="fa fa-list mr-2" aria-hidden="true"></i>
        <span>Dashboard</span>
      </ListItemLink>


      <ListItemLink to="/logo-management">
        <i className="fa fa-list mr-2" aria-hidden="true"></i>
        <span>Logo Management</span>
      </ListItemLink>

      {user.role != 'translater' ? <>
        <ListItemLink to="/categorytype" >
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
          <span>Assessment Type</span>
        </ListItemLink>

        <ListItemLink to="/audithistory" >
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
          <span>Audit History</span>
        </ListItemLink>

        <ListItemLink to="/allusers">
          <i className="fa fa-user mr-2" aria-hidden="true"></i>
          <span>All Accounts</span>
        </ListItemLink>

        <ListItemLink to="/rolelist">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
          <span>Role Access</span>
        </ListItemLink>

        <ListItemLink to="/questions">
          <i className="fa fa-question-circle mr-2" aria-hidden="true"></i>
          <span>Questions</span>
        </ListItemLink>

        <ListItemLink to="/healthclinic">
          <i className="	fa fa-medkit mr-2"></i>
          <span>Health Clinic</span>
        </ListItemLink>

        <ListItemLink to="/faq">
          <i className="fa fa-question-circle mr-2" aria-hidden="true"></i>
          <span>FAQ</span>
        </ListItemLink>
        <ListItemLink to="/contentmanagment">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
          <span>Content Management</span>
        </ListItemLink>

        <ListItemLink to="/blog">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
          <span>Blog category</span>
        </ListItemLink>

        <ListItemLink to="/bloglisting">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
          <span>Blogs</span>
        </ListItemLink>

        <ListItemLink to="/casenote-fields">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
          <span>Case Note Custom Field</span>
        </ListItemLink>
      </> : <></>}



      <ListItemLink to="/translation">
        {/* <i className="fa fa-question-circle mr-2" aria-hidden="true"></i> */}
        <i className="fa fa-language mr-2" aria-hidden="true"></i>
        <span>Translation</span>
      </ListItemLink>


      <ListItemLink to="/settings">
        {/* <i className="fa fa-question-circle mr-2" aria-hidden="true"></i> */}
        <i className="fa fa-cog mr-2" aria-hidden="true"></i>
        <span>Settings</span>
      </ListItemLink>

      <ListItemLink to="/setting/reschedule-time">
        {/* <i className="fa fa-question-circle mr-2" aria-hidden="true"></i> */}
        <i className="fa fa-cog mr-2" aria-hidden="true"></i>
        <span>Reschedule Time</span>
      </ListItemLink>

      <ListItemLink to="/appointment-reminder">
        {/* <i className="fa fa-question-circle mr-2" aria-hidden="true"></i> */}
        <i className="fa fa-clock mr-2" aria-hidden="true"></i>
        <span>Appointment Reminder</span>
      </ListItemLink>

      {/* 
      <ListItemLink to="/blogdetail">
        <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
        <span>Blog Detail</span>
      </ListItemLink> */}



      {/* <ListItemLink to="/paymentplans">
        <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
        <span>Payment Plans</span>
      </ListItemLink> */}
    </ul>
  );
};

export default Sidebar;

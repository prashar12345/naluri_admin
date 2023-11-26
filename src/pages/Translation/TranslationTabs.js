import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import methodModel from '../../methods/methods';

const TranslationTabs = ({ page = 'translation' }) => {
    return <>
        {methodModel.isTranslatePage() ? <div className='tabsclass mb-3'>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <Link className={`nav-link ${page === 'translation' ? 'active' : ''}`} to="/translation">Pages</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${page === 'categorytype' ? 'active' : ''}`} to="/translation/categorytype">Assessment Types</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${page === 'questions' ? 'active' : ''}`} to="/translation/questions" >Questions</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${page === 'faq' ? 'active' : ''}`} to="/translation/faq">FAQ</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${page === 'contentmanagment' ? 'active' : ''}`} to="/translation/contantmanagement">Content Management</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${page === 'blogcategory' ? 'active' : ''}`} to="/translation/blog">Blog Category</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${page === 'blogs' ? 'active' : ''}`} to="/translation/bloglisting">Blogs</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${page === 'healthclinic' ? 'active' : ''}`} to="/translation/healthclinic">Health Clinic</Link>
                </li>
            </ul>
        </div> : <></>}

    </>
}

export default TranslationTabs
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from "../../methods/api/apiClient";
import methodModel from '../../methods/methods';


const ViewContant = ({ form }) => {
    const user = useSelector(state => state.user)
    const [languages, setLanguages] = useState([])


    const getLaguages = (p = {}) => {
        // setLoader(true)
        let filter = { page: 1, count: 100, ...p }
        ApiClient.get('languages', filter).then(res => {
            if (res.success) {
                setLanguages(res.data)
            }
            // setLoader(false)
        })
    }


    useEffect(() => {
        if (user && user.loggedIn) {
            // getCategories()
            getLaguages()
        }
    }, [])
    return <>
        <a id="openViewContantModal" data-toggle="modal" data-target="#viewContantModal"></a>
        <div className="modal fade" id="viewContantModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Content</h5>
                        <button type="button" id="closeviewContantModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-6 mb-3">
                                <label>title</label>
                                <p className="mb-0">{form && form.title}</p>
                                {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                    return <div className="mt-3" key={itm.id}>
                                        <p>{form.titleTranslate ? form.titleTranslate[itm.code] ? form.titleTranslate[itm.code] : '' : ''}</p>
                                    </div>
                                })}

                            </div>

                            <div className="col-md-6 mb-3">
                                <label>meta_title</label>
                                <p className="mb-0">{form && form.meta_title}</p>

                            </div>
                            {/* <div className="col-md-6 mb-3">
                                <label>slug</label>
                                <p className="mb-0">{form && form.slug}</p>

                            </div> */}

                            <div className="col-md-12 mb-3">
                                <label>description</label>
                                <p className="mb-0" dangerouslySetInnerHTML={{ __html: form && form.description }}></p>
                                {languages && methodModel.isTranslatePage() && languages.map((itm, i) => {
                                    return <div className="mt-3" key={itm.id}>
                                        <label>{itm.name}</label>
                                        {/* <p>{form.descriptionTranslate ? form.descriptionTranslate[itm.code] ? form.descriptionTranslate[itm.code] : '' : ''}</p> */}
                                        <p dangerouslySetInnerHTML={{ __html: form.descriptionTranslate ? form.descriptionTranslate[itm.code] ? form.descriptionTranslate[itm.code] : '' : '' }}></p>
                                    </div>
                                })}
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>meta_description</label>
                                <p className="mb-0" >{form && form.meta_description}</p>

                            </div>
                            <div className="col-md-6 mb-3">
                                <label>meta_keyword</label>
                                <p className="mb-0">{form && form.meta_keyword}</p>

                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default ViewContant
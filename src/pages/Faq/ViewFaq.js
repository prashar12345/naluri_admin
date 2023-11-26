import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import ApiClient from "../../methods/api/apiClient";

const ViewFaq = ({ form, setform }) => {
    const [languages, setLanguages] = useState([])
    const user = useSelector(state => state.user)

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
            getLaguages()
            // getFaqs()
        }
    }, [])

    return <>
        <a id="openViewFaqModal" data-toggle="modal" data-target="#viewFaqModal"></a>
        <div className="modal fade" id="viewFaqModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">View FAQ</h5>
                        <button type="button" id="closeViewFaqModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-12 mb-3">
                                <label>Question</label>
                                <p className="mb-0">{form && form.question}</p>
                                {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                    return <div className="mt-3" key={itm.id}>
                                        <p >{form.questionTranslate ? form.questionTranslate[itm.code] ? form.questionTranslate[itm.code] : '' : ''}</p>
                                    </div>
                                })}
                            </div>




                            <div className="col-md-12 mb-3">
                                <label>answer</label>
                                <p className="mb-0">{form && form.answer}</p>
                                {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                    return <div className="mt-3" key={itm.id}>
                                        <p>{form.answereTranslate ? form.answereTranslate[itm.code] ? form.answereTranslate[itm.code] : '' : ''}</p>
                                    </div>
                                })}

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

export default ViewFaq
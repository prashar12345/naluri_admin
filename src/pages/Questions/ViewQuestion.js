import React, { useState } from "react";

const ViewQuestion = ({ form }) => {

    return <>
        <a id="openViewQuestionModal" data-toggle="modal" data-target="#viewQuestionModal"></a>
        <div className="modal fade" id="viewQuestionModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Question</h5>
                        <button type="button" id="closeViewQuestionModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-12 mb-3">
                                <label>Question</label>
                                <p className="mb-0">{form && form.question}</p>

                            </div>
                            <div className="col-md-12">
                                <label>Options</label>

                                <div className="form-row">

                                    {form.options && form.options.map((itm, i) => {
                                        return <div className="col-md-12 mb-3" key={i}>
                                            <article className="optionCard shadow p-3">
                                                <div className='form-row'>
                                                    <div className="col-md-9 mb-3">
                                                        <label>Option</label>
                                                        <p className="mb-0">{itm.option}</p>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <label>Weightage</label>
                                                        <p className="mb-0">{itm.weightage}</p>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    })}
                                </div>
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

export default ViewQuestion
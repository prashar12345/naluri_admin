import React, { useState } from "react";
import methodModel from "../../methods/methods";
import datepipeModel from "../../models/datepipemodel";

const AuditViewModal = ({ form }) => {

    return <>
        <a id="openAuditViewModal" data-toggle="modal" data-target="#viewModal"></a>
        <div className="modal fade" id="viewModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Audit History</h5>
                        <button type="button" id="closeViewModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-12 mb-3">
                                <label>Date & time</label>
                                <p className="mb-0 text">{form && datepipeModel.date(form.createdAt)} | {form && datepipeModel.time(form.createdAt)}</p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Updated Text</label>
                                <p className="mb-0 text">{form && form.updatedText}</p>
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

export default AuditViewModal
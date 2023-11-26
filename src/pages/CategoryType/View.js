import React, { useState } from "react";

const ViewModal = ({ form }) => {

    return <>
        <a id="openViewModal" data-toggle="modal" data-target="#viewModal"></a>
        <div className="modal fade" id="viewModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Category</h5>
                        <button type="button" id="closeViewModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-6 mb-3">
                                <label>Name</label>
                                <p className="mb-0 text">{form && form.name}</p>
                            </div>
                            <div className="col-md-6">
                                <label>Type</label>
                                <p className="mb-0 text">{form && form.type && form.type.name}</p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Ratio</label>
                                <div className='form-row'>
                                    {form && form.ratio && form.ratio.map((itm, i) => {
                                        return <div className='col-md-6 mb-3' key={i}>
                                            <div className='form-row mx-0 shadow p-2'>
                                                <div className='col-md-12 mb-3'>
                                                    <label>Level Risk</label>
                                                    <p className="mb-0">{itm.level_risk}</p>
                                                </div>
                                                <div className='col-md-6 mb-3'>
                                                    <label>Min</label>
                                                    <p className="mb-0">{itm.min}</p>
                                                </div>
                                                <div className='col-md-6 mb-3'>
                                                    <label>Max</label>
                                                    <p className="mb-0">{itm.max}</p>
                                                </div>
                                            </div>
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

export default ViewModal
import React, { useState } from "react";
import methodModel from "../../methods/methods";

const ViewBlogdetail = ({ form }) => {


    return <>
        <a id="openViewBlogdetail" data-toggle="modal" data-target="#ViewdetailModal"></a>
        <div className="modal fade" id="ViewBlogdetailModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Blog Detail</h5>
                        <button type="button" id="closeViewdetailModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-12 mb-3">
                                <label>title</label>
                                <p className="mb-0">{form && form.title}</p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>description</label>
                                <p className="mb-0">{form && form.description}</p>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>image</label>
                                <p className="mb-0"> <img src={methodModel.noImg(form && form.image)} className="categoryImage" /></p>

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

export default ViewBlogdetail
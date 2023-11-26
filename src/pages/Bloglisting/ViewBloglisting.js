import React, { useState } from "react";
import methodModel from "../../methods/methods";

const ViewBlog = ({ form }) => {


    return <>
        <a id="openViewBlog" data-toggle="modal" data-target="#ViewBlogModal"></a>
        <div className="modal fade" id="ViewBlogModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Blog</h5>
                        <button type="button" id="closeViewBlogModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-8 mb-3">
                                <label>Title</label>
                                <p className="mb-0">{form && form.title}</p>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>image</label>
                                <p className="mb-0"> <img src={methodModel.noImg(form && form.image)} className="categoryImage" /></p>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>Description</label>
                                <p className="mb-0 editorclss" dangerouslySetInnerHTML={{ __html: form && form.description }}></p>
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

export default ViewBlog
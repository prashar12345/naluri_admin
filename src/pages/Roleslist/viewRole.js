import React, { useState } from "react";
import permissionModel from "../../models/permisstion.model";

const ViewRole = ({ rolForm, setform }) => {
    const userRoles = permissionModel.permissionArr

    return <>
        <a id="openViewRoleModal" data-toggle="modal" data-target="#viewroleModal"></a>
        <div className="modal fade" id="viewroleModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Access Role</h5>
                        <button type="button" id="closeRoleModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-12 mb-3">
                                <label>Role Name</label>
                                <p className="mb-0">{rolForm && rolForm.role}</p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Permissions</label>

                                <article>
                                    <table className="table permisstionTable mb-0">
                                        <tbody>
                                            {userRoles.map((itm, i) => {
                                                if (itm.title) {
                                                    return <tr key={i}>
                                                        <td colSpan={2} className="pemisstionTitle">{itm.title}</td>
                                                    </tr>
                                                } else {
                                                    return <tr key={i}>
                                                        <th>{itm.name}</th>
                                                        <td>
                                                            <div className="checkList">
                                                                <label>
                                                                    <input type="checkbox" checked={rolForm.permissions[itm.key].read} disabled /> Read
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" checked={rolForm.permissions[itm.key].add} disabled /> Write
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" checked={rolForm.permissions[itm.key].edit} disabled /> Edit
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" checked={rolForm.permissions[itm.key].delete} disabled /> Delete
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }

                                            })}
                                        </tbody>
                                    </table>
                                </article>


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

export default ViewRole
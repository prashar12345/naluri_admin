import React, { useState } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import permissionModel from "../../models/permisstion.model";

const AddEditRole = ({ rolForm, setform, modalClosed }) => {

    const userRoles = permissionModel.permissionArr

    const handleSubmit = (e) => {
        e.preventDefault()
        let method = 'post'
        if (rolForm.id) {
            method = 'put'
        } else {
            delete rolForm.id
        }

        loader(true)
        ApiClient.allApi('role', rolForm, method).then(res => {
            if (res.success) {
                ToastsStore.success('Permission Updated')
                document.getElementById('closeRoleModal').click()
                modalClosed()
            }
            loader(false)
        })
    }

    const setPermisson = (module, key, value) => {
        setform({ ...rolForm, permissions: { ...rolForm.permissions, [module]: { ...rolForm.permissions[module], [key]: value } } })
    }

    return <>
        <a id="openRoleModal" data-toggle="modal" data-target="#roleModal"></a>
        <div className="modal fade" id="roleModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{rolForm.id ? 'Edit' : 'Add'} Role Access</h5>
                        <button type="button" id="closeRoleModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-12 mb-3">
                                    <label>Role Name</label>
                                    <input type="text" className="form-control" disabled={rolForm.id ? true : false} value={rolForm.role} onChange={e => setform({ ...rolForm, role: e.target.value })} required />
                                </div>
                                <div className="col-md-12">
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
                                                                        <input type="checkbox" checked={rolForm.permissions[itm.key].read} onChange={e => setPermisson(itm.key, 'read', e.target.checked)} /> Read
                                                                    </label>
                                                                    {rolForm.permissions[itm.key].cat != 'coulums' ? <>
                                                                        <label>
                                                                            <input type="checkbox" checked={rolForm.permissions[itm.key].edit} onChange={e => setPermisson(itm.key, 'edit', e.target.checked)} /> Edit
                                                                        </label>
                                                                        <label>
                                                                            <input type="checkbox" checked={rolForm.permissions[itm.key].delete} onChange={e => setPermisson(itm.key, 'delete', e.target.checked)} /> Delete
                                                                        </label>
                                                                    </> : <></>}

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
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddEditRole
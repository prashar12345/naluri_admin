import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";

const ViewHealthClinic = ({ form }) => {

    const [healthClinicData, sethealthClinicData] = useState()
    useEffect(() => {
        if (form) {
            HealthClinicDetail()
        }
    }, [form])

    const HealthClinicDetail = () => {
        ApiClient.get("health/clinic", { id: form }).then(res => {
            sethealthClinicData(res.data)
        })
    }

    return <>
        <div className="modal fade" id="viewhealthclinic" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Health Clinic</h5>
                        <button type="button" id="closeViewModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-6 mb-3">
                                <label>Name</label>
                                <p className="mb-0 text">{healthClinicData && healthClinicData.name}</p>
                            </div>
                            <div className="col-md-6">
                                <label>Country</label>
                                <p className="mb-0 text">{healthClinicData && healthClinicData.country}</p>
                            </div>
                            <div className="col-md-6">
                                <label>City</label>
                                <p className="mb-0 text">{healthClinicData && healthClinicData.city}</p>
                            </div>
                            <div className="col-md-6">
                                <label>State</label>
                                <p className="mb-0 text">{healthClinicData && healthClinicData.state}</p>
                            </div>
                            <div className="col-md-6">
                                <label>Clinic Personnels</label>
                                <p className="mb-0 text">{healthClinicData && healthClinicData.clinicPersonnel.fullName}</p>
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

export default ViewHealthClinic
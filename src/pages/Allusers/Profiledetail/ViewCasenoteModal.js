import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ApiKey from "../../../methods/ApiKey";
import modalModel from "../../../models/modal.model";
import datepipeModel from "../../../models/datepipemodel";


const ViewCasenoteModal = ({ form, modalClosed }) => {
    const history = useHistory()

    const route = (id) => {
        let url = '/profiledetail/'
        if (form.isHideAdd) url = '/userdetail/'
        history.push(url + id)
        modalModel.close('viewcasenoteModal')
    }

    return <>
        <div className="modal fade" id="viewcasenoteModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title mainhead">View Case Note</h5>
                        <button type="button" id="closeviewappointmentModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-row">
                            <h6 className="col-md-12 mb-3  mt-3 poupheding">Counsellor Detail</h6>
                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Counsellor's Name:</label>
                                <p className="mb-0"><a onClick={e => route(form && form.counsellorId.id)} className="text-primary">{form && form.counsellorId && form.counsellorId.fullName}</a></p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Counsellor's Phone Number:</label>
                                <p className="mb-0">{form && form.counsellorId && form.counsellorId.mobileNo}</p>
                            </div>

                            <h6 className="col-md-12 mb-3  mt-3 poupheding">User Detail</h6>
                            <div className="col-md-6 mb-3">
                                <label className="semiheding">User Name:</label>
                                <p className="mb-0"><a onClick={e => route(form && form.userId.id)} className="text-primary">{form && form.userId && form.userId.fullName}</a></p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="semiheding">IC No. or Passport No.. :</label>
                                <p className="mb-0">{form && form.userId && form.userId.ic_number}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Phone Number:</label>
                                <p className="mb-0">{form && form.userId && form.userId.dialCode + form.userId.mobileNo}</p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Support Letter:</label>
                                <p className="mb-0">{form && form.userId && form.userId.supportLetter}</p>
                            </div>


                            <h6 className="col-md-12 mb-3 mt-3 poupheding">Appointment Detail</h6>
                            {form && form.appointmentId ? <>


                                <div className="col-md-6 mb-3">
                                    <label className="semiheding">Appointment Date:</label>
                                    <p className="mb-0">{form && datepipeModel.date(form.appointmentId.start)}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="semiheding">Duration:</label>
                                    <p className="mb-0">{form && datepipeModel.isotime(form.appointmentId.start)} - {form && datepipeModel.isotime(form.appointmentId.end)}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="semiheding">Appointment Type:</label>
                                    <p className="mb-0">{form && form.appointmentId.consultation_type}</p>
                                </div>
                            </> : <>
                                <div className="col-md-6 mb-3">
                                    <label className="semiheding">Appointment Date:</label>
                                    <p className="mb-0">{form && datepipeModel.date(form.start)}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="semiheding">Duration:</label>
                                    <p className="mb-0">{form && datepipeModel.isotime(form.start)} - {form && datepipeModel.isotime(form.end)}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="semiheding">Appointment Type:</label>
                                    <p className="mb-0">{form && form.consultation_type}</p>
                                </div>
                            </>}

                            <h6 className="col-md-12 mb-3 mt-3 poupheding">Case Note Detail</h6>

                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Added By:</label>
                                <p className="mb-0"><a onClick={e => route(form && form.addedBy.id)} className="text-primary">{form && form.addedBy && form.addedBy.fullName}</a></p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Added By:</label>
                                <p className="mb-0"><a onClick={e => route(form && form.addedBy.id)} className="text-primary">{form && form.addedBy && form.addedBy.fullName}</a></p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Hours Of Consultations:</label>
                                <p className="mb-0">{form && form.hoursOfConsultations} minutes</p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Case Type:</label>
                                <p className="mb-0">{form && form.caseType}</p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Severity Level:</label>
                                <p className="mb-0">{form && form.severityLevel}</p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="semiheding">Client Status:</label>
                                <p className="mb-0">{form && form.clientStatus}</p>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="semiheding">Notes:</label>
                                <p className="mb-0">{form && form.note}</p>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="semiheding">File</label>
                                {form && form.file ? <div>
                                    {form.file.map((itm, i) => {
                                        return <span className="docFile" key={itm}>
                                            <a href={ApiKey.api + 'docs/' + itm} target="_blank"> <i className="fa fa-file"></i> {itm}</a>
                                            {/* <i className="fa fa-times" onClick={e => removeDoc(i)}></i> */}
                                        </span>
                                    })}

                                </div> : <></>}
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

export default ViewCasenoteModal
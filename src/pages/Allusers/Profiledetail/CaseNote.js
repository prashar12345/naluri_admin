
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



const CaseNote = ({ }) => {
    const user = useSelector(state => state.user)
    const [users, setUsers] = useState()
    useEffect(() => {

    }, [])




    return <>
        <a id="openviewModal" data-toggle="modal" data-target="#viewModal"></a>
        <div className="modal fade" id="viewModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content ">
                    {/* <div className="modal-header header pb-0 mb-0">
                        <h5 className="modal-title">Case Note</h5>
                        <button type="button" id="closeviewModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> */}
                    <div className='modal-body '>
                        <button type="button" id="closeviewModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="row">

                            <div className="sideclass col-md-4">
                                <h3 className="Profilehedding mt-3 ">
                                    Profile Details
                                </h3>

                                <div className="row border-bottom mt-4">
                                    <div className="col-md-6 sidefont">IC. / Passport No.</div>
                                    <div className="col-md-6 rightfont">931212-09-0909</div>
                                </div>
                                <div className="row border-bottom mt-4">
                                    <div className="col-md-6 sidefont">Phone Number</div>
                                    <div className="col-md-6 rightfont">0123456789</div>
                                </div>
                                <div className="row border-bottom mt-4 mr-1">
                                    <div className="col-md-6 sidefont">Email</div>
                                    <div className="col-md-6 rightfont">suzainal@example.com</div>
                                </div>
                            </div>


                            <div className="col-md-8 pl-5">

                                <h3 className="Profilehedding ml-3">
                                    New Case Note
                                </h3>


                                <input type="text" id="fname" name="firstname" placeholder="Title" className='form-control mb-3' />

                                <textarea id="textarea" name="text" rows="4" cols="50" placeholder='Body' className='form-control txarescls' >

                                </textarea>

                                <div className='text-right mt-3'>
                                    <button className='btn btn-outline-primary buttonclass mr-2' data-dismiss="modal">Cancel</button>
                                    <button className='btn btn-secondary buttonSave '>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-footer footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div> */}
                </div>
            </div>
        </div>
    </>

}

export default CaseNote
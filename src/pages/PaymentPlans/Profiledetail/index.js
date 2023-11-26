import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';


const Profiledetail = (p) => {
    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        getDetail()
    }, [])

    const getDetail = () => {
        loader(true)
        ApiClient.get('user/detail', { id: id }).then(res => {
            if (res.success) {
                setData(res.data)
            }
            loader(false)
        })

    }

    return (
        <Layout>
            <div className="row">
                <div className="sideclass col-md-4">
                    <h3 className="hedding mt-3 ">
                        Profile Details
                    </h3>

                    <div className="row border-bottom mt-4">
                        <div className="col-md-6">IC. / Passport No.</div>
                        <div className="col-md-6">{data && data.ic_number}</div>
                    </div>
                    <div className="row border-bottom mt-4">
                        <div className="col-md-6">Phone Number</div>
                        <div className="col-md-6">{data && data.mobileNo}</div>
                    </div>
                    <div className="row border-bottom mt-4 mr-5">
                        <div className="col-md-6">Email</div>
                        <div className="col-md-6">{data && data.email}</div>
                    </div>



                </div>


                <div className="col-md-8">

                    <div className="text-right">


                        <button className="btn btn-outline-primary addbtn"> + Add Case Notes</button>

                    </div>
                    <h3 className="hedding ml-3">
                        Recent Assessment
                    </h3>


                    <div className="bgtable mt-3 ">

                        <div>
                            <table className="table table-striped ">
                                <thead className="theadclss">
                                    <tr className="tblclas">
                                        <th scope="col" >Date & Time</th>
                                        <th scope="col">Overall Result</th>
                                        <th scope="col">Depression Score</th>
                                        <th scope="col">Anxiety Score</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <th scope="row">911230-10-4532</th> */}
                                        <td>911230-10-4532</td>
                                        <td>0123456789</td>
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className="hedding ml-3 mt-3">
                        Previous Assessment
                    </h3>
                    <div className="bgtable ">

                        <div>
                            <table className="table table-striped ">
                                <thead className="theadclss">
                                    <tr className="tblclas">
                                        <th scope="col" >Date & Time</th>
                                        <th scope="col">Overall Result</th>
                                        <th scope="col">Depression Score</th>
                                        <th scope="col">Anxiety Score</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <th scope="row">911230-10-4532</th> */}
                                        <td>911230-10-4532</td>
                                        <td>0123456789</td>
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>

                                    </tr>
                                    <tr>
                                        {/* <th scope="row">2</th> */}
                                        <td>911230-10-4532</td>
                                        <td>0123456789</td>
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>

                                    </tr>
                                    <tr>
                                        {/* <th scope="row">3</th> */}
                                        <td>911230-10-4532</td>
                                        <td>0123456789</td>
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>





                    <h3 className="hedding ml-3 mt-3">
                        Case Notes
                    </h3>


                    <div className="bgtable ">

                        <div>
                            <table className="table table-striped ">
                                <thead className="theadclss">
                                    <tr className="tblclas">
                                        <th scope="col" >Date & Time</th>
                                        <th scope="col">Counsellor</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Body</th>
                                        <th scope="col"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <th scope="row">911230-10-4532</th> */}
                                        <td>911230-10-4532</td>
                                        <td>Pn. Siti Hajar</td>
                                        <td>Burnout & Stress</td>
                                        <td>Work has been busy...</td>
                                        <td>View Case Note</td>

                                    </tr>
                                    <tr>
                                        {/* <th scope="row">2</th> */}
                                        <td>911230-10-4532</td>
                                        <td>0123456789</td>
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>

                                    </tr>
                                    <tr>
                                        {/* <th scope="row">3</th> */}
                                        <td>911230-10-4532</td>
                                        <td>0123456789</td>
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <h3 className="hedding ml-3 mt-3">
                        Upcoming Consultation
                    </h3>
                    <div className="bgtable ">

                        <div>
                            <table className="table table-striped ">
                                <thead className="theadclss">
                                    <tr className="tblclas">
                                        <th scope="col" >Date & Time</th>
                                        <th scope="col">Preference</th>
                                        <th scope="col">Counsellor</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <th scope="row">911230-10-4532</th> */}
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>
                                        <td>Pn. Siti Hajar</td>
                                        <td>Add Case Note</td>
                                        <td>Completed</td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>

                    </div>




                    <h3 className="hedding ml-3 mt-3">
                        Previous Consultation
                    </h3>
                    <div className="bgtable ">

                        <div>
                            <table className="table table-striped ">
                                <thead className="theadclss">
                                    <tr className="tblclas">
                                        <th scope="col" >Date & Time</th>
                                        <th scope="col">Preference</th>
                                        <th scope="col">Counsellor</th>
                                        <th scope="col"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <th scope="row">911230-10-4532</th> */}
                                        <td>911230-10-4532</td>
                                        <td>0123456789</td>
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>View Case Note</td>

                                    </tr>


                                    <tr>
                                        {/* <th scope="row">911230-10-4532</th> */}
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>
                                        <td>En. Fazilah Kamsah</td>
                                        <td>View Case Note</td>

                                    </tr>

                                    <tr>
                                        {/* <th scope="row">911230-10-4532</th> */}
                                        <td>10/10/2022 | 09:00 am</td>
                                        <td>Face-to-face</td>
                                        <td>En. Fazilah Kamsah</td>
                                        <td>View Case Note</td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                {/* <div className="col-md-8 ml-4">
                    <h3 className="hedding ml-3">
                        Recent Assessment
                    </h3>


                    <input type="text" placeholder='First name' id="fname" name="fname" className="form-control inputclass mt-4 " />

                    <input type="text" id="fname" placeholder='Last name' name="fname" className="form-control inputclass mt-4" />

                    <input type="text" id="fname" placeholder='Last name' name="fname" className="form-control inputclass mt-4" />

                    <input type="text" id="fname" placeholder='Passport no.' name="fname" className="form-control inputclass mt-4" />

                    <input type="text" id="fname" placeholder='Preference' name="fname" className="form-control inputclass mt-4" />

                    <input type="text" id="fname" placeholder='Assessment' name="fname" className="form-control inputclass mt-4" />


                    <input type="radio" className="mr-1 ml-2" id="html" name="fav_language" value="HTML" />
                    <label for="html" className="mr-2 mt-4">Yes</label>
                    <input type="radio" className="mr-1" id="html" name="fav_language" value="HTML" />
                    <label for="html" className=" mt-4">No</label>

                    <div className="text-right">
                        <button className="cancelbtn mr-3">Cancel</button>
                        <button className="savebtn">Save</button>
                    </div>
                </div> */}

            </div>
        </Layout>

    );
};

export default Profiledetail;

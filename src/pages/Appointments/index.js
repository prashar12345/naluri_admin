import React, { useEffect, useState } from 'react';
import Layout from '../../components/global/layout';
import './style.scss';

const Appointments = (p) => {
    return (
        <Layout>
            <div className="row">
                <div className="sideclass ml-4">
                    <div className="mt-3 ">
                        <h3 className="hedding ml-3">
                            Profile Details
                        </h3>
                    </div>
                </div>
                <div className="col-md-8 ml-4">
                    <h3 className="hedding ml-3">
                        Recent Assessment
                    </h3>
                    <div className="bgtable">
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
                        Upcoming Consultation
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

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default Appointments;

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import CaseNote from './CaseNote';
import { useSelector } from 'react-redux';
import datepipeModel from '../../../models/datepipemodel';
// import Pagination from 'react-js-pagination';
import Pagination from "react-pagination-js";
import modalModel from '../../../models/modal.model';
import { Link } from 'react-router-dom';
import statusModel from '../../../methods/status.model';
import ViewCasenoteModal from './ViewCasenoteModal';



const Profiledetail = (p) => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const [viewData, setViewData] = useState()
    const [casenotes, setCaseNotes] = useState([])
    const [cfilters, setCfilter] = useState({ page: 1, count: 5 })
    const [ctotal, setCTotal] = useState(0)
    const [upcommmingtotal, setupcommmingtotal] = useState(0)
    const [caseNoteFilter, setcaseNoteFilter] = useState({ page: 1, count: 10, status: '' })
    const [counsellors, setConsellors] = useState([])
    const [assessment, setAssessment] = useState([])
    const [assessmentFilter, setassessmentFilter] = useState({ page: 1, count: 5, })
    const [assessmentTotal, setAssessmentTotal] = useState(0)
    const [previousFilter, setPreviousFilter] = useState({ page: 1, count: 5, })
    const [previousTotal, setPreviousTotal] = useState(0)
    const [upcomingBooking, setupcomingBookings] = useState([])
    const [caseForm, setCaseForm] = useState({
        note: '',
        appointmentId: '',
        userId: '',
        counsellorId: '',
        hoursOfConsultations: '',
        caseType: '',
        severityLevel: '',
        clientStatus: '',
        supportLetter: '',
        file: '',
    })

    //prev state for storing res=> from api with completed status
    const [prevConsultation, setprevConsultation] = useState()
    const getDetail = (did) => {
        loader(true)
        // let healthClinicId = ''

        ApiClient.get(`user/detail`, { id: did }).then(res => {
            if (res.success) {
                setData(res.data)
                upcomingBookings(res.data)
                getCaseNotes({}, res.data)
            }
            loader(false)
        })
    };





    //get  req to the Assessment end point 
    const prevAssessment = (p = {}) => {
        let param = {
            ...assessmentFilter,
            ...p,
            addedBy: userId ? userId : id
        }
        loader(true)
        ApiClient.get("assessments", param).then(res => {
            if (res.success) {
                setAssessment(res.data)
                setAssessmentTotal(res.total)
                loader(false)
            }
        })
    }

    const upcomingBookings = (ud = data) => {
        let url = 'counsellor/appointments'
        let userId = ''
        let counsellorId = ''
        let clinicId = ''
        if (ud.role == 'Counsellor') {
            url = 'counsellor/appointments'
            counsellorId = ud.id
        }
        if (ud.role === 'user') userId = ud.id
        if (ud.role == 'Clinic Admin') clinicId = ud.id

        let filter = { status: 'Upcoming', userId, counsellorId, clinicId, count: 7, page: 1 }
        loader(true)
        ApiClient.get(url, filter).then(res => {
            if (res.success) {
                setupcomingBookings(res.data)
            }
            loader(false)
        })
    }
    const previousConsultation = (p = {}, ud = data) => {
        let url = 'counsellor/appointments'
        let counsellorId = ''
        let clinicId = ''
        let userId = ''
        if (ud.role == 'Counsellor') {
            url = 'counsellor/appointments'
            counsellorId = ud.id
        }

        if (ud.role == 'Clinic Admin') clinicId = ud.id
        if (ud.role == 'user') {
            url = 'user/appointments'
            userId = ud.id
        }
        let filter = { ...previousFilter, status: 'Completed', userId, counsellorId, clinicId, ...p }
        // loader(true)
        ApiClient.get(url, filter).then(res => {
            if (res.success) {
                setprevConsultation(res.data)
                setPreviousTotal(res.total)
            }
            loader(false)
        })
    }
    const openCaseNote = (itm) => {
        let date = new Date()
        let randomId = `${itm ? itm.id : ''}_${date.getTime()}`
        let filters = { appointmentId: itm ? itm.id : '', userId: itm.userId.id, counsellorId: itm.counsellorId }
        setCaseForm({ ...filters, note: '', page: itm.page, randomId, isHideAdd: userId ? true : false })
        modalModel.open('viewcasenoteModal')
    }
    // const openViewHealthClinic = (item) => {
    //     let ClinicData = {}
    //     sethealthClinicData()
    // }
    const getCounsellors = () => {
        ApiClient.get('user/listing', { page: 1, count: 100, role: 'Counsellor', clinicId: user.id }).then(res => {
            if (res.success) {
                setConsellors(res.data)
            }
        })
    }

    const getAll = (aid = id) => {
        getDetail(aid)
    }

    const modalClosed = (p, itm) => {
        if (p === 'view') {
            modalModel.open('viewcasenoteModal')
            setViewData(itm)
        } if (p === 'casenote') {
            upcomingBookings()
        }
    }


    const view = (item = '') => {
        console.log("itm", item)
        setViewData({ ...item, page: 'profiledetail', isHideAdd: userId ? true : false })
        modalModel.open("viewcasenoteModal")
    }

    const back = () => {
        history.goBack()
    }

    const getCaseNotes = (p = {}, ud) => {
        let counsellorId = ''
        let userId = ''
        let clinicId = ''
        let udetail = ud ? ud : data
        if (udetail.role == 'Counsellor') counsellorId = udetail.id
        if (udetail.role == 'user') userId = udetail.id
        if (udetail.role == 'Clinic Admin') clinicId = udetail.id

        let filter = {
            ...cfilters,
            ...p,
            userId,
            counsellorId,
            clinicId
        }
        console.log("filter", filter)
        loader(true)
        ApiClient.get('case/notes', filter).then(res => {
            if (res.success) {
                setCaseNotes(res.data)
                setCTotal(res.total)
                loader(false)
            }
        })
    }

    const pageChange = (e, f = 'casenote') => {
        if (f == 'casenote') {
            setCfilter({ ...cfilters, page: e })
            getCaseNotes({ page: e })
        } else if (f == 'assessment') {
            setassessmentFilter({ ...assessmentFilter, page: e })
            prevAssessment({ page: e })
        } else if (f == 'previous') {
            setPreviousFilter({ ...previousFilter, page: e })
            previousConsultation({ page: e })
        }
    }

    const route = (id) => {
        history.push('/profiledetail/' + id)
    }


    const search = (p = {}) => {
        let filter = {
            page: 1,
            ...p
        }
        setcaseNoteFilter({ ...caseNoteFilter, page: 1, ...filter })
        getCaseNotes(filter)
    }

    useEffect(() => {
        getAll(userId ? userId : id)
        getCounsellors()
        prevAssessment()
        previousConsultation({}, userId ? userId : id)
    }, [id, userId])

    return (
        <Layout>
            <div className="row">
                <div className="sideclass col-md-4">
                    <h3 className="Profilehedding mt-3 ">
                        Profile Details
                    </h3>

                    <div className="row border-bottom mt-4">
                        <div className="col-md-6 profileheddingcls">IC No. or Passport No.</div>
                        <div className="col-md-6 profiledetailscls">{data && data.ic_number}</div>
                    </div>
                    <div className="row border-bottom mt-4">
                        <div className="col-md-6 profileheddingcls">Phone Number</div>
                        <div className="col-md-6 profiledetailscls">{data && data.mobileNo}</div>
                    </div>
                    <div className="row border-bottom mt-4 mr-1">
                        <div className="col-md-6 profileheddingcls">Email</div>
                        <div className="col-md-6 emailclss">{data && data.email}</div>
                    </div>
                    {
                        data && data.role != 'user' ? <div className="row border-bottom mt-4 mr-1">
                            <div className="col-md-6 profileheddingcls">healthclinic</div>
                            <div className="col-md-6 profiledetailscls">{data && data.healthClinicId && data.healthClinicId.name}</div>
                        </div> : <></>
                    }
                </div>


                <div className="col-md-8">
                    <div className="text-right">
                        <div>
                            <a to="/users" onClick={back}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                        </div>
                    </div>

                    {data && data.role == 'user' ? <>
                        <h3 className="profileresulhead mt-3">
                            Assessments
                        </h3>

                        <div className="bgtable mt-3 ">
                            <div className="table-responsive">
                                <table className="table table-striped ">
                                    <thead className="theadclss">
                                        <tr className="tblclas">
                                            <th scope="col" >Date & Time</th>
                                            <th scope="col">Overall Result</th>
                                            <th scope="col">Appointment Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            assessment && assessment.map((itm, i) => {
                                                return <tr key={i}>
                                                    {/* <th scope="row">911230-10-4532</th> */}
                                                    <td>{datepipeModel.datetime(itm.createdAt)}</td>
                                                    <td className="text-capitalize">
                                                        {itm.assessmentResults.map(ritm => {
                                                            return <span className={`high_risk mx-1 ${ritm.result == 'Normal' || ritm.result == 'Low' ? 'span_low_risk' : ''} ${ritm.result == 'Moderate' || ritm.result == 'Mild' ? 'span_Moderate_risk' : ''} ${ritm.result == 'Severe' || ritm.result == 'Extremely severe' || ritm.result == 'High' ? 'span_high_class' : ''}`}>{ritm.result}</span>
                                                        })}

                                                    </td>
                                                    <td className="text-capitalize">{itm.assessmentResults && itm.assessmentResults.map((ritm, i) => {
                                                        return `${ritm.type.name} ${i !== itm.assessmentResults.length - 1 ? ', ' : ''}`
                                                    })}</td>
                                                </tr>
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>


                        {assessmentTotal > assessmentFilter.count ? <div className="mt-3">
                            {/* <Pagination
                                className="ml-auto"
                                activePage={assessmentFilter.page}
                                itemsCountPerPage={assessmentFilter.count}
                                totalItemsCount={assessmentTotal}
                                pageRangeDisplayed={5}
                                onChange={e => pageChange(e, 'assessment')}
                            /> */}
                            <Pagination
                                currentPage={assessmentFilter.page}
                                totalSize={assessmentTotal}
                                sizePerPage={assessmentFilter.count}
                                changeCurrentPage={e => pageChange(e, 'assessment')}
                            />
                        </div> : <></>}
                    </> : <></>}


                    <div className="">
                        <h3 className=" profileresulhead mt-3">
                            Case Notes
                        </h3>

                    </div>

                    <div className="bgtable ">
                        <div className="table-responsive">
                            <table className="table table-striped ">
                                <thead className="theadclss">
                                    <tr className="tblclas">
                                        <th scope="col" >Date & Time</th>
                                        <th scope="col">Appointment Date</th>
                                        <th scope="col">Added By</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {casenotes && casenotes.map(itm => {
                                        return <tr key={itm.id}>
                                            <th scope="row">{datepipeModel.datetime(itm.createdAt)}</th>
                                            <td>{itm.appointmentId ? <>
                                                {datepipeModel.date(itm.appointmentId.start)} | {datepipeModel.isotime(itm.appointmentId.start)}-{datepipeModel.isotime(itm.appointmentId.end)}
                                            </> : <>
                                                {datepipeModel.date(itm.start)} | {datepipeModel.isotime(itm.start)}-{datepipeModel.isotime(itm.end)}
                                            </>}</td>
                                            <td><a onClick={e => route(itm.addedBy.id)} className="text-primary">{itm.addedBy && itm.addedBy.fullName}</a></td>
                                            <td>
                                                {user.role !== 'user' ? <a onClick={() => view(itm)} className="text-primary View_Case ">View Case Note</a> : <></>}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {ctotal > cfilters.count ? <div>
                            {/* <Pagination
                                activePage={cfilters.page}
                                itemsCountPerPage={cfilters.count}
                                totalItemsCount={ctotal}
                                pageRangeDisplayed={5}
                                onChange={e => pageChange(e, 'casenote')}
                            /> */}
                            <Pagination
                                currentPage={cfilters.page}
                                totalSize={ctotal}
                                sizePerPage={cfilters.count}
                                changeCurrentPage={e => pageChange(e, 'casenote')}
                            />
                        </div> : <></>}
                    </div>


                    <h3 className="profileresulhead mt-3">
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
                                        {/* <th scope="col">Case Notes</th> */}
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        upcomingBooking && upcomingBooking.map((itm, i) => {
                                            return <tr key={i}>
                                                <td>{datepipeModel.date(itm.start)} | {datepipeModel.isotime(itm.start)}-{datepipeModel.isotime(itm.end)}</td>
                                                <td>{itm.consultation_type}</td>
                                                <td><Link to={`/profiledetail/${itm.counsellorDetail && itm.counsellorDetail.id}`} className="text-primary" >{itm.counsellorDetail && itm.counsellorDetail.fullName}</Link></td>
                                                {/* <td>
                                                    {user.role == 'Counsellor' && itm.caseNote ? <a onClick={() => openCaseNote({ ...itm, page: 'list' })} className="text-primary">View Case Note</a> : <></>}
                                                    {user.role == 'Counsellor' && !itm.caseNote ? <>
                                                        <a className={`linkclass ${itm.caseNote ? '' : 'blinkingLink'}`} onClick={() => openCaseNote(itm)}>
                                                            Add Case Note
                                                        </a>
                                                    </> : <></>}
                                                </td> */}
                                                <td>{statusModel.html(itm.status)}</td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>




                    <h3 className="profileresulhead mt-3">
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

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        prevConsultation && prevConsultation.map(itm => {
                                            return <tr key={itm.id}>
                                                <td>{datepipeModel.date(itm.start)} | {datepipeModel.isotime(itm.start)}-{datepipeModel.isotime(itm.end)}</td>
                                                <td>{itm.consultation_type}</td>
                                                <td><Link to={`/profiledetail/${itm.counsellorDetail && itm.counsellorDetail.id}`} className="text-primary" >{itm.counsellorDetail && itm.counsellorDetail.fullName}</Link></td>
                                                {/* <td>
                                                    {user.role == 'Counsellor' && itm.caseNote ? <a onClick={() => openCaseNote({ ...itm, page: 'list' })} className="text-primary">View Case Note</a> : <></>}
                                                    {user.role == 'Counsellor' && !itm.caseNote ? <>

                                                    </> : <></>}
                                                </td> */}

                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                    {previousTotal > previousFilter.count ? <div>
                        {/* <Pagination
                            activePage={previousFilter.page}
                            itemsCountPerPage={previousFilter.count}
                            totalItemsCount={previousTotal}
                            pageRangeDisplayed={5}
                            onChange={e => pageChange(e, 'previous')}
                        /> */}
                        <Pagination
                            currentPage={previousFilter.page}
                            totalSize={previousTotal}
                            sizePerPage={previousFilter.count}
                            changeCurrentPage={e => pageChange(e, 'previous')}
                        />
                    </div> : <></>}
                </div>
            </div>

            <CaseNote form={viewData} />
            <ViewCasenoteModal form={viewData} modalClosed={modalClosed} />
            {/* <CaseNoteModal form={caseForm} setform={setCaseForm} modalClosed={modalClosed} /> */}
            {/* <ViewHealthClinic form={healthClinicData} /> */}
        </Layout >

    );
};

export default Profiledetail;

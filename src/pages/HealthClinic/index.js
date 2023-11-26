import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import AddEdit from './AddEdit';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import { useHistory } from 'react-router';
import stateModel from '../../models/states.model';
import countryModel from '../../models/country.model';
import TranslationTabs from '../Translation/TranslationTabs';
import methodModel from '../../methods/methods';

const HealthClinic = (p) => {
    const history = useHistory()
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(true)
    const [form, setform] = useState({})
    const searchState = useSelector((state) => state.search);

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get("health/clinics", filter).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.total)
            }

            setLoader(false)
        })
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const openModal = (itm = '') => {
        setform({
            ...form, name: '', country: '', city: '', state: '', clinicPersonnel: '', id: ''
        })
        if (itm) {
            let clinicPersonnel = ''
            if (itm.clinicPersonnel) clinicPersonnel = itm.clinicPersonnel.id
            setform({
                ...form, ...itm, name: itm.name, country: itm.country, city: itm.city, state: itm.state, clinicPersonnel: clinicPersonnel
            })
        }
        document.getElementById("openEditModal").click()
    }

    const openViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById("openViewQuestionModal").click()
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('health/clinic', { id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }

    // const view = (itm) => {
    //     history.push('/health/clinics?id' + itm.id)
    // }

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData()
    }



    return (
        <Layout>
            <TranslationTabs page="healthclinic" />
            <div className="Assessment mb-3 d-flex justify-content-between">
                <h3 className="hedding">
                    Health Clinic
                </h3>

                {!methodModel.isTranslatePage() ? <button className="btn btn-primary" onClick={() => openModal()}>Add Health Clinic</button> : <></>}
            </div>

            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="theadclss">
                        <tr className="tblclas">
                            <th scope="col">Health Clinic Name
                            </th>
                            <th scope="col">Country
                            </th>
                            <th scope="col">State
                            </th>
                            <th scope="col">City
                            </th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td>{itm.name}</td>
                                <td>{countryModel.name(itm.country)}</td>
                                <td>{stateModel.name(itm.state, itm.country)}</td>
                                <td>{itm.city}</td>

                                <td>
                                    <a className="linkclass mx-2" onClick={() => openModal(itm)}><i title="Edit" className="fas fa-pen"></i></a>
                                    {methodModel.isTranslatePage() ? <></> : <>
                                        |<a className="linkclass mx-2" onClick={() => deleteItem(itm.id)}><i title="Delete" className="fa fa-trash" aria-hidden="true"></i></a>
                                    </>}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {loading ? <div className="text-center py-4">
                    <img src="/assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}
            </div>

            {!loading && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

            {!loading && total > filters.count ? <div className='d-flex'>
                {/* <Pagination
                    activePage={filters.page}
                    itemsCountPerPage={filters.count}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    onChange={pageChange}
                /> */}
                <Pagination
                    currentPage={filters.page}
                    totalSize={total}
                    sizePerPage={filters.count}
                    changeCurrentPage={pageChange}
                />
                <div className='ml-auto my-auto'>Total:{total}</div>
            </div> : <></>}
            <AddEdit form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};
export default HealthClinic;

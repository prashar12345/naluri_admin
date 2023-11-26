import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from '../../methods/methods';
import countryModel from '../../models/country.model'

const AddEdit = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [cas, setCas] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [languages, setLanguages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            name: form.name,
            country: form.country,
            state: form.state,
            city: form.city,
        }
        if (form.nameTranslate) value.nameTranslate = form.nameTranslate

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi('health/clinic', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeEditModal').click()
                modalClosed()
            }
            loader(false)
        })
    }

    const getCAs = () => {
        ApiClient.get('user/listing', { page: 1, count: 100, role: 'Clinic Admin' }).then(res => {
            if (res.success) {
                setCas(res.data)
            }
        })
    }

    const getLaguages = (p = {}) => {
        // setLoader(true)
        let filter = { page: 1, count: 100, ...p }
        ApiClient.get('languages', filter).then(res => {
            if (res.success) {
                setLanguages(res.data)
            }
            // setLoader(false)
        })
    }


    useEffect(() => {
        if (user && user.loggedIn) {
            getLaguages()
            setStates([])
            setCities([])
            getCAs()
            if (form.country) getState(form.country)
            if (form.state) getCity(form.state, form.country)
        }
    }, [form.id])

    const translate = (value, lng, key = 'nameTranslate') => {
        setform({ ...form, [key]: { ...form[key], [lng.code]: value } })
    }

    const getState = (code) => {
        ApiClient.get('states', { countryCode: code }).then(res => {
            if (res.success) {
                setStates(res.data)
            }
        })
    }

    const getCity = (code, country) => {
        ApiClient.get('city', { countryCode: country ? country : form.country, stateCode: code }).then(res => {
            if (res.success) {
                setCities(res.data)
            }
        })
    }

    return <>
        <a id="openEditModal" data-toggle="modal" data-target="#editModal"></a>
        <div className="modal fade" id="editModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Health Clinic
                        </h5>
                        <button type="button" id="closeEditModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-12 mb-3">
                                    <label>Health Clinic Name<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" disabled={methodModel.isTranslatePage()} value={form.name ? form.name : ''} onChange={e => setform({ ...form, name: e.target.value })} required />
                                    {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                        return <div className="mt-3" key={itm.id}>
                                            <input type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.nameTranslate ? form.nameTranslate[itm.code] ? form.nameTranslate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'nameTranslate')} />
                                        </div>
                                    })}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Country<span className="text-danger">*</span></label>
                                    <select
                                        className="form-control"
                                        disabled={methodModel.isTranslatePage()}
                                        value={form && form.country}
                                        onChange={e => { setform({ ...form, country: e.target.value, state: '', city: '' }); getState(e.target.value) }}
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {countryModel.list.map(itm => {
                                            return <option value={itm.isoCode} key={itm.isoCode}>{itm.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>State/Province<span className="text-danger">*</span></label>
                                    <select
                                        className="form-control"
                                        disabled={methodModel.isTranslatePage()}
                                        value={form && form.state}
                                        onChange={e => { setform({ ...form, state: e.target.value, city: '' }); getCity(e.target.value) }}
                                        required
                                    >
                                        <option value="">Select State</option>
                                        {states && states.map(itm => {
                                            return <option value={itm.isoCode} key={itm.isoCode}>{itm.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>City<span className="text-danger">*</span></label>
                                    <select
                                        className="form-control"
                                        disabled={methodModel.isTranslatePage()}
                                        value={form && form.city}
                                        onChange={e => { setform({ ...form, city: e.target.value }) }}
                                        required
                                    >
                                        <option value="">Select City</option>
                                        {cities && cities.map((itm, i) => {
                                            return <option value={itm.name} key={i}>{itm.name}</option>
                                        })}
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">{form && form.id ? 'Update' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddEdit
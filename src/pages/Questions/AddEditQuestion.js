import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";

const AddEditQuestion = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [categories, setCategories] = useState([])
    const [languages, setLanguages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            question: form.question,
            questionTranslate: form.questionTranslate,
            options: form.options,
            category: form.category,
            type: getSingleCat(form.category).type.id
        }

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }

        if (form.options.length < 3) {
            ToastsStore.error("Atleast three options required")
            return
        }

        loader(true)
        ApiClient.allApi('question', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeQuestionModal').click()
                modalClosed()
            }
            loader(false)
        })
    }

    const getSingleCat = (id) => {
        return categories.find(itm => itm.id == id)
    }

    const addOption = () => {
        let options = form.options
        let id = new Date().getTime()
        let value = {
            id,
            option: '',
            weightage: ''
        }
        options.push(value)
        setform({ ...form, options })
    }

    const changeOption = (i, key, value) => {
        let options = form.options
        options[i][key] = value
        setform({ ...form, options })
    }

    const deleteOption = (index) => {
        let options = form.options
        options = options.filter((itm, i) => i != index)
        setform({ ...form, options })
    }

    const getCategories = () => {
        ApiClient.get('categories', { page: 1, count: 100 }).then(res => {
            if (res.success) {
                setCategories(res.data)
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
            getCategories()
            getLaguages()
        }
    }, [])

    const translate = (value, lng, key = 'questionTranslate') => {
        setform({ ...form, [key]: { ...form[key], [lng.code]: value } })
    }

    return <>
        <a id="openQuestionModal" data-toggle="modal" data-target="#questionModal"></a>
        <div className="modal fade" id="questionModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} Question</h5>
                        <button type="button" id="closeQuestionModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">


                            <div className="form-row roleForm">
                                <div className="col-md-6 mb-3">
                                    <label>Question <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value={form.question ? form.question : ''} onChange={e => setform({ ...form, question: e.target.value })} required />

                                    {/* {languages && languages.map(itm => {
                                        return <div className="mt-3" key={itm.id}>
                                            <input type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.questionTranslate ? form.questionTranslate[itm.code] ? form.questionTranslate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'questionTranslate')} required />
                                        </div>
                                    })} */}
                                </div>


                                <div className="col-md-6 mb-3">
                                    <label>Category <span className="text-danger">*</span></label>
                                    <select className="form-control" value={form.category ? form.category : ''} onChange={e => setform({ ...form, category: e.target.value })} required>
                                        <option value="">Select Option</option>
                                        {categories && categories.map(itm => {
                                            return <option key={itm.id} value={itm.id}>{itm.name} ({itm.type.name})</option>
                                        })}

                                    </select>
                                </div>

                                <div className="col-md-12">
                                    <label>Options</label>
                                    <div className="form-row">

                                        {form.options && form.options.map((itm, i) => {
                                            return <div className="col-md-12 mb-3" key={i}>
                                                <article className="optionCard shadow p-3">
                                                    <div className='form-row'>
                                                        <div className="col-md-12 mb-3 text-right">
                                                            <i className="fa fa-times deleteOption" title="Remove" onClick={() => deleteOption(i)} />
                                                        </div>
                                                        <div className="col-md-9 mb-3">
                                                            <input type="text" className="form-control" value={itm.option} onChange={e => changeOption(i, 'option', e.target.value)} placeholder="Option *" required />
                                                            {/* {languages && languages.map(itm => {
                                                                return <div className="mt-3" key={itm.id}>
                                                                    <input type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.questionTranslate ? form.questionTranslate[itm.code] ? form.questionTranslate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'questionTranslate')} required />
                                                                </div>
                                                            })} */}
                                                        </div>
                                                        <div className="col-md-3 mb-3">
                                                            <input type="text" className="form-control" value={itm.weightage} maxLength={5} onChange={e => changeOption(i, 'weightage', methodModel.isNumber(e))} placeholder="Weightage *" required />
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        })}
                                        {form.options && form.options.length < 5 ? <div className="col-md-12 text-right">
                                            <button type="button" className="btn btn-primary" onClick={() => addOption()}>Add Option</button>
                                        </div> : <></>}

                                    </div>
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

export default AddEditQuestion
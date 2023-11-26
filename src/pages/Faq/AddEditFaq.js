import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";

const AddEditFaq = ({ form, setform, modalClosed }) => {
    const user = useSelector(state => state.user)
    const [faqs, setFaqs] = useState([])
    const [languages, setLanguages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let value = {
            id: form.id,
            question: form.question,
            answer: form.answer,
            questionTranslate: form.questionTranslate,
            answereTranslate: form.answereTranslate
        }

        let method = 'post'
        if (value.id) {
            method = 'put'
        } else {
            delete value.id
        }


        loader(true)
        ApiClient.allApi('faq', value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                document.getElementById('closeFaqModal').click()
                modalClosed()
            }
            loader(false)
        })
    }


    const getFaqs = () => {
        ApiClient.get('faqs', { page: 1, count: 100 }).then(res => {
            if (res.success) {
                setFaqs(res.data)
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
            getFaqs()
        }
    }, [])

    const translate = (value, lng, key = 'questionTranslate') => {
        //         questionTranslate
        // answereTranslate
        setform({ ...form, [key]: { ...form[key], [lng.code]: value } })
    }

    return <>
        <a id="openFaqModal" data-toggle="modal" data-target="#faqModal"></a>
        <div className="modal fade" id="faqModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{form && form.id ? 'Edit' : 'Add'} FAQ</h5>
                        <button type="button" id="closeFaqModal" className="close" data-dismiss="modal" aria-label="Close" title='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-12 mb-3">
                                    <label>Question <span className="text-danger">*</span></label>
                                    <input type="text" disabled={methodModel.isTranslatePage()} className="form-control" value={form.question ? form.question : ''} onChange={e => setform({ ...form, question: e.target.value })} required />
                                    {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                        return <div className="mt-3" key={itm.id}>
                                            <input type="text" className="form-control textcpitlize" placeholder={itm.name} value={form.questionTranslate ? form.questionTranslate[itm.code] ? form.questionTranslate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'questionTranslate')} />
                                        </div>
                                    })}
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Answer <span className="text-danger">*</span></label>
                                    <textarea disabled={methodModel.isTranslatePage()} className="form-control" value={form.answer ? form.answer : ''} onChange={e => setform({ ...form, answer: e.target.value })} required />
                                    {languages && methodModel.isTranslatePage() && languages.map(itm => {
                                        return <div className="mt-3" key={itm.id}>
                                            <textarea className="form-control textcpitlize" placeholder={itm.name} value={form.answereTranslate ? form.answereTranslate[itm.code] ? form.answereTranslate[itm.code] : '' : ''} onChange={e => translate(e.target.value, itm, 'answereTranslate')} />
                                        </div>
                                    })}
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">{form && form.id ? 'Update' : 'Add'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddEditFaq
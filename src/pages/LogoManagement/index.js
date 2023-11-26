import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ToastsStore } from "react-toasts";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";
import ApiKey from "../../methods/ApiKey";
import './style.scss'

const LogoManagement = () => {
    const [form, setForm] = useState({ baseImg: '', logo: '' })
    const [loading, setLoader] = useState(false)

    const logo = () => {
        let value = '/assets/img/mindalogo.png'
        if (form.logo) value = ApiKey.api + 'images/assets/' + form.logo
        return value
    }

    const uploadImage = (e) => {
        setForm({ ...form, baseImg: e.target.value })
        let files = e.target.files
        let file = files.item(0)
        setLoader(true)
        ApiClient.postFormData('image/upload?modelName=assets', { file: file, modelName: 'assets' }).then(res => {
            if (res.success) {
                let image = res.data.fullpath
                setForm({ ...form, logo: image, baseImg: '' })

                updateLogo({ logo: image })
            } else {
                setForm({ ...form, baseImg: '' })
            }
            setLoader(false)
        })
    }

    const updateLogo = (p = {}) => {
        ApiClient.post('logo', { ...p, id: 1 }).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
            }
        })
    }

    const getData = () => {
        ApiClient.get('logo').then(res => {
            if (res.success) {
                setForm({ ...form, logo: res.data.logo })
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return <>
        <Layout>
            <h3 className="mb-3">Logo Management</h3>

            <div className="form-row">
                <div className="col-md-6">
                    <label>Upload Logo <span className="text-danger">*</span></label>
                    <div>
                        <label className="btn btn-primary">
                            {loading ? 'Uploading...' : 'Upload'}
                            <input
                                id="bannerImage"
                                type="file"
                                className="d-none"
                                accept="image/*"
                                disabled={loading}
                                value={form.baseImg ? form.baseImg : ''}
                                onChange={(e) => { uploadImage(e); }}
                            />
                        </label>
                    </div>

                    <img src={logo()} className="logoimg" />
                </div>
            </div>
        </Layout>
    </>
}

export default LogoManagement
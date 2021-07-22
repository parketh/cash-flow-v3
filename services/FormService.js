import axios from 'axios'

// const url = 'http://localhost:3001'  // for development build
const url = ''                          // for production build
const formID = '60e8c2ed73b100779c3356fd'

const retrieveForm = () => {
    return axios.get(`${url}/responses/${formID}`).then(response => response.data)
}

const updateForm = (updatedForm) => {
    return axios.put(`${url}/responses/${formID}`, updatedForm).then(response => response.data)
}

const getCompanies = () => {
    return axios.get(`${url}/responses/${formID}/comps`).then(response => response.data)
}

const createCompany = (companyObject) => {
    return axios.post(`${url}/responses/${formID}/comps`, companyObject).then(response => response.data)
}

const updateCompany = (id, companyObject) => {
    return axios.put(`${url}/responses/${formID}/comps/${id}`, companyObject).then(response => response.data)
}

const removeCompany = (id) => {
    return axios.delete(`${url}/responses/${formID}/comps/${id}`)
}

const downloadFile = () => {
    return axios({
        url: `${url}/download/${formID}`, 
        method: "GET",
        headers:
        {
            'Content-Disposition': "attachment; filename=dcf_model.xlsx",
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'blob',
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "dcf_model.xlsx")
        document.body.appendChild(link)
        link.click()
    })
}

const submitFeedback = (feedback) => {
    return axios.post(`${url}/feedback/${formID}`, feedback).then(response => response.data)
}

const getPages = (slug) => {
    return axios({
        url: `${url}/coursepages/${slug}`,
        method: "GET",
        headers: { 'Content-Type': 'text/markdown' }
    }).then(response => response.data)
}

const exportedServices = { retrieveForm, updateForm, getCompanies, createCompany, updateCompany, removeCompany, downloadFile, submitFeedback, getPages }

export default exportedServices
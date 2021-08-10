import axios from "axios"

const dev = process.env.NODE_ENV !== "production"

const url = dev ? "http://localhost:3001" : ""
const formID = "611267fd5e69bc8134736cbf"

const retrieveForm = () => {
    return axios.get(`${url}/api/forms/${formID}`).then((response) => response.data)
}

const updateForm = (updatedForm) => {
    return axios.put(`${url}/api/forms/${formID}`, updatedForm).then((response) => response.data)
}

const getCompanies = () => {
    return axios.get(`${url}/api/forms/${formID}/comps`).then((response) => response.data)
}

const createCompany = (companyObject) => {
    return axios.post(`${url}/api/forms/${formID}/comps`, companyObject).then((response) => response.data)
}

const updateCompany = (id, companyObject) => {
    return axios.put(`${url}/api/forms/${formID}/comps/${id}`, companyObject).then((response) => response.data)
}

const removeCompany = (id) => {
    return axios.delete(`${url}/api/forms/${formID}/comps/${id}`)
}

const downloadFile = () => {
    return axios({
        url: `${url}/api/download/${formID}`,
        method: "GET",
        headers: {
            "Content-Disposition": "attachment; filename=dcf_model.xlsx",
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "blob",
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "dcf_model.xlsx")
        document.body.appendChild(link)
        link.click()
    })
}

const submitFeedback = (feedback) => {
    return axios.post(`${url}/api/feedback/${formID}`, feedback).then((response) => response.data)
}

const getPages = (slug) => {
    return axios({
        url: `${url}/api/coursepages/${slug}`,
        method: "GET",
        headers: { "Content-Type": "text/markdown" },
    }).then((response) => response.data)
}

const exportedServices = {
    retrieveForm,
    updateForm,
    getCompanies,
    createCompany,
    updateCompany,
    removeCompany,
    downloadFile,
    submitFeedback,
    getPages,
}

export default exportedServices

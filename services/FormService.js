import axios from "axios"

// const dev = true
const dev = process.env.NODE_ENV === "development"

const url = dev ? "http://localhost:3000" : ""
const formID = "611684e06d925e1ce0b0c9df"

const retrieveForm = () => {
    return axios.get(`${url}/api/forms/${formID}`).then((response) => response.data)
}

const updateForm = (updatedForm) => {
    return axios.put(`${url}/api/forms/${formID}`, updatedForm).then((response) => response.data)
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
    downloadFile,
    submitFeedback,
    getPages,
}

export default exportedServices

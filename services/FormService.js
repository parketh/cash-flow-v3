import axios from "axios"

// const dev = true
const dev = process.env.NODE_ENV === "development"

const url = dev ? "http://localhost:3000" : ""

const createForm = (form) => {
    return axios.post(`${url}/api/forms`, form).then((response) => response.data)
}

const retrieveForm = (formID) => {
    return axios.get(`${url}/api/forms/${formID}`).then((response) => response.data)
}

const updateForm = (formID, updatedForm) => {
    return axios.put(`${url}/api/forms/${formID}`, updatedForm).then((response) => response.data)
}

const createUser = (user) => {
    return axios.post(`${url}/api/users`, user).then((response) => response.data)
}

const retrieveUsers = () => {
    return axios.get(`${url}/api/users`).then((response) => response.data)
}

const downloadFile = (formID) => {
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
    return axios.post(`${url}/api/feedback`, feedback).then((response) => {
        console.log(response.data)
        return response.data
    })
}

const exportedServices = {
    createForm,
    retrieveForm,
    updateForm,
    createUser,
    retrieveUsers,
    downloadFile,
    submitFeedback,
}

export default exportedServices
